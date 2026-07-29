$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$assetDir = Join-Path $repoRoot "assets\midi"
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null

$songs = @(
  @{
    Source = "G:\マイドライブ\ライブ\202508\音取り音源\幸せをつかむため\幸せをつかむため.mid"
    Target = "shiawase-wo-tsukamu-tame.mid"
  },
  @{
    Source = "G:\マイドライブ\ライブ\202608\【原本】M14帰りたい 1.mid"
    Target = "kaeritai.mid"
  }
)

foreach ($song in $songs) {
  if (-not (Test-Path -LiteralPath $song.Source)) {
    throw "MIDI file not found: $($song.Source)"
  }
  Copy-Item -LiteralPath $song.Source -Destination (Join-Path $assetDir $song.Target) -Force
  Write-Host "Copied $($song.Target)"
}

Write-Host "Default MIDI files are ready in $assetDir"
