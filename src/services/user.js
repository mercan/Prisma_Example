const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const { PrismaClient } = require("@prisma/client");
const createToken = require("../utils/createToken");

// Middleware to encrypt the password
const encryptPassword = require("../middleware/encryptPassword");

// Services
const RedisService = require("./redis");

class User {
  constructor() {
    this.prisma = new PrismaClient();

    // Middleware
    this.prisma.$use(encryptPassword);
  }

  async register(user) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userExists) {
      return {
        error: "User already exists",
      };
    }

    const userRecord = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    // Send email verification
    this.sendEmailVerification(userRecord);

    return {
      message: "User created successfully",
      token: createToken(userRecord),
    };
  }

  async login(user) {
    const userRecord = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userRecord) {
      return {
        error: "Login failed; Invalid email or password",
      };
    }

    const isPasswordValid = bcrypt.compareSync(
      user.password,
      userRecord.password
    );

    if (!isPasswordValid) {
      return {
        error: "Login failed; Invalid email or password",
      };
    }

    return {
      message: "User logged in successfully",
      token: createToken(userRecord),
    };
  }

  async verifyEmail(email, emailVerificationCode) {
    const userRecord = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userRecord) {
      return { error: "Email verification failed" };
    }

    if (userRecord.emailVerified) {
      return {
        error: "Email already verified",
      };
    }

    const correctCode = await RedisService.getKey(
      "emailVerificationCode",
      email
    );

    if (emailVerificationCode !== correctCode) {
      return { error: "Email verification failed" };
    }

    RedisService.deleteKey("emailVerificationCode", email);

    await this.prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });

    return { message: "Email verified successfully" };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const userRecord = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const isPasswordValid = bcrypt.compareSync(
      currentPassword,
      userRecord.password
    );

    if (!userRecord || !isPasswordValid) {
      return { error: "Your password could not be changed" };
    }

    const isNewPasswordValid = bcrypt.compareSync(
      newPassword,
      userRecord.password
    );

    if (isNewPasswordValid) {
      return {
        error: "Your new password must be different from your current password",
      };
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: newPassword,
      },
    });

    return { message: "Your password has been changed." };
  }

  async sendEmailVerification({ email }) {
    const randomCode = randomBytes(32).toString("hex");
    const code = `${email}:${randomCode}`;

    RedisService.setKey(`emailVerificationCode:${email}`, code, 60 * 60 * 24);
  }
}

module.exports = new User();
