# --- STAGE 1: Build the React Frontend ---
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Build React app
RUN npm run build

# --- STAGE 2: Build the Spring Boot Backend ---
FROM maven:3.9.6-eclipse-temurin-17-alpine AS backend-build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Copy the React build output from the frontend stage
COPY --from=frontend-build /app/src/main/resources/static ./src/main/resources/static

# Build the application with the docker profile to skip frontend-maven-plugin
RUN mvn clean package -DskipTests -Pdocker

# --- STAGE 3: Final Runtime ---
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR
COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx512m", "-jar", "app.jar"]