FROM node:slim
WORKDIR /app
RUN apt-get update -y \
&& apt-get install -y openssl
COPY package*.json ./
RUN npm install

COPY . .
CMD npx prisma db push & npm run start:dev

