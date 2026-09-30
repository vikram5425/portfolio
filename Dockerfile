FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY src src
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
ENV JAVA_OPTS="-Xms32m -Xmx48m -XX:MaxMetaspaceSize=80m -Xss256k -XX:+UseSerialGC -XX:+TieredCompilation -XX:TieredStopAtLevel=1"

EXPOSE ${PORT}
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=$PORT -jar app.jar"]
