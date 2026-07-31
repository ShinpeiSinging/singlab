# Preset MIDI drop folder

Put MIDI files here when you want to update bundled preset songs.

Use these names:

- `M2自由になりたい-別紙コーラス.mid`
- `M5自由はいかが.mid`
- `M8やめられない.mid`
- `M9魔法のりんご.mid`
- `M14帰りたい.mid`
- `ガラスの靴.mid`

Then run:

```powershell
.\scripts\copy_preset_midi.ps1
```

The script copies them to `assets/midi/` with stable public file names used by the web app.
