FROM node:22.16.0

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]