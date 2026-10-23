FROM node:18-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R appuser:appgroup /usr/src/app
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]