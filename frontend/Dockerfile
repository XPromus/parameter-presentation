FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY ./frontend/package.json ./frontend/bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY ./frontend/package.json ./frontend/bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY ./frontend .

ENV NODE_ENV=production
RUN bun --bun run vite build

FROM caddy:alpine
COPY --from=prerelease . /srv
COPY ./docker/caddy/config/Caddyfile /etc/caddy/

EXPOSE 80 443 443/udp
