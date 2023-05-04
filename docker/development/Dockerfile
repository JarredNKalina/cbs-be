FROM node:14 as development

WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn prisma:generate
RUN yarn build

FROM node:14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json .
RUN yarn --only=production

COPY --from=development /app/prisma ./prisma
RUN yarn prisma:generate

COPY --from=development /app/dist ./dist
CMD ["node", "dist/index.js"]
