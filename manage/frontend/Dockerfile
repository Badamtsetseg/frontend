FROM node:12-alpine
USER node:node
WORKDIR /home/node/app
COPY package*.json ./
COPY node_modules node_modules
COPY dist dist

EXPOSE 3000
CMD ["node", "dist/server/server.js"]
