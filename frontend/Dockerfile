ARG IMAGE=node:22.14.0-alpine

FROM $IMAGE AS builder
WORKDIR /app
COPY package*.json .
COPY . .

FROM builder AS dev
EXPOSE 5173
CMD ["sh","-c", "npm run dev"]

FROM builder AS prod-build
RUN npm install
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM nginx:alpine AS prod
WORKDIR /app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=prod-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]