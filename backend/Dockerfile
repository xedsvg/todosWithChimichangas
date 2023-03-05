FROM node:16

WORKDIR /backend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn
COPY . .

CMD [ "yarn", "dev" ]