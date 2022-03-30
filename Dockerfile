FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /home/app/

COPY dist ./dist
COPY migrations ./migrations
COPY uploads ./uploads
COPY typings ./typings
COPY src ./src
COPY logs ./logs

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm ci

