FROM node:22-alpine

WORKDIR /app

# Directly replace vulnerable picomatch inside npm's bundled modules
RUN cd /usr/local/lib/node_modules/npm && \
    npm install picomatch@4.0.4 --save-exact

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]