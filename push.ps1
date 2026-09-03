# Push script for proodz-website
# Usage: powershell -ExecutionPolicy Bypass -File push.ps1
# Pousse toutes les modifications locales vers origin/main avec retry.

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

# Disable LFS for huge files (we commit them directly for now)
$env:GIT_LFS_SKIP_PUSH = "1"

# Increase HTTP buffer and timeouts for large commits (847+ MB of media)
git config http.postBuffer 524288000
git config http.lowSpeedLimit 1000
git config http.lowSpeedTime 600
git config http.version HTTP/1.1

$logFile = Join-Path $PSScriptRoot "push.log"
"=== PUSH START $(Get-Date -Format 'o') ===" | Out-File -FilePath $logFile -Append

$attempts = 5
$success = $false

for ($i = 1; $i -le $attempts; $i++) {
    Write-Host "[$i/$attempts] Pushing to origin/main..." -ForegroundColor Cyan
    "Attempt $i at $(Get-Date -Format 'o')" | Out-File -FilePath $logFile -Append

    $output = git push --progress origin main 2>&1
    $code = $LASTEXITCODE
    $output | Out-File -FilePath $logFile -Append

    if ($code -eq 0) {
        Write-Host "Push succeeded!" -ForegroundColor Green
        $success = $true
        break
    }

    Write-Host "Push failed (exit $code). Waiting 30s before retry..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30
}

if (-not $success) {
    Write-Host "Push failed after $attempts attempts. See $logFile" -ForegroundColor Red
    exit 1
}

"=== PUSH SUCCESS $(Get-Date -Format 'o') ===" | Out-File -FilePath $logFile -Append
Write-Host "Done. Vercel will deploy automatically." -ForegroundColor Green
