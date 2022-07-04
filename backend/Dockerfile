FROM node:16-alpine

WORKDIR /code/cache

COPY package.json ./
COPY package-lock.json ./

RUN npm install

WORKDIR /code
COPY . .

ENTRYPOINT ["sh", "entrypoint.sh" ]