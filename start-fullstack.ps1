Write-Host "Starting Full-Stack Payroll Management System..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Spring Boot Backend..." -ForegroundColor Yellow
Set-Location springapp
Start-Process cmd -ArgumentList "/k", "java -jar target/springapp-0.0.1-SNAPSHOT.jar" -WindowStyle Normal
Set-Location ..

Write-Host "Waiting 10 seconds for Spring Boot to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

Write-Host "Starting Angular Frontend..." -ForegroundColor Yellow
Set-Location angularapp
Start-Process cmd -ArgumentList "/k", "ng serve --proxy-config proxy.conf.json --port 4200" -WindowStyle Normal
Set-Location ..

Write-Host ""
Write-Host "Both applications are starting..." -ForegroundColor Green
Write-Host "Spring Boot: http://localhost:9090" -ForegroundColor Blue
Write-Host "Angular: http://localhost:4200" -ForegroundColor Blue
Write-Host ""
Write-Host "Open http://localhost:4200 in your browser to test the application" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
