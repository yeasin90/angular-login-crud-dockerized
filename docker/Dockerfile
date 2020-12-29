### download node image into this image. required for npm
FROM node:latest As builderapp

### Set working directory of image
WORKDIR /usr/src/app

### Copy package.json and package-lock.json
COPY package*.json ./

### install angular app packages from package.json
RUN npm install

### copy all files and folders from project root directory to WORKDIR (except files from .dockerignore)
COPY . .

### variable which will be passed from docker-compose.yml
ARG PROFILE
ENV PROFILE $PROFILE

RUN echo "Environment: ${PROFILE}"
### build angular app
RUN npm run build-${PROFILE}

### For running our Angular app, it’s preferable to use nginx, rather than Node.js. 
### In that case, we’ll use the FROM statement, where we specify we want to use nginx.
FROM nginx:latest

### With the following copy statements, we’ll copy built Angular app from the/dist folder in the builderapp to the html folder of nginx.
COPY --from=builderapp /usr/src/app/dist/* /usr/share/nginx/html
### copy nginx.conf from our project to docker image where nginx is installed 
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf