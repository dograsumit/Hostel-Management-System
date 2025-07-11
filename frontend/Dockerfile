# Base Image
FROM node:18 as frontend

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (only once)
RUN npm install

# Copy the rest of the frontend app code
COPY . ./

# Expose the default React development server port
EXPOSE 3001

# Run the app in development mode
CMD ["npm", "start"]
