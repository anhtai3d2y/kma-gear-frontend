FROM node:12.19.0-alpine3.9 AS development

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm audit fix

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]