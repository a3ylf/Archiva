FROM node:slim
WORKDIR /app
RUN apt-get update -y \
&& apt-get install -y openssl
COPY package*.json ./
RUN npm install

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run start:dev"]


