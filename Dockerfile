FROM node:12.18.1
ENV NODE_ENV=dev

WORKDIR /commands

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["node", "command.js"]