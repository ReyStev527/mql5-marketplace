# Test if all services are running
function Test-Services {
    Write-Host "`n[*] Checking Services Status..."
    Write-Host "================================"
    
    # Check backend
    try {
        $backendResponse = Invoke-WebRequest -Uri "http://localhost:5000" -Method GET -ErrorAction SilentlyContinue
        if ($backendResponse.StatusCode -eq 200) {
            Write-Host "[OK] Backend: Running on port 5000 (status: $($backendResponse.StatusCode))"
            Update-Counters -status 'success'
        } else {
            Write-Host "[!] Backend: Unexpected status code $($backendResponse.StatusCode)"
            Write-Host "TIP: Expected status code 200"
            Update-Counters -status 'warning'
        }
    } catch {
        if ($_.Exception.Message -like "*Unable to connect*") {
            Write-Host "[X] Backend: Not running"
            Write-Host "TIP: Use command: cd backend; npm run dev"
            Update-Counters -status 'failure'
        } else {
            Write-Host "[!] Backend: Error - $($_.Exception.Message)"
            Write-Host "TIP: Check backend logs for details"
            Update-Counters -status 'warning'
        }
    }
    
    # Check frontend  
    try {
        $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -ErrorAction SilentlyContinue
        if ($frontendResponse.StatusCode -eq 200) {
            Write-Host "[OK] Frontend: Running on port 3000 (status: $($frontendResponse.StatusCode))"
            Update-Counters -status 'success'
        } else {
            Write-Host "[!] Frontend: Unexpected status code $($frontendResponse.StatusCode)"
            Write-Host "TIP: Expected status code 200"
            Update-Counters -status 'warning'
        }
    } catch {
        if ($_.Exception.Message -like "*Unable to connect*") {
            Write-Host "[X] Frontend: Not running"
            Write-Host "TIP: Use command: cd frontend; npm start"
            Update-Counters -status 'failure'
        } else {
            Write-Host "[!] Frontend: Error - $($_.Exception.Message)"
            Write-Host "TIP: Check frontend logs for details"
            Update-Counters -status 'warning'
        }
    }
    
    # Check Node.js processes
    Write-Host "`n[*] Node.js Processes:"
    Write-Host "============================="
    $nodeProcesses = Get-Process node -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, StartTime
    if ($nodeProcesses) {
        $nodeProcesses | Format-Table -AutoSize
        Update-Counters -success $true
    } else {
        Write-Host "[X] No Node.js processes found"
        Update-Counters -success $false
    }
    Write-Host
}

# Quick environment check
function Test-Environment {
    Write-Host "`n[*] Environment Quick Check..."
    Write-Host "============================="
    
    # Backend .env
    if (Test-Path ".env") {
        $backendEnvCount = (Get-Content ".env" | Where-Object { $_ -match "=" }).Count
        if ($backendEnvCount -gt 0) {
            Write-Host "[OK] Backend .env exists ($backendEnvCount variables)"
            Update-Counters -status 'success'
        } else {
            Write-Host "[!] Backend .env exists but is empty"
            Write-Host "TIP: Check .env.example for required variables"
            Update-Counters -status 'warning'
        }
    } else {
        Write-Host "[X] Backend .env missing"
        Write-Host "TIP: Copy from .env.example"
        Update-Counters -status 'failure'
    }
    
    # Frontend .env
    if (Test-Path "..\frontend\.env") {
        $frontendEnvCount = (Get-Content "..\frontend\.env" | Where-Object { $_ -match "=" }).Count
        if ($frontendEnvCount -gt 0) {
            Write-Host "[OK] Frontend .env exists ($frontendEnvCount variables)"
            Update-Counters -status 'success'
        } else {
            Write-Host "[!] Frontend .env exists but is empty"
            Write-Host "TIP: Check frontend\.env.example for required variables"
            Update-Counters -status 'warning'
        }
    } else {
        Write-Host "[X] Frontend .env missing"
        Write-Host "TIP: Copy from frontend\.env.example"
        Update-Counters -status 'failure'
    }
    
    # Node modules
    if ((Test-Path "node_modules") -and (Test-Path "..\frontend\node_modules")) {
        Write-Host "[OK] Dependencies installed"
        Update-Counters -success $true
    } else {
        Write-Host "[X] Dependencies missing"
        Write-Host "TIP: Run npm install in both directories"
        Update-Counters -success $false
    }
}

# Test API connectivity
function Test-APIConnectivity {
    Write-Host "`n[*] Testing API Connectivity..."
    Write-Host "============================="
    
    # Test backend health
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000" -Method GET -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "[OK] Backend responding (status: $($response.StatusCode))"
            Update-Counters -status 'success'
        } elseif ($response.StatusCode -eq 404) {
            Write-Host "[!] Backend responding but returned 404"
            Write-Host "TIP: This might be normal for the root endpoint"
            Update-Counters -status 'warning'
        } else {
            Write-Host "[X] Backend returned unexpected status: $($response.StatusCode)"
            Update-Counters -status 'failure'
        }
    } catch {
        if ($_.Exception.Message -like "*Unable to connect*") {
            Write-Host "[X] Backend not accessible"
            Write-Host "TIP: Make sure backend server is running on port 5000"
            Update-Counters -status 'failure'
        } else {
            Write-Host "[!] Backend error: $($_.Exception.Message)"
            Write-Host "TIP: Check backend logs for details"
            Update-Counters -status 'warning'
        }
    }
    
    # Test auth endpoint
    try {
        $body = @{
            email = "test"
            password = "test"
        } | ConvertTo-Json

        $authResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
            -Method POST `
            -Body $body `
            -ContentType "application/json" `
            -ErrorAction SilentlyContinue

        if ($authResponse.StatusCode -eq 400 -or $authResponse.StatusCode -eq 401) {
            Write-Host "[OK] Auth endpoint responding correctly"
            Write-Host "TIP: 400/401 is expected for invalid credentials"
            Update-Counters -status 'success'
        } else {
            Write-Host "[!] Auth endpoint returned unexpected status: $($authResponse.StatusCode)"
            Write-Host "TIP: Expected 400/401 for invalid credentials"
            Update-Counters -status 'warning'
        }
    } catch {
        if ($_.Exception.Response.StatusCode -eq 400 -or $_.Exception.Response.StatusCode -eq 401) {
            Write-Host "[OK] Auth endpoint responding correctly"
            Write-Host "TIP: 400/401 is expected for invalid credentials"
            Update-Counters -status 'success'
        } elseif ($_.Exception.Message -like "*Unable to connect*") {
            Write-Host "[X] Auth endpoint not accessible"
            Write-Host "TIP: Make sure backend server is running"
            Update-Counters -status 'failure'
        } else {
            Write-Host "[!] Auth endpoint error: $($_.Exception.Message)"
            Write-Host "TIP: Check backend logs for details"
            Update-Counters -status 'warning'
        }
    }
}

# Initialize counters for summary
$script:successCount = 0
$script:warningCount = 0
$script:failureCount = 0

# Function to increment counters based on condition
function Update-Counters {
    param (
        [ValidateSet('success', 'warning', 'failure')]
        [string]$status = 'success'
    )
    switch ($status) {
        'success' { $script:successCount++ }
        'warning' { $script:warningCount++ }
        'failure' { $script:failureCount++ }
    }
}

# Run all checks
$startTime = Get-Date
Write-Host "[*] Running Service Diagnostics..."
Write-Host "================================"
Write-Host "Started at: $($startTime.ToString('yyyy-MM-dd HH:mm:ss'))`n"

Test-Services
Test-Environment
Test-APIConnectivity

$endTime = Get-Date
$duration = $endTime - $startTime

Write-Host "`n[*] Diagnostic Summary"
Write-Host "================================"
Write-Host "Duration: $([math]::Round($duration.TotalSeconds, 2)) seconds"
Write-Host "Successful checks: $successCount [OK]"
Write-Host "Warning checks: $warningCount [!]"
Write-Host "Failed checks: $failureCount [X]"
Write-Host "Total checks: $($successCount + $warningCount + $failureCount)"

# Overall status
$overallStatus = if ($failureCount -gt 0) {
    "[X] Some checks failed"
} elseif ($warningCount -gt 0) {
    "[!] Completed with warnings"
} else {
    "[OK] All checks passed"
}
Write-Host "`n$overallStatus"
