FROM node:alpine AS builder

COPY package.json /cvfy/package.json
COPY package-lock.json /cvfy/package-lock.json

WORKDIR /cvfy

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

COPY --from=builder /cvfy/.output/ /cvfy

WORKDIR /cvfy

ENTRYPOINT [ "node", "./server/index.mjs" ]

EXPOSE 3000