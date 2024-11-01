# Use a Gradle image to build the project
FROM gradle:latest as builder

# Copy the Gradle project to the container
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

# Build the project
# Use --no-daemon for Docker builds since the daemon is not useful here
RUN gradle build --no-daemon

# Use a JDK image for the runtime
FROM openjdk:latest

# Install Python
RUN apt-get update && apt-get install -y python

# Copy the built jar from the builder stage
COPY --from=builder /home/gradle/src/build/libs/*.jar /app/backend.jar

# Set the working directory in the container
WORKDIR /app

# Command to run the application
CMD ["java", "-jar", "-Dspring.profiles.active=cloud", "backend.jar"]
