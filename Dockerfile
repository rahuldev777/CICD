FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN grep -A 2 '"node_modules/picomatch"' package-lock.json

RUN npm ci

# ADD THIS LINE - finds ALL picomatch installs including nested ones
RUN find node_modules -name "package.json" -path "*/picomatch/package.json" | xargs grep '"version"'

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]