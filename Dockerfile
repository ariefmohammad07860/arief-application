# ----------- Build Frontend -----------
FROM node:18 as frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ----------- Build Backend -----------
FROM node:18

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source
COPY backend/ .

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 5000

CMD ["node", "index.js"]
