# Use OpenJDK 21 image
FROM eclipse-temurin:21-jdk as build

WORKDIR /app

# Copy project files
COPY . .

# Package the application
RUN ./mvnw clean package -DskipTests

# Run the packaged app
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
