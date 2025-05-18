FROM node:18

WORKDIR /app

ENV NG_CLI_ANALYTICS=false

COPY . .

RUN npm install

CMD ["npm", "run", "start"]
