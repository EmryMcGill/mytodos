# Layer 1: use node:16 base image
FROM node:16-alpine

# Layer 2: create a directory called `app` in the container and set it as the working directory.
WORKDIR /app

# Layer 3: Copying the package.json file from the root of the project to the `app` directory in the container.
COPY package.json .

# Layer 4: Installing the dependencies listed in the package.json file.
RUN npm install

# Layer 5: Copying all the files from the root of the project to the `app` directory in the container.
COPY . .

# Layer 6: the container will listen on port 3000.
EXPOSE 3000

# Layer 7: run the `npm start` command when the container is started.
CMD ["npm", "start"]