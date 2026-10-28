# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# VITE_* values are inlined into the bundle at build time, so they arrive as
# build args rather than runtime env. Puppeteer is never imported by the app;
# skipping its Chromium download keeps the build small and fast.
ARG VITE_APP_API_BASE_URL=https://docs-backend.twendedigital.tech
ARG VITE_GOOGLE_CLIENT_ID=330709384324-hrs7ac1ovucrd4rdbjad2ahor1d3hr6l.apps.googleusercontent.com
ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL \
    VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID \
    PUPPETEER_SKIP_DOWNLOAD=true

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy React build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
