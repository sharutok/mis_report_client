FROM node:21-alpine3.19 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm install -g serve && npm audit fix

COPY . .

RUN npm run build

CMD ["serve","-l","3060","-s","build"]
