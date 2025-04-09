ARG IMAGE=node:22.14.0-alpine

FROM $IMAGE as builder
WORKDIR /app
COPY package*.json .
COPY . .

FROM builder as dev
CMD [sh, -c, "npm run start:dev"]

FROM builder as prod-build
RUN npm install
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM $IMAGE as prod
WORKDIR /app
USER node
COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
ENTRYPOINT [ "node", "dist/main.js" ]