FROM node:16

WORKDIR /hausle-back
COPY . .
RUN npm install
RUN npm run build

EXPOSE 17200
CMD ["npm","run","start:prod"]