FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Debug: check what picomatch version is in the copied lockfile
RUN grep -A 2 '"node_modules/picomatch"' package-lock.json

RUN npm ci

# Debug: check what actually got installed
RUN find node_modules/picomatch -name "package.json" | xargs grep '"version"'

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]