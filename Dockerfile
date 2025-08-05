FROM node:24-alpine3.21
# get the latest ffmpeg
#RUN apt-get update
#RUN apt-get install -y ffmpeg
#RUN apk update
#RUN apk add ffmpeg

# Create app directory
WORKDIR /usr/src/posttoemail
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 8080 
#CMD [ "node", "server.js" ]
CMD [ "npm", "run", "start" ]