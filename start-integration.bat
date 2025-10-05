@echo off
echo Starting Full-Stack Payroll Management System...
echo.

echo Starting Spring Boot Backend...
start "Spring Boot" cmd /k "cd /d C:\Users\DELL\Desktop\FullStack-Paygeni\springapp && java -jar target/springapp-0.0.1-SNAPSHOT.jar"

echo Waiting 10 seconds for Spring Boot to start...
timeout /t 10 /nobreak > nul

echo Starting Angular Frontend with Proxy...
start "Angular" cmd /k "cd /d C:\Users\DELL\Desktop\FullStack-Paygeni\angularapp && ng serve --proxy-config proxy.conf.json"

echo.
echo Both applications are starting...
echo Spring Boot: http://localhost:9090
echo Angular: http://localhost:4200
echo.
echo Integration is ready! You can now:
echo 1. Open http://localhost:4200 in your browser
echo 2. Go to signup page
echo 3. Create a new account
echo 4. Data will be saved to MySQL database
echo.
pause
