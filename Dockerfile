FROM node:20.4.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]