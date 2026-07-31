$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$targetDir = Join-Path $repoRoot "assets\midi"
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

$presets = @(
  @{
    Source = "G:\マイドライブ\ライブ\202508\音取り音源\幸せをつかむため\幸せをつかむため.mid"
    Target = "shiawase-wo-tsukamu-tame.mid"
  },
  @{
    Source = "G:\マイドライブ\ライブ\202608\midi\【0427】M2自由になりたい【別紙コーラス】.mid"
    Target = "jiyu-ni-naritai-chorus.mid"
  },
  @{
    Source = "G:\マイドライブ\ライブ\202608\midi\【原本】M8やめられない.mid"
    Target = "yamerarenai.mid"
  },
  @{
    Source = "G:\マイドライブ\ライブ\202608\midi\【原本】M9 魔法のりんご【0416更新】.mid"
    Target = "maho-no-ringo.mid"
  },
  @{
    Source = "G:\マイドライブ\ライブ\202608\midi\【原本】M14帰りたい 1.mid"
    Target = "kaeritai.mid"
  },
  @{
    Source = "G:\マイドライブ\ライブ\202608\midi\【原本】ガラスの靴.mid"
    Target = "glass-no-kutsu.mid"
  }
)

$missing = @()
foreach ($preset in $presets) {
  if (-not (Test-Path -LiteralPath $preset.Source)) {
    $missing += $preset.Source
    continue
  }

  $target = Join-Path $targetDir $preset.Target
  Copy-Item -LiteralPath $preset.Source -Destination $target -Force
  $item = Get-Item -LiteralPath $target
  Write-Host ("Copied {0} ({1:N0} bytes)" -f $preset.Target, $item.Length)
}

if ($missing.Count -gt 0) {
  Write-Host ""
  Write-Warning "Missing source files:"
  $missing | ForEach-Object { Write-Warning $_ }
  exit 1
}

Write-Host ""
Write-Host "Preset MIDI files are ready in assets\midi."
