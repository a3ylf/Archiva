FROM node:18

WORKDIR /app



ENV REACT_APP_API_URL=http://localhost:3000

COPY . .
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]

