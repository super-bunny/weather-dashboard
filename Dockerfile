FROM node:12 as build-stage
ARG REACT_APP_OPEN_WEATHER_API_KEY
ARG REACT_APP_OPEN_WEATHER_URL
ARG REACT_APP_OPEN_WEATHER_PROXY_SAME_ORIGIN=false
ARG REACT_APP_OPEN_WEATHER_PROXY_PATH
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
ENV PORT=80
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf.template .
CMD ["/bin/sh" , "-c" , "envsubst '${PORT} ${OPEN_WEATHER_API_KEY}' < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
