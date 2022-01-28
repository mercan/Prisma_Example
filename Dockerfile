FROM --platform=linux/x86_64 node:14-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma

# install dependencies
RUN npm install --only=production
RUN prisma generate; exit 0

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]