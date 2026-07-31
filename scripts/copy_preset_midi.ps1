$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$dropDir = Join-Path $repoRoot "preset-midi-drop"
$targetDir = Join-Path $repoRoot "assets\midi"
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
New-Item -ItemType Directory -Force -Path $dropDir | Out-Null

$presets = @(
  @{
    DropFile = "幸せをつかむため.mid"
    Target = "shiawase-wo-tsukamu-tame.mid"
  },
  @{
    DropFile = "M2自由になりたい-別紙コーラス.mid"
    Target = "jiyu-ni-naritai-chorus.mid"
  },
  @{
    DropFile = "M8やめられない.mid"
    Target = "yamerarenai.mid"
  },
  @{
    DropFile = "M9魔法のりんご.mid"
    Target = "maho-no-ringo.mid"
  },
  @{
    DropFile = "M14帰りたい.mid"
    Target = "kaeritai.mid"
  },
  @{
    DropFile = "ガラスの靴.mid"
    Target = "glass-no-kutsu.mid"
  }
)

$missing = @()
$copied = 0
foreach ($preset in $presets) {
  $dropSource = Join-Path $dropDir $preset.DropFile
  $source = $null

  if (Test-Path -LiteralPath $dropSource) {
    $source = $dropSource
  }

  if (-not $source) {
    $missing += ("{0} (drop: preset-midi-drop\{1})" -f $preset.Target, $preset.DropFile)
    continue
  }

  $target = Join-Path $targetDir $preset.Target
  Copy-Item -LiteralPath $source -Destination $target -Force
  $item = Get-Item -LiteralPath $target
  $copied += 1
  Write-Host ("Copied {0} ({1:N0} bytes) from {2}" -f $preset.Target, $item.Length, $source)
}

if ($missing.Count -gt 0) {
  Write-Host ""
  Write-Warning "Missing preset source files:"
  $missing | ForEach-Object { Write-Warning $_ }
}

Write-Host ""
Write-Host ("Preset MIDI files are ready in assets\midi. Copied: {0}" -f $copied)
