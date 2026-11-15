<#
.SYNOPSIS
  Lightweight local HTTP web server for Godlin's Portfolio using .NET HttpListener.
  Requires zero external installations (no Node.js or Python needed).
#>

param(
  [int]$Port = 8080
)

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"

try {
  $listener.Prefixes.Add($prefix)
  $listener.Start()
} catch {
  $Port = $Port + 1
  $prefix = "http://localhost:$Port/"
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add($prefix)
  $listener.Start()
}

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Godlin R E - Personal Portfolio Local Server" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Serving from: $root" -ForegroundColor DarkGray
Write-Host "  Local URL:    $prefix" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C to stop the server." -ForegroundColor DarkGray
Write-Host "======================================================" -ForegroundColor Cyan

# Open default browser
try {
  Start-Process $prefix
} catch {}

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".ico"  = "image/x-icon"
  ".pdf"  = "application/pdf"
  ".txt"  = "text/plain; charset=utf-8"
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($urlPath)) {
      $urlPath = "index.html"
    }

    $filePath = [System.IO.Path]::Combine($root, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

    if ([System.IO.File]::Exists($filePath)) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime = $mimeTypes[$ext]
      if (-not $mime) { $mime = "application/octet-stream" }

      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $mime
      $response.ContentLength64 = $bytes.Length
      $response.AddHeader("Cache-Control", "no-cache")
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
      $response.StatusCode = 200
    } else {
      $response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.OutputStream.Close()
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
