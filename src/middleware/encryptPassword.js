const bcrypt = require("bcryptjs");

module.exports = (params, next) => {
  if (
    params.model == "User" &&
    (params.action == "create" || params.action == "update") &&
    params.args.data.password
  ) {
    const password = bcrypt.hashSync(params.args.data.password, 10);

    params.args.data.password = password;
  }

  return next(params);
};
