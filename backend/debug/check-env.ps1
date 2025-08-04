# Environment checker for MQL5 Marketplace project
function Test-DevEnvironment {
    Write-Host "`n[*] Checking Development Environment..."
    Write-Host "======================================"

    # Check Node.js version
    try {
        $nodeVersion = node --version
        if ($nodeVersion -match "v(\d+)") {
            $majorVersion = [int]$matches[1]
            if ($majorVersion -ge 16) {
                Write-Host "[OK] Node.js version: $nodeVersion"
            } else {
                Write-Host "[X] Node.js version $nodeVersion is below recommended v16+"
                Write-Host "TIP: Download latest LTS from https://nodejs.org/"
            }
        }
    } catch {
        Write-Host "[X] Node.js not found"
        Write-Host "TIP: Install Node.js from https://nodejs.org/"
    }

    # Check npm version
    try {
        $npmVersion = npm --version
        if ($npmVersion -match "^(\d+)") {
            $majorVersion = [int]$matches[1]
            if ($majorVersion -ge 8) {
                Write-Host "[OK] npm version: $npmVersion"
            } else {
                Write-Host "[X] npm version $npmVersion is below recommended v8+"
                Write-Host "TIP: Update npm with: npm install -g npm@latest"
            }
        }
    } catch {
        Write-Host "[X] npm not found"
        Write-Host "TIP: npm should be installed with Node.js"
    }

    # Check backend dependencies
    Write-Host "`n[*] Checking Backend Dependencies..."
    Write-Host "=================================="
    try {
        Set-Location (Join-Path $PSScriptRoot "..")
        Write-Host "Directory: $((Get-Location).Path)"
        
        # Check if package.json exists
        if (Test-Path "package.json") {
            Write-Host "[OK] Found package.json"
            
            # Check if node_modules exists
            if (Test-Path "node_modules") {
                Write-Host "[OK] node_modules directory exists"
                
                # Run npm list
                Write-Host "`nInstalled packages (depth=0):"
                npm list --depth=0
                
                # Run npm audit
                Write-Host "`nSecurity audit:"
                npm audit
            } else {
                Write-Host "[X] node_modules not found"
                Write-Host "TIP: Run 'npm install' to install dependencies"
            }
        } else {
            Write-Host "[X] package.json not found"
            Write-Host "TIP: Are you in the correct directory?"
        }
    } catch {
        Write-Host "[X] Error checking backend dependencies:"
        Write-Host $_.Exception.Message
    }

    # Check frontend dependencies
    Write-Host "`n[*] Checking Frontend Dependencies..."
    Write-Host "==================================="
    try {
        Set-Location (Join-Path $PSScriptRoot "../../frontend")
        Write-Host "Directory: $((Get-Location).Path)"
        
        # Check if package.json exists
        if (Test-Path "package.json") {
            Write-Host "[OK] Found package.json"
            
            # Check if node_modules exists
            if (Test-Path "node_modules") {
                Write-Host "[OK] node_modules directory exists"
                
                # Run npm list
                Write-Host "`nInstalled packages (depth=0):"
                npm list --depth=0
                
                # Run npm audit
                Write-Host "`nSecurity audit:"
                npm audit
            } else {
                Write-Host "[X] node_modules not found"
                Write-Host "TIP: Run 'npm install' to install dependencies"
            }
        } else {
            Write-Host "[X] package.json not found"
            Write-Host "TIP: Are you in the correct directory?"
        }
    } catch {
        Write-Host "[X] Error checking frontend dependencies:"
        Write-Host $_.Exception.Message
    }

    # Return to original directory
    Set-Location $PSScriptRoot
}

# Run the environment check
Test-DevEnvironment
