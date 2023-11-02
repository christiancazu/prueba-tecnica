FROM node:latest as build-stage
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM node:alpine as production-stage

WORKDIR /app

COPY --from=build-stage ./app/dist ./dist
COPY package.json .
COPY yarn.lock .
COPY server.js .

RUN yarn install --production

CMD [ "node", "server.js" ]
