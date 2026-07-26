# SingLab

SingLab is a browser-based singing pitch practice tool.

MIDI files are used as the reference performance. The selected reference track is shown as bars on the pitch graph, while microphone input is analyzed locally in the browser and drawn as a real-time pitch curve.

## Live Site

This project is intended to be published with GitHub Pages:

```text
https://<github-owner>.github.io/singlab/
```

Replace `<github-owner>` with the GitHub account or organization that owns the repository.

## Features

- Load a MIDI file in the browser.
- Play all MIDI tracks with a browser-based synth.
- Select one MIDI track as the vocal/reference line.
- Analyze microphone pitch locally with Web Audio API.
- Compare the detected vocal pitch against the selected MIDI reference.
- Switch pitch detection modes: Hybrid, YIN, MPM, ACF, and AMDF.
- Adjust voice range, graph width, and voice threshold in real time.

## Privacy

Microphone audio is processed on the user's device. The current GitHub Pages version does not upload audio to a server.

## Local Run

Use any static file server. For example:

```powershell
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

Opening `index.html` directly as a local file may work for some features, but a local server is closer to the GitHub Pages environment.

## GitHub Pages Setup

1. Create a public GitHub repository named `singlab`.
2. Push this repository to GitHub.
3. In GitHub, open `Settings` -> `Pages`.
4. Set the source to `Deploy from a branch`.
5. Select branch `main` and folder `/`.
6. Save and wait for the Pages URL to become available.

## Notes

- MIDI playback uses browser-side libraries and a SoundFont loaded from public CDNs.
- CREPE, SPICE, and Basic Pitch are listed as future high-accuracy options, but they are not bundled in this static MVP.
- The legacy Python API is not required for GitHub Pages deployment.
