@echo off
echo Starting Spring Boot Application...
cd /d C:\Users\DELL\Desktop\FullStack-Paygeni\springapp
echo Current directory: %CD%
echo.
echo Checking if JAR exists...
if exist target\springapp-0.0.1-SNAPSHOT.jar (
    echo JAR file found. Starting application...
    java -jar target\springapp-0.0.1-SNAPSHOT.jar
) else (
    echo JAR file not found. Building first...
    mvn clean package -DskipTests
    echo.
    echo Starting application...
    java -jar target\springapp-0.0.1-SNAPSHOT.jar
)
pause
