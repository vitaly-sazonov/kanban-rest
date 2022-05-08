FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /home/app/

RUN mkdir -p ./dist
RUN mkdir -p ./uploads


COPY migrations ./migrations
COPY typings ./typings
COPY src ./src
COPY logs ./logs

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm ci

