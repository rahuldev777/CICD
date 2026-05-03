FROM node:22-alpine

WORKDIR /app

# Remove vulnerable picomatch from npm's internal modules
RUN rm -rf /usr/local/lib/node_modules/npm/node_modules/picomatch

COPY package*.json ./

RUN npm ci

# Symlink app's patched picomatch into npm's module directory
RUN ln -s /app/node_modules/picomatch \
    /usr/local/lib/node_modules/npm/node_modules/picomatch

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]