FROM node:18

WORKDIR /usr/src/app

COPY . ./
RUN yarn

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production
ENV TZ=Asia/Tokyo

RUN yarn build

CMD ["yarn", "start"]
