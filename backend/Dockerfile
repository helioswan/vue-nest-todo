ARG IMAGE=node:22.14.0-alpine

FROM $IMAGE AS builder
WORKDIR /app
COPY package*.json .
COPY . .

FROM builder AS dev
EXPOSE 3000
CMD ["sh","-c", "npm run start:dev"]

FROM builder AS prod-build
RUN npm install
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM $IMAGE AS prod
WORKDIR /app
USER node
COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
ENTRYPOINT [ "node", "dist/main.js" ]