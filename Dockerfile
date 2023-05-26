FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

RUN npm run build
CMD [ "npm", "start" ]