@echo off
echo Starting Full-Stack Payroll Management System...
echo.

REM Start Spring Boot Backend
echo Starting Spring Boot Backend...
cd springapp
start "Spring Boot" cmd /k "java -jar target/springapp-0.0.1-SNAPSHOT.jar"
cd ..
echo Waiting 15 seconds for Spring Boot to start...
timeout /t 15 /nobreak > NUL
echo.

REM Start Angular Frontend
echo Starting Angular Frontend...
cd angularapp
start "Angular" cmd /k "ng serve --proxy-config proxy.conf.json --port 4200"
cd ..
echo.

echo Both applications are starting...
echo Spring Boot: http://localhost:9090
echo Angular: http://localhost:4200
echo.
echo Integration is ready! You can now:
echo 1. Open http://localhost:4200 in your browser
echo 2. Go to signup page
echo 3. Create a new account with your real name
echo 4. Data will be saved to MySQL database
echo 5. Login and see your personalized dashboard
echo.
echo Press any key to continue...
pause
