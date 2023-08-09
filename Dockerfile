# Stage 1
FROM node:10.24.1 as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/happening /usr/share/nginx/html
