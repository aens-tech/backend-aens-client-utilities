FROM node:18

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm i
RUN npm run dev

EXPOSE 3000
CMD ["npm", "run", "start"]