FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN grep -A 2 '"node_modules/picomatch"' package-lock.json

RUN npm ci

RUN find node_modules -name "package.json" -path "*/picomatch/package.json" | xargs grep '"version"'

# DEBUG: Check Node base image for picomatch
RUN find /usr/local/lib -name "package.json" -path "*/picomatch/*" 2>/dev/null | xargs grep '"version"' 2>/dev/null || echo "none found in /usr/local/lib"

# DEBUG: Check entire filesystem
RUN find / -name "package.json" -path "*/picomatch/*" 2>/dev/null | xargs grep '"version"' 2>/dev/null

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]