param(
  [ValidateSet("dev", "build", "lint", "sync")]
  [string]$Command = "dev"
)

$src  = "G:\Mon Drive\Proodz AI\proodz web officiel"
$dst  = "C:\temp\proodz"
$node = "$dst\node_modules\.bin"

# Sync sources (excluding node_modules)
Write-Host "[sync] Copying sources from G: to C:..." -ForegroundColor Cyan
robocopy $src $dst /MIR /XD node_modules .git .next var /R:1 /W:1 /NP /NDL /NFL /NJH /NJS /XF run.ps1 > $null

if ($Command -eq "sync") {
  Write-Host "[done] Sources synced to $dst" -ForegroundColor Green
  return
}

# Run command
Push-Location $dst
try {
  switch ($Command) {
    "dev"   { npm run dev }
    "build" { npm run build }
    "lint"  { npm run lint }
  }
} finally {
  Pop-Location
}
