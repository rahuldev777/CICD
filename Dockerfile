FROM node:22-alpine

WORKDIR /app

# Copy both package.json AND package-lock.json
COPY package*.json ./

# Use npm ci - installs exactly what's in lockfile (respects overrides)
RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]