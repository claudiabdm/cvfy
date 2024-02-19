FROM node:21-alpine as build
WORKDIR /app
COPY . .
RUN npm install yarn
RUN NODE_OPTIONS=--openssl-legacy-provider yarn build
RUN NODE_OPTIONS=--openssl-legacy-provider yarn generate

FROM node:21-alpine
WORKDIR /root/
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 4300
CMD ["serve", "-s", "dist", "-l", "4300"]
