FROM node:16 


# Create app directory
WORKDIR /usr/src/app 


# Install app dependencies
COPY package*.json ./ 

# Set user
# USER root | this presents a potential security misconfiguration
USER node


RUN npm install 
# if you are building your code for production
# RUN npm ci --omit=dev


# Bundle app source
COPY . . 


EXPOSE 8080
CMD [ "node", "server.js" ]



# It's a Dockerfile that's running in the root directory of some node.js 
# application. And what this Dockerfile is doing is it's going to create 
# an app directory. It'll copy the package.json, describing the app 
# dependencies to that directory. It'll set the user privileges to root, 
# run npm install, copy the source of the app to that directory, and then 
# run the app on port 8080.

# This code is vulnerable because of a potential security misconfiguration.
# This happens because when we set the user permissions, we set them 
# to root, which means administrator level privileges on this whole Docker 
# image. This is really bad because something that happens afterwards, 
# like npm install, or even running the server itself, we could be 
# installing some kind of malicious package, or we could have a 
# vulnerability within the app itself. If this happens, that means 
# that because this whole Docker image has these administrator level 
# permissions, this could potentially have disastrous consequences 
# for the machine that we're running on. We don't want to give away 
# administrator privileges willy-nilly. So what we can do is instead 
# of doing that, let's run with just user level permissions so that 
# we don't have the potential to wreck everything, if there's something 
# malicious going on here. 

# USER node 

# And by doing this, we prevent the security misconfiguration 
# vulnerability.
