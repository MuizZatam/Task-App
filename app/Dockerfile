FROM node:25-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm ci --only=production

COPY src/ ./src/

EXPOSE 3000

CMD ["npm", "start"]
