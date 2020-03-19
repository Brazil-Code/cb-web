FROM node:12

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN npm install
RUN npm rebuild node-sass
COPY . .

EXPOSE 3000
CMD ["npm", "start"]