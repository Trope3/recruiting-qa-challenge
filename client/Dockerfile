FROM node:14

WORKDIR /app

COPY package* ./
RUN npm install

COPY . ./

RUN ls -la

RUN npm run build

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html