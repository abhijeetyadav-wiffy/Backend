$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:8000"

try {
    $healthResponse = Invoke-WebRequest -Uri "$baseUrl/api/auth/" -UseBasicParsing -Method Get
    if ($healthResponse.StatusCode -ne 200) {
        throw "Backend health check failed with status $($healthResponse.StatusCode)."
    }
}
catch {
    throw "Backend server is not running on port 8000. Start it first with: npm run dev"
}

$ts = Get-Date -Format "yyyyMMddHHmmss"
$email = "smoke$ts@example.com"
$password = "123456"

$registerBody = @{
    name     = "Smoke User"
    email    = $email
    password = $password
} | ConvertTo-Json

$register = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -ContentType "application/json" -Body $registerBody
$token = $register.token
$userId = [int]$register.data.id

if (-not $token) {
    throw "Register succeeded but token was missing in response."
}

if (-not $userId) {
    throw "Register succeeded but user id was missing in response."
}

$unauthStatus = ""
try {
    Invoke-WebRequest -Uri "$baseUrl/api/todos/user/$userId" -Method Get -UseBasicParsing | Out-Null
    $unauthStatus = "unexpected-success"
}
catch {
    if ($_.Exception.Response) {
        $unauthStatus = [int]$_.Exception.Response.StatusCode
    }
    else {
        $unauthStatus = "network-error"
    }
}

if ($unauthStatus -ne 401) {
    throw "Expected 401 for unauthenticated todo access, got: $unauthStatus"
}

$authHeaders = @{
    Authorization  = "Bearer $token"
    "Content-Type" = "application/json"
}

$createBody = @{
    title   = "Smoke Todo $ts"
    user_id = $userId
} | ConvertTo-Json

$created = Invoke-RestMethod -Uri "$baseUrl/api/todos" -Method Post -Headers $authHeaders -Body $createBody
$todoId = [int]$created.data.id

if (-not $todoId) {
    throw "Todo creation failed: missing todo id in response."
}

$todos = Invoke-RestMethod -Uri "$baseUrl/api/todos/user/$userId" -Method Get -Headers @{ Authorization = "Bearer $token" }

$patchBody = @{ completed = $true } | ConvertTo-Json
$patched = Invoke-RestMethod -Uri "$baseUrl/api/todos/user/$userId/$todoId/completed" -Method Patch -Headers $authHeaders -Body $patchBody

$deleted = Invoke-RestMethod -Uri "$baseUrl/api/todos/user/$userId/$todoId" -Method Delete -Headers @{ Authorization = "Bearer $token" }

$logout = Invoke-RestMethod -Uri "$baseUrl/api/auth/logout" -Method Post -Headers @{ Authorization = "Bearer $token" }

if ($patched.data.count -ne 1) {
    throw "Expected patch count to be 1, got $($patched.data.count)."
}

if ($deleted.data.count -ne 1) {
    throw "Expected delete count to be 1, got $($deleted.data.count)."
}

$result = [pscustomobject]@{
    email                = $email
    userId               = $userId
    unauthStatus         = $unauthStatus
    createdTodoId        = $todoId
    todoCountAfterCreate = ($todos.data | Measure-Object).Count
    patchCount           = $patched.data.count
    deleteCount          = $deleted.data.count
    logoutMessage        = $logout.message
}

$result | ConvertTo-Json -Depth 4
