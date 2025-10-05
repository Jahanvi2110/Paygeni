@echo off
echo Starting Spring Boot Application...
cd /d "%~dp0"
mvn clean compile
java -cp "target/classes;%USERPROFILE%\.m2\repository\org\springframework\boot\spring-boot-starter-web\3.5.5\*;%USERPROFILE%\.m2\repository\org\springframework\boot\spring-boot-starter-data-jpa\3.5.5\*;%USERPROFILE%\.m2\repository\com\mysql\mysql-connector-j\*\*" com.example.springapp.SpringappApplication
pause
