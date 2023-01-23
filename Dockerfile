FROM node:16 as common-build-stage

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node

# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN curl -f https://get.pnpm.io/v6.16.js > pnpm-installer.js  | node - add --global pnpm
RUN node pnpm-installer.js add --global pnpm

WORKDIR /home/node/app

RUN pnpm config set store-dir .pnpm-store

# Files required by pnpm install
COPY --chown=node:node package.json pnpm-lock.yaml ./
# .npmrc

RUN pnpm install --frozen-lockfile

# Copy source code (and all other relevant files)
COPY --chown=node:node . .

RUN pnpm build

USER node
ARG NODE_HOST_PORT
EXPOSE $NODE_HOST_PORT

ENV NODE_ENV production

# CMD [ "node", "dist/server.js" ]
CMD [ "node", "build/server.js" ]

# ##############################################################

# FROM node:16-alpine

# WORKDIR /home/node

# # Copy dependency information and install all dependencies
# # RUN apk --no-cache add curl
# # RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
# COPY --chown=node:node --from=common-build-stage /home/node/pnpm-installer.js .
# RUN node pnpm-installer.js add --global pnpm

# WORKDIR /home/node/app

# # # Copy dependency information and install production-only dependencies
# COPY --chown=node:node package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile --production
# # .npmrc

# # Copy results from previous stage
# COPY --chown=node:node --from=common-build-stage /home/node/app/dist ./dist
# COPY --chown=node:node .env.production.local ./.env.production.local

# RUN rm package.json pnpm-lock.yaml

# USER node
# EXPOSE 8080

# ENV NODE_ENV production

# CMD [ "node", "dist/server.js" ]
