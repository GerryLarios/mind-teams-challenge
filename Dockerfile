###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine as dev

# Create app directory
WORKDIR /usr/src/app

# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Installing clean app dependencies.  If any dependencies are missing or have incompatible versions, it will throw an error.
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image, never use the root user.
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

# Create app directory
WORKDIR /usr/src/app

# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Copying node_modules from the development image in order to execute `npm run build`.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Bundle app source
COPY --chown=node:node . .

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

# Use the node user from the image, never use the root user.
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As prod

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
