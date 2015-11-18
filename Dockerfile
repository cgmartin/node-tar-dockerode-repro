FROM node:0.10-slim 

EXPOSE 8626
WORKDIR /app
ENV NODE_ENV=production
CMD node test-tarfile.js

## Copy dist folder to application 
COPY package.json /app/
RUN npm install
COPY . /app
