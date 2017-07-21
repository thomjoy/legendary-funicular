FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/reece-rm-mvp
WORKDIR /usr/src/reece-rm-mvp/app

# Install app dependencies
COPY app /usr/src/reece-rm-mvp/app
RUN npm install

EXPOSE 1337

# run the app
CMD [ "npm", "start" ]
  
