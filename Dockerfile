FROM node:16-alpine AS builder

WORKDIR /app


COPY . .
RUN npm i

CMD [ "npm","run", "dev" ]