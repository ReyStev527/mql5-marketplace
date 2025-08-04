function Get-DebugPrompt {
    param (
        [Parameter(Position = 0)]
        [ValidateSet('routes', 'api', 'auth', 'sheets', 'ui')]
        [string]$IssueType
    )

    $prompts = @{
        'routes' = @"
Help me debug React Router issues. My routes are:
- / (public home)
- /auth/login, /auth/register (auth pages)
- /dashboard (protected user)
- /admin/* (protected admin)

Issues: Navigation not working, protected routes not redirecting
Check: App.js routing config, ProtectedRoute component, AuthContext
"@

        'api' = @"
Debug API connectivity issues between React frontend and Node.js backend:
- Frontend: localhost:3000
- Backend: localhost:5000
- Using axios for requests
- JWT authentication

Issues: CORS errors, network failures, 404s on API calls
Check: CORS config, API base URL, request headers
"@

        'auth' = @"
Debug authentication flow issues:
- JWT tokens generated on backend
- Stored in localStorage on frontend
- AuthContext manages auth state
- Protected routes check authentication

Issues: Login not persisting, tokens not working, redirects failing
Check: Token generation, storage, verification, context state
"@

        'sheets' = @"
Debug Google Sheets integration:
- Using googleapis library
- JWT service account auth
- CRUD operations on user/product data

Issues: Connection failures, authentication errors, data not saving
Check: Service account setup, credentials format, sheet permissions
"@

        'ui' = @"
Debug Material-UI and component issues:
- Custom theme with gradients
- Professional buttons and navigation
- Responsive sidebar layout
- Role-based component rendering

Issues: Styling not applied, components not rendering, responsive issues
Check: Theme provider, component imports, CSS-in-JS, breakpoints
"@
    }

    if (-not $IssueType) {
        Write-Host "Usage: Get-DebugPrompt [routes|api|auth|sheets|ui]`n"
        Write-Host "Available debug prompts:"
        Write-Host "  routes - React Router and navigation issues"
        Write-Host "  api    - Frontend-backend API connectivity"
        Write-Host "  auth   - Authentication and JWT issues"
        Write-Host "  sheets - Google Sheets integration problems"
        Write-Host "  ui     - Material-UI and component styling"
        return
    }

    Write-Host $prompts[$IssueType]
}

# Create an alias for easier usage
Set-Alias -Name debug -Value Get-DebugPrompt

# Examples:
# debug routes    # Show React Router debugging prompts
# debug api       # Show API connectivity debugging prompts
# debug auth      # Show authentication debugging prompts
# debug sheets    # Show Google Sheets debugging prompts
# debug ui        # Show UI/component debugging prompts
# debug           # Show usage help
