# ----------- Build Frontend -----------
FROM node:18 AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build


# ----------- Backend + Production Image -----------
FROM node:18

WORKDIR /app

# Copy backend package.json and install deps
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend/ ./backend/

# Copy frontend build into backend/public
COPY --from=frontend-build /app/frontend/dist ./backend/public

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "index.js"]
