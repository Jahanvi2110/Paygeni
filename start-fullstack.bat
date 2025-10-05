@echo off
echo Starting Full-Stack Payroll Management System...
echo.

echo Starting Spring Boot Backend...
cd springapp
start "Spring Boot" cmd /k "java -jar target/springapp-0.0.1-SNAPSHOT.jar"
cd ..

echo Waiting 10 seconds for Spring Boot to start...
timeout /t 10 /nobreak > NUL

echo Starting Angular Frontend...
cd angularapp
start "Angular" cmd /k "ng serve --proxy-config proxy.conf.json --port 4200"
cd ..

echo.
echo Both applications are starting...
echo Spring Boot: http://localhost:9090
echo Angular: http://localhost:4200
echo.
echo Open http://localhost:4200 in your browser to test the application
echo.
pause
