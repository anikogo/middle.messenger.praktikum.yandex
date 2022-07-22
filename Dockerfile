FROM node:18

LABEL version="1.0"
LABEL description="Messenger"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD npm start