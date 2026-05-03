FROM node:22-alpine

WORKDIR /app

# Upgrade npm to 11.13.0 which has picomatch 4.0.4
RUN npm install -g npm@11.13.0 --prefer-online

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]