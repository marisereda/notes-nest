FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
EXPOSE 3000