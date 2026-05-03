FROM node:22-alpine

WORKDIR /app

# Upgrade npm to latest (ships with picomatch 4.0.4+)
RUN npm install -g npm@latest

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]