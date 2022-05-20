FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /home/app/

RUN mkdir -p ./dist
RUN mkdir -p ./uploads
RUN mkdir -p ./logs

COPY migrations ./migrations
COPY typings ./typings
COPY src ./src

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm ci
RUN npm run build

