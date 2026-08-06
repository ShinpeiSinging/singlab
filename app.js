const els = {
  appVersion: document.getElementById("app-version"),
  micStart: document.getElementById("mic-start"),
  micStop: document.getElementById("mic-stop"),
  reviewTake: document.getElementById("review-take"),
  saveTake: document.getElementById("save-take"),
  metronomeToggle: document.getElementById("metronome-toggle"),
  micStatus: document.getElementById("mic-status"),
  micNote: document.getElementById("mic-note"),
  micFrequency: document.getElementById("mic-frequency"),
  micConfidence: document.getElementById("mic-confidence"),
  micTrend: document.getElementById("mic-trend"),
  micChart: document.getElementById("mic-chart"),
  pitchModel: document.getElementById("pitch-model"),
  graphScale: document.getElementById("graph-scale"),
  playbackSpeed: document.getElementById("playback-speed"),
  playbackSpeedNumber: document.getElementById("playback-speed-number"),
  playbackSpeedLabel: document.getElementById("playback-speed-label"),
  metronomeMode: document.getElementById("metronome-mode"),
  voiceThreshold: document.getElementById("voice-threshold"),
  guideOffset: document.getElementById("guide-offset"),
  guideOctave: document.getElementById("guide-octave"),
  countIn: document.getElementById("count-in"),
  audioStatus: document.getElementById("audio-status"),
  audioProgress: document.getElementById("audio-progress"),
  audioNote: document.getElementById("audio-note"),
  syncStatus: document.getElementById("sync-status"),
  audioPlay: document.getElementById("audio-play"),
  audioStop: document.getElementById("audio-stop"),
  syncStart: document.getElementById("sync-start"),
  autoDelay: document.getElementById("auto-delay"),
  syncDelay: document.getElementById("sync-delay"),
  syncNudgeMinus: document.getElementById("sync-nudge-minus"),
  syncNudgePlus: document.getElementById("sync-nudge-plus"),
  syncReset: document.getElementById("sync-reset"),
  chartCaption: document.getElementById("chart-caption"),
  summaryAccuracy: document.getElementById("summary-accuracy"),
  summaryPitch: document.getElementById("summary-pitch"),
  summaryTempo: document.getElementById("summary-tempo"),
  resultPitchMatch: document.getElementById("result-pitch-match"),
  resultOnset: document.getElementById("result-onset"),
  resultDuration: document.getElementById("result-duration"),
  resultTempoDiff: document.getElementById("result-tempo-diff"),
  midiFile: document.getElementById("midi-file"),
  defaultMidi: document.getElementById("default-midi"),
  midiPartList: document.getElementById("midi-part-list"),
  midiExcludeStatus: document.getElementById("midi-exclude-status"),
  midiAutoExclude: document.getElementById("midi-auto-exclude"),
  midiUseScore: document.getElementById("midi-use-score"),
  midiTopStatus: document.getElementById("midi-top-status"),
  midiTopSelected: document.getElementById("midi-top-selected"),
  midiTopAutoExclude: document.getElementById("midi-top-auto-exclude"),
  midiTopUseScore: document.getElementById("midi-top-use-score"),
  midiPlay: document.getElementById("midi-play"),
  midiStop: document.getElementById("midi-stop"),
  midiSeek: document.getElementById("midi-seek"),
  midiTimeLabel: document.getElementById("midi-time-label"),
  midiVolume: document.getElementById("midi-volume"),
  midiVolumeLabel: document.getElementById("midi-volume-label"),
  midiDebugLog: document.getElementById("midi-debug-log"),
  scoreFollowChart: document.getElementById("score-follow-chart"),
  scoreFollowStatus: document.getElementById("score-follow-status"),
  noteTable: document.getElementById("note-table"),
  loadDemo: document.getElementById("load-demo"),
};

const APP_VERSION = "2026.08.07.1";
const APP_JS_LOADED_AT = new Date();
const MIC_ANALYSIS_FFT_SIZE = 4096;
let pitchViewOffsetSemitones = 0;

const defaultMidiSongs = {
  jiyu_ni_naritai_chorus: {
    title: "M2 自由になりたい（別紙コーラス）",
    fileName: "M2自由になりたい-別紙コーラス.mid",
    url: "./assets/midi/jiyu-ni-naritai-chorus.mid",
  },
  yarukoto_takusan: {
    title: "M3 やることたくさん",
    fileName: "M3やることたくさん.mid",
    url: "./assets/midi/yarukoto-takusan.mid",
  },
  shiawase_wo_tsukamu_tame: {
    title: "M4 幸せをつかむため",
    fileName: "M4幸せをつかむため.mid",
    url: "./assets/midi/shiawase-wo-tsukamu-tame.mid",
  },
  jiyu_wa_ikaga: {
    title: "M5 自由はいかが",
    fileName: "M5自由はいかが.mid",
    url: "./assets/midi/jiyu-wa-ikaga.mid",
  },
  yamerarenai: {
    title: "M8 やめられない",
    fileName: "M8やめられない.mid",
    url: "./assets/midi/yamerarenai.mid",
  },
  maho_no_ringo: {
    title: "M9 魔法のりんご",
    fileName: "M9魔法のりんご.mid",
    url: "./assets/midi/maho-no-ringo.mid",
  },
  kaeritai: {
    title: "M14 帰りたい",
    fileName: "M14帰りたい.mid",
    url: "./assets/midi/kaeritai.mid",
  },
  glass_no_kutsu: {
    title: "ガラスの靴",
    fileName: "ガラスの靴.mid",
    url: "./assets/midi/glass-no-kutsu.mid",
  },
};

const demoMusicXml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1"><part-name>Vocal</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <direction placement="above"><sound tempo="120"/></direction>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>
    </measure>
  </part>
</score-partwise>`;

const demoPractice = [
  { measure: 1, beat: 1, pitch: 60, start: 0.03, end: 0.52 },
  { measure: 1, beat: 2, pitch: 62, start: 0.55, end: 1.02 },
  { measure: 1, beat: 3, pitch: 65, start: 1.05, end: 1.46 },
  { measure: 1, beat: 4, pitch: 67, start: 1.53, end: 1.98 },
];

const MIDI_LIB_VERSION = "4.3.4";
const MIDI_CORE_VERSION = "4.3.14";
const MIDI_LIB_URL = `https://esm.unpkg.com/spessasynth_lib@${MIDI_LIB_VERSION}`;
const MIDI_WORKLET_URL = `https://unpkg.com/spessasynth_lib@${MIDI_LIB_VERSION}/dist/spessasynth_processor.min.js`;
const MIDI_CORE_URL = `https://esm.unpkg.com/spessasynth_core@${MIDI_CORE_VERSION}`;
const MIDI_SOUNDBANK_URL = "https://cdn.jsdelivr.net/gh/spessasus/SpessaSynth@master/soundfonts/GeneralUserGS.sf3";

let midiRuntimePromise = null;

function setText(el, value) {
  if (el) el.textContent = value;
}

function formatVersionDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return "--";
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function updateAppVersionInfo() {
  const htmlUpdated = document.lastModified ? formatVersionDate(document.lastModified) : "--";
  const jsLoaded = formatVersionDate(APP_JS_LOADED_AT);
  const text = `SingLab ${APP_VERSION} / HTML ${htmlUpdated} / JS loaded ${jsLoaded}`;
  setText(els.appVersion, text);
  if (els.appVersion) els.appVersion.title = text;
  document.documentElement.dataset.appVersion = APP_VERSION;
}

let midiDebugLines = [];

function logMidi(message) {
  const line = `[${new Date().toLocaleTimeString("ja-JP", { hour12: false })}] ${message}`;
  midiDebugLines.push(line);
  if (midiDebugLines.length > 12) midiDebugLines.shift();
  if (els.midiDebugLog) els.midiDebugLog.textContent = midiDebugLines.join("\n");
  console.log(line);
}

function resetMidiDebugLog() {
  midiDebugLines = [];
  if (els.midiDebugLog) els.midiDebugLog.textContent = "MIDI の読み込み待ち";
}

function noteNameFromMidi(midi) {
  if (!Number.isFinite(midi)) return "--";
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return `${names[((Math.round(midi) % 12) + 12) % 12]}${Math.floor(Math.round(midi) / 12) - 1}`;
}

function programFamilyFromMidi(program) {
  if (!Number.isFinite(program)) return "unknown";
  if (program <= 7) return "piano";
  if (program <= 15) return "chromatic";
  if (program <= 23) return "organ";
  if (program <= 31) return "guitar";
  if (program <= 39) return "bass";
  if (program <= 47) return "strings";
  if (program <= 55) return "ensemble";
  if (program <= 63) return "brass";
  if (program <= 71) return "reed";
  if (program <= 79) return "pipe";
  if (program <= 87) return "lead";
  if (program <= 95) return "pad";
  if (program <= 103) return "sfx";
  if (program <= 111) return "ethnic";
  if (program <= 119) return "percussive";
  return "fx";
}

function programLabelFromMidi(program) {
  if (!Number.isFinite(program)) return "不明";
  const labels = {
    piano: "ピアノ系",
    chromatic: "打鍵系",
    organ: "オルガン系",
    guitar: "ギター系",
    bass: "ベース系",
    strings: "ストリングス系",
    ensemble: "アンサンブル系",
    brass: "ブラス系",
    reed: "リード系",
    pipe: "パイプ系",
    lead: "リードシンセ系",
    pad: "パッド系",
    sfx: "効果音系",
    ethnic: "民族系",
    percussive: "打楽器系",
    fx: "特殊音系",
  };
  return labels[programFamilyFromMidi(program)] || "不明";
}

function createTrackSummary(track) {
  const programCounts = new Map();
  for (const note of track.notes || []) {
    const key = Number.isFinite(note.program) ? note.program : 0;
    programCounts.set(key, (programCounts.get(key) || 0) + 1);
  }
  const topPrograms = [...programCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([program]) => programLabelFromMidi(program));
  return topPrograms.length ? topPrograms.join(" / ") : "不明";
}

function midiToY(midi, minMidi, maxMidi, height) {
  const range = Math.max(1, maxMidi - minMidi);
  return height - 28 - ((midi - minMidi) / range) * (height - 56);
}

function getVoiceRangePreset() {
  return { label: "標準", minMidi: 48, maxMidi: 72, center: 60 };
}

function getDisplayVoiceRangePreset() {
  const base = getVoiceRangePreset();
  return {
    ...base,
    minMidi: base.minMidi + pitchViewOffsetSemitones,
    maxMidi: base.maxMidi + pitchViewOffsetSemitones,
    center: base.center + pitchViewOffsetSemitones,
  };
}

function setPitchViewOffsetSemitones(value) {
  pitchViewOffsetSemitones = clamp(Math.round(Number(value) || 0), -24, 24);
  micState.lastDisplayedMidi = null;
  refreshMidiCharts();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatTime(seconds) {
  const safe = Math.max(0, Number.isFinite(seconds) ? seconds : 0);
  const whole = Math.floor(safe);
  const minutes = Math.floor(whole / 60);
  const remainder = whole % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function voiceStrengthFromSample(item) {
  const confidence = clamp(((item?.confidence ?? 0) - 0.1) / 0.65, 0, 1);
  const volume = clamp(((item?.rms ?? 0) - 0.015) / 0.08, 0, 1);
  return confidence * volume;
}

function getVoiceThresholdPreset() {
  const presets = {
    low: { segment: 0.12, line: 0.14, dot: 0.09, rms: 0.014, confidence: 0.58 },
    normal: { segment: 0.22, line: 0.24, dot: 0.16, rms: 0.024, confidence: 0.66 },
    high: { segment: 0.34, line: 0.36, dot: 0.26, rms: 0.036, confidence: 0.72 },
    strict: { segment: 0.46, line: 0.48, dot: 0.36, rms: 0.048, confidence: 0.78 },
  };
  return presets[els.voiceThreshold?.value] || presets.normal;
}

function getGraphScale() {
  const scale = Number(els.graphScale?.value || 2);
  return Number.isFinite(scale) && scale > 0 ? scale : 2;
}

function getGuideDisplayOffsetSeconds() {
  const value = Number(els.guideOffset?.value || 0);
  return Number.isFinite(value) ? value / 1000 : 0;
}

function getCountInMode() {
  return els.countIn?.value || "auto";
}

function getCountInTempo() {
  const tempoEvent = midiState.parsed?.tempoEvents?.find((event) => Number.isFinite(event.tempo));
  return tempoEvent?.tempo ? clamp(60000000 / tempoEvent.tempo, 40, 240) : 120;
}

function getPrimaryTimeSignature() {
  const event = midiState.parsed?.timeSignatureEvents?.find((item) => (
    Number.isFinite(item.numerator) && Number.isFinite(item.denominator)
  ));
  return event || { numerator: 4, denominator: 4 };
}

function getMetronomeMode() {
  return els.metronomeMode?.value || "off";
}

function getResolvedMetronomeMode() {
  const mode = getMetronomeMode();
  if (mode === "off") return "off";
  if (mode === "four" || mode === "eight") return mode;
  const signature = getPrimaryTimeSignature();
  return signature.denominator === 8 ? "eight" : "four";
}

function getMetronomeGrid() {
  const signature = getPrimaryTimeSignature();
  const mode = getResolvedMetronomeMode();
  const quarterSeconds = 60 / getCountInTempo();
  if (mode === "off") {
    return { mode, numerator: signature.numerator, denominator: signature.denominator, stepSeconds: 0, stepsPerMeasure: 0 };
  }
  const useEighth = mode === "eight";
  const stepSeconds = useEighth ? quarterSeconds / 2 : quarterSeconds;
  const stepsPerMeasure = Math.max(1, Math.round(signature.numerator * (useEighth ? 8 : 4) / signature.denominator));
  return { mode, numerator: signature.numerator, denominator: signature.denominator, stepSeconds, stepsPerMeasure };
}

function getGuideOctaveShiftSemitones(track, minMidi, maxMidi) {
  const setting = els.guideOctave?.value || "auto";
  if (setting !== "auto") {
    const semitones = Number(setting);
    return Number.isFinite(semitones) ? semitones : 0;
  }
  const notes = (track?.notes || []).filter((note) => Number.isFinite(note.pitch));
  if (!notes.length) return 0;
  const center = (minMidi + maxMidi) / 2;
  let bestShift = 0;
  let bestScore = -Infinity;
  for (const shift of [-24, -12, 0, 12, 24]) {
    let inside = 0;
    let distance = 0;
    for (const note of notes) {
      const pitch = note.pitch + shift;
      if (pitch >= minMidi && pitch <= maxMidi) inside += 1;
      distance += Math.abs(pitch - center);
    }
    const score = inside * 1000 - distance / notes.length;
    if (score > bestScore) {
      bestScore = score;
      bestShift = shift;
    }
  }
  return bestShift;
}

function getGuideTransposeSemitones() {
  const semitones = Number(els.guideTranspose?.value || 0);
  return Number.isFinite(semitones) ? semitones : 0;
}

function setGuideTransposeSemitones(value) {
  if (!els.guideTranspose) return;
  const semitones = clamp(Math.round(Number(value) || 0), -24, 24);
  let option = Array.from(els.guideTranspose.options).find((item) => Number(item.value) === semitones);
  if (!option) {
    option = document.createElement("option");
    option.value = String(semitones);
    option.textContent = `${semitones >= 0 ? "+" : ""}${semitones}半音`;
    els.guideTranspose.appendChild(option);
  }
  els.guideTranspose.value = String(semitones);
  renderMidiTrackList();
  refreshMidiCharts();
}

function getGuidePitchShiftSemitones(track, minMidi, maxMidi) {
  return getGuideOctaveShiftSemitones(track, minMidi, maxMidi) + getGuideTransposeSemitones();
}

function getScoringPitchShiftSemitones(track) {
  const range = getVoiceRangePreset();
  return getGuidePitchShiftSemitones(track, range.minMidi, range.maxMidi);
}

function foldMidiToRange(midi, minMidi, maxMidi, anchor) {
  if (!Number.isFinite(midi)) return midi;
  if (!Number.isFinite(minMidi) || !Number.isFinite(maxMidi)) return midi;
  const span = Math.max(1, maxMidi - minMidi);
  let candidate = midi;
  while (candidate < minMidi) candidate += 12;
  while (candidate > maxMidi) candidate -= 12;
  if (!Number.isFinite(anchor)) return candidate;
  const options = [candidate, candidate - 12, candidate + 12].filter((value) => value >= minMidi && value <= maxMidi);
  let best = options[0] ?? candidate;
  let bestDistance = Math.abs(best - anchor);
  for (const option of options) {
    const distance = Math.abs(option - anchor);
    if (distance < bestDistance) {
      best = option;
      bestDistance = distance;
    }
  }
  return clamp(best, minMidi, maxMidi);
}

function getCenteredWindow(currentTime, duration, windowSeconds = 20) {
  const safeTime = Number.isFinite(currentTime) ? currentTime : 0;
  const half = windowSeconds / 2;
  let start = safeTime - half;
  let end = start + windowSeconds;
  return { start, end, center: safeTime };
}

function resetMicTrackingState({ clearHistory = false, resetClock = false } = {}) {
  micState.samples = [];
  micState.smoothedMidi = null;
  micState.lastRawMidi = null;
  micState.lastDisplayedMidi = null;
  micState.pitchWindow = [];
  micState.lastVoiceTime = 0;
  if (clearHistory) micState.history = [];
  if (resetClock) micState.captureClock = performance.now() / 1000;
}

function getExpectedMidiAtTime(track, time) {
  if (!track?.notes?.length || !Number.isFinite(time)) return null;
  const notes = track.notes;
  const active = notes.find((note) => time >= note.start && time <= note.end);
  if (active) return active.pitch;
  let previous = null;
  let next = null;
  for (const note of notes) {
    if (note.start <= time) previous = note;
    if (note.start > time) {
      next = note;
      break;
    }
  }
  if (previous && next) {
    const previousDistance = Math.abs(time - previous.end);
    const nextDistance = Math.abs(next.start - time);
    return previousDistance <= nextDistance ? previous.pitch : next.pitch;
  }
  return previous?.pitch ?? next?.pitch ?? notes[0].pitch ?? null;
}

function getDisplayedGuideMidiAtTime(track, time, minMidi, maxMidi) {
  const baseMidi = getExpectedMidiAtTime(track, time);
  if (!Number.isFinite(baseMidi)) return null;
  return baseMidi + getGuidePitchShiftSemitones(track, minMidi, maxMidi);
}

function pickOctaveEquivalent(midi, referenceMidi, minMidi, maxMidi, previousMidi = null) {
  if (!Number.isFinite(midi)) return midi;
  if (!Number.isFinite(minMidi) || !Number.isFinite(maxMidi)) return midi;
  const candidates = [];
  for (let offset = -4; offset <= 4; offset += 1) {
    const candidate = midi + offset * 12;
    if (candidate >= minMidi && candidate <= maxMidi) candidates.push(candidate);
  }
  if (!candidates.length) return clamp(midi, minMidi, maxMidi);
  const guide = Number.isFinite(referenceMidi) ? referenceMidi : Number.isFinite(previousMidi) ? previousMidi : candidates[0];
  const previous = Number.isFinite(previousMidi) ? previousMidi : guide;
  let best = candidates[0];
  let bestScore = Infinity;
  for (const candidate of candidates) {
    const guideScore = Math.abs(candidate - guide);
    const continuityScore = Math.abs(candidate - previous) * 0.7;
    const octaveJumpPenalty = Number.isFinite(previous) && Math.abs(candidate - previous) >= 8 ? 1.8 : 0;
    const score = guideScore + continuityScore + octaveJumpPenalty;
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return clamp(best, minMidi, maxMidi);
}

function stabilizeMidiDisplay(rawMidi, referenceMidi, minMidi, maxMidi, previousMidi = null, confidence = 0) {
  const candidate = pickOctaveEquivalent(rawMidi, referenceMidi, minMidi, maxMidi, previousMidi);
  if (!Number.isFinite(previousMidi)) return candidate;
  const jump = candidate - previousMidi;
  if (confidence < 0.42 && Math.abs(jump) >= 5.5) {
    return previousMidi;
  }
  if (confidence < 0.55 && Math.abs(jump) >= 8.5) {
    return previousMidi + Math.sign(jump) * 2.0;
  }
  return candidate;
}

function forceOctaveNearReference(rawMidi, referenceMidi) {
  if (!Number.isFinite(rawMidi) || !Number.isFinite(referenceMidi)) return rawMidi;
  let best = rawMidi;
  let bestDistance = Infinity;
  for (let offset = -5; offset <= 5; offset += 1) {
    const candidate = rawMidi + offset * 12;
    const distance = Math.abs(candidate - referenceMidi);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

function octaveAlignedMidi(rawMidi, referenceMidi, previousMidi, minMidi, maxMidi) {
  if (!Number.isFinite(rawMidi)) return rawMidi;
  if (Number.isFinite(referenceMidi)) {
    return forceOctaveNearReference(rawMidi, referenceMidi);
  }
  const anchor = Number.isFinite(referenceMidi)
    ? referenceMidi
    : (Number.isFinite(previousMidi) ? previousMidi : null);
  return pickOctaveEquivalent(rawMidi, anchor, minMidi, maxMidi, previousMidi);
}

function rejectImplausiblePitchJump(candidate, previousMidi, confidence, rms, referenceMidi = null) {
  if (!Number.isFinite(candidate) || !Number.isFinite(previousMidi)) return candidate;
  if (Number.isFinite(referenceMidi) && Math.abs(candidate - referenceMidi) <= 3.5) return candidate;
  const jump = candidate - previousMidi;
  const absJump = Math.abs(jump);
  if (absJump < 4.8) return candidate;

  const confidentVoice = confidence >= 0.82 && rms >= 0.045;
  if (confidentVoice && absJump < 8.5) return candidate;

  const octaveLike = Math.abs(absJump - 12) <= 2.2 || absJump >= 8.5;
  if (octaveLike) return previousMidi;

  return confidence >= 0.76 && rms >= 0.038
    ? previousMidi + Math.sign(jump) * Math.min(absJump, 2.8)
    : previousMidi;
}

function smoothPitchCandidate(candidate, confidence, rms) {
  if (!Number.isFinite(candidate)) return candidate;
  micState.pitchWindow.push(candidate);
  if (micState.pitchWindow.length > 3) micState.pitchWindow.shift();

  const center = median(micState.pitchWindow);
  const target = Number.isFinite(center)
    ? (candidate * (confidence >= 0.82 ? 0.86 : 0.74)) + (center * (confidence >= 0.82 ? 0.14 : 0.26))
    : candidate;

  if (!Number.isFinite(micState.smoothedMidi)) return target;
  const distance = Math.abs(target - micState.smoothedMidi);
  const alpha = distance > 1.5
    ? (confidence >= 0.82 && rms >= 0.045 ? 0.82 : 0.62)
    : (confidence >= 0.74 ? 0.58 : 0.44);
  return micState.smoothedMidi + (target - micState.smoothedMidi) * alpha;
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function readUint16(view, offset) {
  return view.getUint16(offset, false);
}

function readUint32(view, offset) {
  return view.getUint32(offset, false);
}

function readVarInt(bytes, state) {
  let value = 0;
  while (state.offset < bytes.length) {
    const byte = bytes[state.offset++];
    value = (value << 7) | (byte & 0x7f);
    if ((byte & 0x80) === 0) break;
  }
  return value;
}

function bytesToAscii(bytes, start, end) {
  return new TextDecoder("ascii").decode(bytes.slice(start, end)).replace(/\0/g, "").trim();
}

function decodeMidiText(bytes, start, end) {
  const slice = bytes.slice(start, end);
  for (const encoding of ["utf-8", "shift_jis", "windows-1252", "ascii"]) {
    try {
      const decoder = encoding === "utf-8" ? new TextDecoder(encoding, { fatal: true }) : new TextDecoder(encoding);
      const text = decoder.decode(slice).replace(/\0/g, "").trim();
      if (text) return text;
    } catch {
      continue;
    }
  }
  return "";
}

function findAsciiTag(bytes, start, tag) {
  const tagBytes = Array.from(tag, (char) => char.charCodeAt(0));
  for (let index = Math.max(0, start); index <= bytes.length - tagBytes.length; index += 1) {
    let matched = true;
    for (let offset = 0; offset < tagBytes.length; offset += 1) {
      if (bytes[index + offset] !== tagBytes[offset]) {
        matched = false;
        break;
      }
    }
    if (matched) return index;
  }
  return -1;
}

function parseMidiDivision(divisionRaw) {
  if ((divisionRaw & 0x8000) === 0) {
    return {
      type: "ppq",
      divisionRaw,
      ticksPerQuarter: divisionRaw > 0 ? divisionRaw : 480,
    };
  }
  const rawFps = (divisionRaw >> 8) & 0xff;
  const signedFps = rawFps >= 128 ? rawFps - 256 : rawFps;
  const ticksPerFrame = divisionRaw & 0xff;
  const fps = Math.abs(signedFps) || 30;
  return {
    type: "smpte",
    divisionRaw,
    fps: fps === 29 ? 29.97 : fps,
    ticksPerFrame: ticksPerFrame || 80,
  };
}

function tickToSecondsFactory(tempoEvents, divisionInfo) {
  if (divisionInfo?.type === "smpte") {
    const fps = divisionInfo.fps || 30;
    const ticksPerFrame = divisionInfo.ticksPerFrame || 80;
    return (tick) => tick / (fps * ticksPerFrame);
  }
  const division = divisionInfo?.ticksPerQuarter || divisionInfo || 480;
  const realTempoEvents = tempoEvents
    .filter((event) => Number.isFinite(event.tick) && Number.isFinite(event.tempo))
    .map((event, index) => ({ ...event, order: index }));
  const sorted = [{ tick: 0, tempo: 500000, order: -1 }, ...realTempoEvents];
  sorted.sort((a, b) => a.tick - b.tick || a.order - b.order);
  const timeline = [];
  let lastTick = 0;
  let lastSeconds = 0;
  let lastTempo = 500000;
  for (const current of sorted) {
    if (timeline.length && current.tick === lastTick) {
      timeline[timeline.length - 1] = { tick: current.tick, seconds: lastSeconds, tempo: current.tempo };
      lastTempo = current.tempo;
      continue;
    }
    if (timeline.length) {
      lastSeconds += ((current.tick - lastTick) * lastTempo) / (division * 1000000);
    }
    lastTick = current.tick;
    lastTempo = current.tempo;
    timeline.push({ tick: current.tick, seconds: lastSeconds, tempo: lastTempo });
  }
  return (tick) => {
    let point = timeline[0] || { tick: 0, seconds: 0, tempo: 500000 };
    for (const item of timeline) {
      if (item.tick <= tick) point = item;
      else break;
    }
    return point.seconds + ((tick - point.tick) * point.tempo) / (division * 1000000);
  };
}

function smpteOffsetToSeconds(bytes, start, end, divisionInfo) {
  if (end - start < 5) return 0;
  const hourByte = bytes[start];
  const frameRateCode = (hourByte >> 6) & 0x03;
  const hour = hourByte & 0x1f;
  const minute = bytes[start + 1] || 0;
  const second = bytes[start + 2] || 0;
  const frame = bytes[start + 3] || 0;
  const subFrame = bytes[start + 4] || 0;
  const fpsByCode = [24, 25, 29.97, 30];
  const fps = divisionInfo?.fps || fpsByCode[frameRateCode] || 30;
  return hour * 3600 + minute * 60 + second + frame / fps + subFrame / (fps * 100);
}

function normalizeParsedTracks(tracks) {
  return tracks.map((track) => {
    const notes = (track.notes || [])
      .filter((note) => Number.isFinite(note.pitch) && Number.isFinite(note.start) && Number.isFinite(note.end))
      .map((note) => ({
        ...note,
        duration: Math.max(0.02, (note.end ?? note.start) - note.start),
      }))
      .sort((a, b) => a.start - b.start || a.pitch - b.pitch);
    const pitches = notes.map((note) => note.pitch);
    const durations = notes.map((note) => note.duration);
    const dominantProgram = (() => {
      const counts = new Map();
      for (const note of notes) {
        const program = Number.isFinite(note.program) ? note.program : 0;
        counts.set(program, (counts.get(program) || 0) + 1);
      }
      return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
    })();
    const range = pitches.length ? Math.max(...pitches) - Math.min(...pitches) : 0;
    const monoRatio = notes.length
      ? notes.reduce((count, note) => count + (note.velocity < 80 ? 1 : 0), 0) / notes.length
      : 0;
    return {
      ...track,
      notes,
      duration: notes.length ? Math.max(...notes.map((note) => note.end)) : 0,
      range,
      monoRatio,
      dominantProgram,
      instrumentSummary: createTrackSummary({ notes }),
      score: notes.length + (/(vocal|voice|lead|melody|soprano|alto|tenor|bass)/i.test(track.name) ? 40 : 0) + (range <= 36 ? 10 : 0),
      averagePitch: pitches.length ? pitches.reduce((sum, value) => sum + value, 0) / pitches.length : null,
      averageDuration: durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length : null,
    };
  });
}

function totalNoteCount(tracks = []) {
  return tracks.reduce((sum, track) => sum + (track.notes?.length || 0), 0);
}

function maxTrackDuration(tracks = []) {
  return Math.max(0, ...tracks.map((track) => track.duration || 0));
}

function medianGuideStartDifference(candidateTracks = [], fallbackTracks = []) {
  const diffs = [];
  const count = Math.min(candidateTracks.length, fallbackTracks.length);
  for (let trackIndex = 0; trackIndex < count; trackIndex += 1) {
    const candidateNotes = candidateTracks[trackIndex]?.notes || [];
    const fallbackNotes = fallbackTracks[trackIndex]?.notes || [];
    const noteCount = Math.min(candidateNotes.length, fallbackNotes.length, 24);
    for (let noteIndex = 0; noteIndex < noteCount; noteIndex += 1) {
      const candidate = candidateNotes[noteIndex];
      const fallback = fallbackNotes[noteIndex];
      if (!Number.isFinite(candidate?.start) || !Number.isFinite(fallback?.start)) continue;
      if (Number.isFinite(candidate?.pitch) && Number.isFinite(fallback?.pitch) && Math.abs(candidate.pitch - fallback.pitch) > 12) continue;
      diffs.push(candidate.start - fallback.start);
    }
  }
  return median(diffs);
}

function isPlausibleGuideReplacement(candidateTracks, fallbackTracks) {
  const candidateNotes = totalNoteCount(candidateTracks);
  if (candidateNotes <= 0) return false;
  const fallbackNotes = totalNoteCount(fallbackTracks);
  if (fallbackNotes > 0 && candidateNotes < fallbackNotes * 0.5) return false;
  const candidateDuration = maxTrackDuration(candidateTracks);
  const fallbackDuration = maxTrackDuration(fallbackTracks);
  if (fallbackDuration > 0 && candidateDuration > 0) {
    const ratio = candidateDuration / fallbackDuration;
    if (ratio < 0.5 || ratio > 2) return false;
  }
  const startDiff = medianGuideStartDifference(candidateTracks, fallbackTracks);
  if (Number.isFinite(startDiff) && Math.abs(startDiff) > 0.75) {
    logMidi(`BasicMIDI描画は不採用: 自前時刻との差 ${startDiff.toFixed(3)}s`);
    return false;
  }
  return true;
}

function parseMidiFile(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  const state = { offset: 0 };
  if (bytesToAscii(bytes, 0, 4) !== "MThd") throw new Error("MIDIヘッダが見つかりません");
  state.offset = 4;
  const headerLength = readUint32(view, state.offset);
  state.offset += 4;
  const format = readUint16(view, state.offset);
  state.offset += 2;
  const trackCount = readUint16(view, state.offset);
  state.offset += 2;
  const divisionRaw = readUint16(view, state.offset);
  state.offset += 2;
  state.offset += Math.max(0, headerLength - 6);
  const divisionInfo = parseMidiDivision(divisionRaw);
  const division = divisionInfo.type === "ppq" ? divisionInfo.ticksPerQuarter : divisionInfo.ticksPerFrame;
  const tempoEvents = [];
  const timeSignatureEvents = [];
  const tracks = [];
  const divisionLabel = divisionInfo.type === "smpte"
    ? `SMPTE ${divisionInfo.fps}fps/${divisionInfo.ticksPerFrame}tpf`
    : `PPQ ${divisionInfo.ticksPerQuarter}`;
  logMidi(`ヘッダ検出: format=${format}, trackCount=${trackCount}, division=${divisionLabel}`);
  if (trackCount === 0) {
    logMidi("trackCount が 0 のため、MTrk を全体検索します");
  }

  let scanOffset = state.offset;
  let trackIndex = 0;
  while (scanOffset < bytes.length) {
    const trackStart = bytesToAscii(bytes, scanOffset, scanOffset + 4) === "MTrk" ? scanOffset : findAsciiTag(bytes, scanOffset, "MTrk");
    if (trackStart < 0) {
      logMidi(`MTrk が見つからず終了: parsed=${tracks.length}`);
      break;
    }
    if (trackStart !== scanOffset) {
      logMidi(`MTrk を ${trackStart - scanOffset} byte 進めて発見`);
    }
    state.offset = trackStart;
    state.offset += 4;
    const trackLength = readUint32(view, state.offset);
    state.offset += 4;
    const trackEnd = state.offset + trackLength;
    if (!Number.isFinite(trackLength) || trackLength <= 0) {
      logMidi(`Track length が不正: track=${trackIndex}, length=${trackLength}`);
      break;
    }
    let tick = 0;
    let runningStatus = 0;
    let name = `Track ${trackIndex + 1}`;
    const notes = [];
    const activeNotes = new Map();
    const channelPrograms = new Map(Array.from({ length: 16 }, (_, channel) => [channel, 0]));
    let eventCount = 0;
    let smpteOffsetSeconds = 0;

    while (state.offset < trackEnd) {
      tick += readVarInt(bytes, state);
      if (state.offset >= bytes.length) break;
      let status = bytes[state.offset++];
      if (status < 0x80) {
        state.offset -= 1;
        status = runningStatus;
      } else {
        runningStatus = status;
      }
      if (status === 0xff) {
        const metaType = bytes[state.offset++];
        const len = readVarInt(bytes, state);
        const dataStart = state.offset;
        const dataEnd = dataStart + len;
        if (dataEnd > bytes.length) {
          logMidi(`メタイベントの長さが不正: track=${trackIndex}, type=${metaType.toString(16)}, len=${len}`);
          state.offset = bytes.length;
          break;
        }
        if (metaType === 0x03) {
          name = decodeMidiText(bytes, dataStart, dataEnd) || name;
        } else if (metaType === 0x51 && len === 3) {
          const tempo = (bytes[dataStart] << 16) | (bytes[dataStart + 1] << 8) | bytes[dataStart + 2];
          tempoEvents.push({ tick, tempo });
        } else if (metaType === 0x58 && len >= 2) {
          const numerator = bytes[dataStart] || 4;
          const denominator = 2 ** (bytes[dataStart + 1] || 2);
          if (Number.isFinite(numerator) && Number.isFinite(denominator) && numerator > 0 && denominator > 0) {
            timeSignatureEvents.push({ tick, numerator, denominator });
          }
        } else if (metaType === 0x54) {
          smpteOffsetSeconds = smpteOffsetToSeconds(bytes, dataStart, dataEnd, divisionInfo);
        } else if (metaType === 0x2f) {
          state.offset = dataEnd;
          break;
        }
        state.offset = dataEnd;
        continue;
      }
      const messageType = status & 0xf0;
      const channel = status & 0x0f;
      if (status >= 0xf0) {
        if (status === 0xf0 || status === 0xf7) {
          const len = readVarInt(bytes, state);
          state.offset += len;
        } else if (status === 0xf1 || status === 0xf3) {
          state.offset += 1;
        } else if (status === 0xf2) {
          state.offset += 2;
        }
        continue;
      }
      const data1 = bytes[state.offset++];
      const usesTwoDataBytes = ![0xc0, 0xd0].includes(messageType);
      const data2 = usesTwoDataBytes ? bytes[state.offset++] : 0;
      if (messageType === 0xc0) {
        channelPrograms.set(channel, data1);
        eventCount += 1;
        continue;
      }
      if (messageType === 0x90 && data2 > 0) {
        const key = `${channel}:${data1}`;
        if (!activeNotes.has(key)) activeNotes.set(key, []);
        activeNotes.get(key).push({ startTick: tick, velocity: data2, program: channelPrograms.get(channel) ?? 0 });
      } else if (messageType === 0x80 || (messageType === 0x90 && data2 === 0)) {
        const key = `${channel}:${data1}`;
        const stack = activeNotes.get(key);
        if (stack && stack.length) {
          const note = stack.pop();
          notes.push({
            pitch: data1,
            velocity: note.velocity,
            startTick: note.startTick,
            endTick: Math.max(tick, note.startTick + 1),
            channel,
            program: note.program ?? channelPrograms.get(channel) ?? 0,
          });
        }
      }
      eventCount += 1;
    }

    logMidi(`Track ${trackIndex + 1}: ${name}, notes=${notes.length}, events=${eventCount}, length=${trackLength}${smpteOffsetSeconds ? `, smpteOffset=${smpteOffsetSeconds.toFixed(3)}s` : ""}`);
    tracks.push({ id: `${trackIndex}`, index: trackIndex, name, notes, smpteOffsetSeconds });
    state.offset = Math.min(trackEnd, bytes.length);
    scanOffset = state.offset;
    trackIndex += 1;
  }

  const tickToSeconds = tickToSecondsFactory(tempoEvents, divisionInfo);
  const normalizedTracks = normalizeParsedTracks(tracks.map((track) => ({
    ...track,
    notes: track.notes.map((note) => ({
      ...note,
      start: tickToSeconds(note.startTick),
      end: tickToSeconds(note.endTick),
    })),
  })));

  if (timeSignatureEvents.length) {
    const first = timeSignatureEvents[0];
    logMidi(`拍子検出: ${first.numerator}/${first.denominator}`);
  }

  return { format, division, divisionRaw, divisionInfo, tempoEvents, timeSignatureEvents, tracks: normalizedTracks, tickToSeconds };
}

function compressMicHistory(history, track = getSelectedMidiTrack()) {
  const thresholds = getVoiceThresholdPreset();
  const points = history
    .filter((item) => Number.isFinite(item.rawMidi ?? item.midi) && Number.isFinite(item.time))
    .map((item) => ({ ...item, time: Number(item.time), midi: Number(item.rawMidi ?? item.midi) }))
    .filter((item) => voiceStrengthFromSample(item) >= thresholds.segment)
    .sort((a, b) => a.time - b.time);
  const segments = [];
  let current = null;
  let previousNormalized = null;
  const pitchShift = track ? getScoringPitchShiftSemitones(track) : 0;
  for (const point of points) {
    const baseGuideMidi = track ? getExpectedMidiAtTime(track, point.time) : null;
    const guideMidi = Number.isFinite(baseGuideMidi) ? baseGuideMidi + pitchShift : null;
    const normalizedMidi = pickOctaveEquivalent(point.midi, guideMidi, 24, 96, previousNormalized);
    if (!current) {
      current = {
        start: point.time,
        end: point.time,
        midiSum: normalizedMidi,
        confidenceSum: point.confidence ?? 0,
        count: 1,
        lastMidi: normalizedMidi,
      };
      previousNormalized = normalizedMidi;
      continue;
    }
    const samePitch = Math.abs(normalizedMidi - current.lastMidi) <= 0.8;
    const closeEnough = point.time - current.end <= 0.35;
    if (samePitch && closeEnough) {
      current.end = point.time;
      current.midiSum += normalizedMidi;
      current.confidenceSum += point.confidence ?? 0;
      current.count += 1;
      current.lastMidi = normalizedMidi;
    } else {
      if (current.end - current.start >= 0.12) {
        segments.push({
          start: current.start,
          end: current.end,
          duration: Math.max(0.02, current.end - current.start),
          midi: current.midiSum / current.count,
          confidence: current.confidenceSum / current.count,
        });
      }
      current = {
        start: point.time,
        end: point.time,
        midiSum: normalizedMidi,
        confidenceSum: point.confidence ?? 0,
        count: 1,
        lastMidi: normalizedMidi,
      };
    }
    previousNormalized = normalizedMidi;
  }
  if (current && current.end - current.start >= 0.12) {
    segments.push({
      start: current.start,
      end: current.end,
      duration: Math.max(0.02, current.end - current.start),
      midi: current.midiSum / current.count,
      confidence: current.confidenceSum / current.count,
    });
  }
  return segments;
}

function scoreMidiTrack(track) {
  const nameBonus = /(vocal|voice|lead|melody|soprano|alto|tenor|bass)/i.test(track.name) ? 40 : 0;
  const densityBonus = track.notes.length > 0 ? Math.max(0, 15 - Math.abs(track.range - 24)) : 0;
  const monoBonus = track.notes.length ? Math.max(0, 10 - Math.abs(track.monoRatio - 0.2) * 20) : 0;
  return track.notes.length + nameBonus + densityBonus + monoBonus;
}

function getSelectedMidiTrack() {
  if (!midiState.tracks?.length) return null;
  const selectedIds = midiState.selectedTrackIds?.length ? midiState.selectedTrackIds : [midiState.selectedTrackId];
  return midiState.tracks.find((track) => track.id === selectedIds[0]) || midiState.tracks[0] || null;
}

function getGuideDisplayTracks() {
  if (!midiState.tracks?.length) return [];
  if (midiState.guideDisplayMode === "all") return midiState.tracks;
  const selectedIds = new Set(midiState.selectedTrackIds?.length ? midiState.selectedTrackIds : [midiState.selectedTrackId]);
  const selectedTracks = midiState.tracks.filter((track) => selectedIds.has(track.id));
  return selectedTracks.length ? selectedTracks : [getSelectedMidiTrack()].filter(Boolean);
}

function selectMidiTracks(trackIds) {
  const ids = Array.isArray(trackIds) ? trackIds.filter(Boolean) : [trackIds].filter(Boolean);
  if (ids.includes("__all__")) {
    midiState.guideDisplayMode = "all";
    midiState.selectedTrackIds = midiState.tracks.map((track) => track.id);
  } else {
    midiState.guideDisplayMode = "selected";
    midiState.selectedTrackIds = ids.length ? ids : [midiState.tracks[0]?.id].filter(Boolean);
    midiState.selectedTrackId = midiState.selectedTrackIds[0] || null;
  }
  micState.lastDisplayedMidi = null;
  renderMidiTrackList();
  refreshMidiCharts();
}

function selectMidiTrack(trackId) {
  selectMidiTracks([trackId]);
}

function chooseBestMidiTrack() {
  if (!midiState.tracks?.length) return;
  const sorted = [...midiState.tracks].sort((a, b) => scoreMidiTrack(b) - scoreMidiTrack(a));
  midiState.selectedTrackId = sorted[0]?.id || midiState.tracks[0].id;
  midiState.selectedTrackIds = [midiState.selectedTrackId].filter(Boolean);
  midiState.guideDisplayMode = "selected";
  micState.lastDisplayedMidi = null;
  renderMidiTrackList();
  refreshMidiCharts();
}

function renderMidiTrackList() {
  if (!els.midiPartList) return;
  const tracks = midiState.tracks || [];
  els.midiPartList.innerHTML = "";
  if (!tracks.length) {
    els.midiPartList.disabled = true;
    els.midiPartList.innerHTML = '<option value="">MIDI を読み込んでください</option>';
    setText(els.midiExcludeStatus, "MIDI 未読込");
    setText(els.midiTopStatus, "未読込");
    setText(els.midiTopSelected, "トラック未選択");
    return;
  }
  els.midiPartList.disabled = false;
  const allOption = document.createElement("option");
  allOption.value = "__all__";
  allOption.textContent = `全パート表示 · ${tracks.length}トラック`;
  els.midiPartList.appendChild(allOption);
  const selectedIds = new Set(midiState.selectedTrackIds?.length ? midiState.selectedTrackIds : [midiState.selectedTrackId].filter(Boolean));
  tracks.forEach((track) => {
    const avgPitchText = track.averagePitch != null ? noteNameFromMidi(track.averagePitch) : "--";
    const option = document.createElement("option");
    option.value = track.id;
    option.textContent = `${track.name} · ${track.instrumentSummary || "不明"} · ${track.notes.length}音 · ${track.duration.toFixed(1)}秒 · ${avgPitchText} · ${scoreMidiTrack(track).toFixed(1)}`;
    option.selected = midiState.guideDisplayMode !== "all" && selectedIds.has(track.id);
    els.midiPartList.appendChild(option);
  });
  allOption.selected = midiState.guideDisplayMode === "all";
  const selectedTrack = getSelectedMidiTrack();
  const allMode = midiState.guideDisplayMode === "all";
  const displayTracks = getGuideDisplayTracks();
  const displayCount = allMode ? tracks.length : displayTracks.length;
  const displayNames = allMode ? "全パート" : displayTracks.map((track) => track.name).join(" + ");
  const scoringShift = selectedTrack ? getScoringPitchShiftSemitones(selectedTrack) : 0;
  const shiftText = scoringShift ? ` / 補正 ${scoringShift > 0 ? "+" : ""}${scoringShift}半音` : "";
  setText(els.midiExcludeStatus, allMode ? `全パート表示中 / 採点基準: ${selectedTrack?.name || "--"}` : (selectedTrack ? `選択中: ${displayNames}` : `MIDI 読込済み (${tracks.length}トラック)`));
  setText(els.midiTopStatus, allMode ? `全パート (${tracks.length})` : (selectedTrack ? `${displayCount}パート` : `読込済み (${tracks.length})`));
  setText(els.midiTopSelected, selectedTrack ? `採点: ${selectedTrack.name}${shiftText}` : "トラック未選択");
}

function buildMidiComparison(track, micSegments) {
  const notes = track?.notes || [];
  const pitchShift = getScoringPitchShiftSemitones(track);
  const rows = [];
  let pitchDiffSum = 0;
  let onsetDiffSum = 0;
  let durationRatioSum = 0;
  let matched = 0;
  const usedSegments = new Set();
  for (let index = 0; index < notes.length; index += 1) {
    const note = notes[index];
    const expectedPitch = note.pitch + pitchShift;
    let observed = null;
    let observedScore = -Infinity;
    let observedIndex = -1;
    micSegments.forEach((segment, segmentIndex) => {
      if (usedSegments.has(segmentIndex)) return;
      const overlap = Math.max(0, Math.min(note.end, segment.end) - Math.max(note.start, segment.start));
      const onsetDistance = Math.abs((segment.start ?? 0) - note.start);
      const offsetDistance = Math.abs((segment.end ?? 0) - note.end);
      const pitchDistance = Number.isFinite(segment.midi) ? Math.abs(segment.midi - expectedPitch) : 12;
      const confidenceBonus = (segment.confidence ?? 0) * 1.8;
      const score = overlap * 4.5 - onsetDistance * 1.6 - offsetDistance * 0.7 - pitchDistance * 0.9 + confidenceBonus;
      if (score > observedScore) {
        observedScore = score;
        observed = segment;
        observedIndex = segmentIndex;
      }
    });
    if (observedScore < -1.5 && micSegments[index]) {
      observed = micSegments[index];
      observedIndex = index;
    }
    if (observedIndex >= 0) usedSegments.add(observedIndex);
    const normalizedObservedMidi = observed ? pickOctaveEquivalent(observed.midi, expectedPitch, 24, 96) : null;
    const pitchDiff = normalizedObservedMidi != null ? normalizedObservedMidi - expectedPitch : null;
    const onsetDiff = observed ? observed.start - note.start : null;
    const durationRatio = observed ? observed.duration / note.duration : null;
    if (observed) {
      pitchDiffSum += Math.abs(pitchDiff || 0);
      onsetDiffSum += Math.abs(onsetDiff || 0);
      durationRatioSum += durationRatio || 0;
      matched += 1;
    }
    rows.push({
      expected: expectedPitch,
      originalExpected: note.pitch,
      observed: normalizedObservedMidi != null ? Math.round(normalizedObservedMidi) : null,
      observedRaw: observed ? Math.round(observed.midi) : null,
      pitchDiff,
      onsetDiff,
      durationRatio,
      start: note.start,
      end: note.end,
    });
  }
  return {
    rows,
    summary: {
      matched,
      total: notes.length,
      pitchError: matched ? pitchDiffSum / matched : null,
      onsetError: matched ? onsetDiffSum / matched : null,
      durationRatio: matched ? durationRatioSum / matched : null,
    },
  };
}

function drawMidiComparisonChart(track, micSegments) {
  const canvas = els.scoreFollowChart;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 900;
  const cssHeight = 220;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.fillStyle = "#091120";
  ctx.fillRect(0, 0, cssWidth, cssHeight);
  if (!track?.notes?.length) return;
  const pitchShift = getScoringPitchShiftSemitones(track);
  const shiftedNotes = track.notes.map((note) => ({ ...note, pitch: note.pitch + pitchShift, originalPitch: note.pitch }));
  const normalizedSegments = (micSegments || []).map((segment, index) => {
    const expectedNote = shiftedNotes[Math.min(index, shiftedNotes.length - 1)] || null;
    return {
      ...segment,
      midi: expectedNote ? pickOctaveEquivalent(segment.midi, expectedNote.pitch, 24, 96) : segment.midi,
    };
  });
  const allPitches = [...shiftedNotes.map((note) => note.pitch), ...normalizedSegments.map((seg) => seg.midi)].filter(Number.isFinite);
  const minMidi = Math.max(24, Math.floor((Math.min(...allPitches) || 60) - 6));
  const maxMidi = Math.min(96, Math.ceil((Math.max(...allPitches) || 72) + 6));
  const yFor = (midi) => midiToY(midi, minMidi, maxMidi, cssHeight);
  const maxTime = Math.max(0.1, ...track.notes.map((note) => note.end || 0), ...(micSegments || []).map((seg) => seg.end || 0));
  const introPaddingSeconds = Math.min(4, Math.max(1.5, maxTime * 0.04));
  const outroPaddingSeconds = Math.min(2, Math.max(0.8, maxTime * 0.02));
  const paddedMaxTime = Math.max(0.1, maxTime + introPaddingSeconds + outroPaddingSeconds);
  const xFor = (time) => 48 + ((cssWidth - 72) * (time + introPaddingSeconds)) / paddedMaxTime;

  ctx.strokeStyle = "rgba(153,171,200,.12)";
  ctx.setLineDash([5, 6]);
  for (let midi = minMidi; midi <= maxMidi; midi += 1) {
    const y = yFor(midi);
    ctx.beginPath();
    ctx.moveTo(48, y);
    ctx.lineTo(cssWidth - 24, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(238,244,255,.9)";
  ctx.font = "10px sans-serif";
  ctx.fillText(track.name, 8, 14);

  const drawBars = (series, color, pitchKey, alpha = 1) => {
    if (!series?.length) return;
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    series.forEach((item) => {
      const x1 = xFor(item.start ?? item.time ?? 0);
      const x2 = xFor(item.end ?? item.time ?? 0);
      const y = yFor(item[pitchKey]);
      const top = y - 5;
      const height = 10;
      ctx.beginPath();
      ctx.roundRect(Math.min(x1, x2), top, Math.max(4, Math.abs(x2 - x1)), height, 6);
      ctx.fill();
    });
    ctx.restore();
  };

  drawBars(shiftedNotes, "rgba(126,224,184,.72)", "pitch", 0.9);
  drawBars(normalizedSegments, "rgba(122,183,255,.9)", "midi", 0.8);
}

function renderMidiComparison() {
  const track = getSelectedMidiTrack();
  if (!track) {
    setText(els.scoreFollowStatus, "未開始");
    if (els.midiSeek) els.midiSeek.value = "0";
    if (els.noteTable) els.noteTable.innerHTML = "";
    drawMidiComparisonChart(null, []);
    return;
  }
  const micSegments = compressMicHistory(micState.history, track);
  const comparison = buildMidiComparison(track, micSegments);
  const summary = comparison.summary;
  setText(els.scoreFollowStatus, `${track.name} / ${comparison.rows.length} notes`);
  setText(els.resultPitchMatch, summary.matched ? `${Math.max(0, 100 - summary.pitchError * 18).toFixed(1)}%` : "--");
  setText(els.resultOnset, summary.onsetError != null ? `${summary.onsetError.toFixed(3)}s` : "--");
  setText(els.resultDuration, summary.durationRatio != null ? `${summary.durationRatio.toFixed(2)}x` : "--");
  setText(els.resultTempoDiff, track.duration ? "ready" : "--");
  if (els.noteTable) {
    els.noteTable.innerHTML = comparison.rows
      .slice(0, 120)
      .map((row, index) => {
        const diffText = row.pitchDiff == null ? "--" : `${row.pitchDiff >= 0 ? "+" : ""}${row.pitchDiff.toFixed(2)}`;
        const onset = row.onsetDiff == null ? "--" : `${row.onsetDiff >= 0 ? "+" : ""}${row.onsetDiff.toFixed(3)}s`;
        const duration = row.durationRatio == null ? "--" : `${row.durationRatio.toFixed(2)}x`;
        return `
          <tr class="${index === 0 ? "active-row" : ""}">
            <td>-</td>
            <td>-</td>
            <td>${noteNameFromMidi(row.expected)}</td>
            <td>${row.observed != null ? noteNameFromMidi(row.observed) : "--"}</td>
            <td>${diffText}</td>
            <td>${onset}</td>
            <td>${duration}</td>
          </tr>
        `;
      })
      .join("");
  }
  drawMidiComparisonChart(track, micSegments);
}

function stopMidiPlayback({ resetPosition = false, resetDuration = false, keepVisualTail = false } = {}) {
  const playback = midiState.playback;
  if (!keepVisualTail) {
    clearMidiPlaybackTimer();
  }
  try {
    playback.sequencer?.pause();
    if (playback.sequencer && resetPosition) playback.sequencer.currentTime = 0;
  } catch {}
  try {
    playback.synth?.stopAll(true);
  } catch {}
  playback.playing = false;
  playback.sessionId += 1;
  playback.startTime = 0;
  playback.seekStartSeconds = playback.positionSeconds || 0;
  resetPlaybackMetronome(playback);
  if (!keepVisualTail) {
    playback.visualTailStartPerf = null;
    playback.visualTailStartPosition = null;
    playback.visualTailSeconds = 0;
  }
  if (resetPosition) playback.positionSeconds = 0;
  if (resetDuration) playback.duration = 0;
  playback.notes = [];
  if (els.midiPlay) els.midiPlay.textContent = "再生";
  updateMidiPlaybackUi(playback.positionSeconds || 0);
}

function updateMidiSeek(value) {
  if (!els.midiSeek) return;
  const clamped = clamp(value, 0, 100);
  els.midiSeek.value = String(clamped);
  if (els.midiTimeLabel) {
    const currentSeconds = (midiState.playback.duration || 0) * (clamped / 100);
    els.midiTimeLabel.textContent = `${formatTime(currentSeconds)} / ${formatTime(midiState.playback.duration || 0)}`;
  }
}

function updateMidiVolumeUi(value = els.midiVolume?.value ?? 70) {
  const numeric = clamp(Number(value) || 0, 0, 100);
  if (els.midiVolumeLabel) els.midiVolumeLabel.textContent = `音量 ${numeric.toFixed(0)}%`;
  return numeric / 100;
}

function getPlaybackSpeed() {
  return clamp(Number(els.playbackSpeed?.value || 100) / 100, 0.5, 1.5);
}

function updatePlaybackSpeedUi(value = els.playbackSpeed?.value ?? 100) {
  const percent = clamp(Number(value) || 100, 50, 150);
  if (els.playbackSpeed) els.playbackSpeed.value = String(percent);
  if (els.playbackSpeedNumber) els.playbackSpeedNumber.value = String(percent);
  if (els.playbackSpeedLabel) els.playbackSpeedLabel.textContent = `速度 ${percent.toFixed(0)}%`;
  return percent / 100;
}

function setupGuideOffsetOptions() {
  if (!els.guideOffset) return;
  const current = Number(els.guideOffset.value || 0);
  els.guideOffset.innerHTML = "";
  for (let ms = -1000; ms <= 1000; ms += 50) {
    const option = document.createElement("option");
    option.value = String(ms);
    if (ms < 0) {
      option.textContent = `早める ${Math.abs(ms)}ms`;
    } else if (ms > 0) {
      option.textContent = `遅らせる ${ms}ms`;
    } else {
      option.textContent = "0ms";
    }
    if (ms === current || (!Number.isFinite(current) && ms === 0)) option.selected = true;
    els.guideOffset.appendChild(option);
  }
  if (![...els.guideOffset.options].some((option) => option.selected)) {
    els.guideOffset.value = "0";
  }
}

function handlePlaybackSpeedChange(value) {
  const playback = midiState.playback;
  const currentPosition = getMidiPlaybackPositionSeconds();
  updatePlaybackSpeedUi(value);
  const speed = applyMidiPlaybackSpeed(playback);
  if (playback.playing && playback.audioContext) {
    playback.positionSeconds = currentPosition;
    playback.seekStartSeconds = currentPosition;
    playback.startTime = playback.audioContext.currentTime;
    resetPlaybackMetronome(playback);
    if (playback.sequencer) {
      try {
        playback.sequencer.currentTime = currentPosition;
        playback.sequencer.play();
      } catch {}
    }
  }
  logMidi(`再生速度: ${Math.round(speed * 100)}%`);
  updateMidiPlaybackUi(currentPosition);
  refreshMidiCharts();
}

function applyMidiPlaybackSpeed(playback = midiState.playback) {
  const speed = updatePlaybackSpeedUi();
  playback.playbackSpeed = speed;
  const sequencer = playback.sequencer;
  if (!sequencer) return speed;

  const candidates = ["playbackRate", "playbackSpeed", "speed", "tempoMultiplier"];
  let applied = false;
  candidates.forEach((property) => {
    if (property in sequencer) {
      try {
        sequencer[property] = speed;
        applied = true;
      } catch {}
    }
  });
  if (typeof sequencer.setPlaybackRate === "function") {
    try {
      sequencer.setPlaybackRate(speed);
      applied = true;
    } catch {}
  }
  if (typeof sequencer.setTempoMultiplier === "function") {
    try {
      sequencer.setTempoMultiplier(speed);
      applied = true;
    } catch {}
  }
  if (!applied && speed !== 1) {
    logMidi("再生速度: シンセ側の速度変更APIが見つからないため、表示時計のみ速度反映");
  }
  return speed;
}

function refreshMidiCharts() {
  const history = reviewState.active && latestTake?.history ? latestTake.history : micState.history;
  drawMicChart(history, getSelectedMidiTrack());
  renderMidiComparison();
}

function getAudioClockSeconds(playback) {
  const audioContext = playback.audioContext;
  if (!audioContext || !Number.isFinite(playback.startTime)) return null;
  let contextTime = audioContext.currentTime;
  if (typeof audioContext.getOutputTimestamp === "function") {
    try {
      const stamp = audioContext.getOutputTimestamp();
      const performanceTime = Number(stamp.performanceTime);
      const stampedContextTime = Number(stamp.contextTime);
      if (Number.isFinite(performanceTime) && Number.isFinite(stampedContextTime)) {
        contextTime = stampedContextTime + ((performance.now() - performanceTime) / 1000);
      }
    } catch {}
  }
  const elapsed = contextTime - playback.startTime;
  if (!Number.isFinite(elapsed)) return null;
  return (playback.seekStartSeconds || 0) + elapsed * (playback.playbackSpeed || 1);
}

function getMidiPlaybackPositionSeconds() {
  const playback = midiState.playback;
  const duration = Math.max(0.1, playback.duration || 0);
  if (playback.playing && playback.sequencer) {
    const audioClockTime = getAudioClockSeconds(playback);
    if (Number.isFinite(audioClockTime)) {
      playback.positionSeconds = clamp(audioClockTime, 0, duration);
      return playback.positionSeconds;
    }
    let highResolutionTime = Number(playback.sequencer.currentHighResolutionTime);
    if (Number.isFinite(highResolutionTime) && highResolutionTime > duration * 4 && highResolutionTime / 1000 <= duration * 1.25) {
      highResolutionTime /= 1000;
    }
    if (Number.isFinite(highResolutionTime)) {
      playback.positionSeconds = clamp(highResolutionTime, 0, duration);
      return playback.positionSeconds;
    }
    const sequencerTime = Number(playback.sequencer.currentTime);
    if (Number.isFinite(sequencerTime)) {
      playback.positionSeconds = clamp(sequencerTime, 0, duration);
      return playback.positionSeconds;
    }
    if (playback.audioContext && Number.isFinite(playback.startTime)) {
      const elapsed = playback.audioContext.currentTime - playback.startTime;
      playback.positionSeconds = clamp((playback.seekStartSeconds || 0) + elapsed, 0, duration);
      return playback.positionSeconds;
    }
  }
  return clamp(playback.positionSeconds || 0, 0, duration);
}

function getMidiDisplayClockSeconds() {
  const playback = midiState.playback;
  if (playback.playing) return getMidiPlaybackPositionSeconds();
  if (Number.isFinite(playback.visualTailStartPerf) && Number.isFinite(playback.visualTailStartPosition)) {
    const elapsed = (performance.now() / 1000) - playback.visualTailStartPerf;
    const tailSeconds = playback.visualTailSeconds || 0;
    if (elapsed >= 0 && elapsed <= tailSeconds) {
      return playback.visualTailStartPosition + elapsed;
    }
  }
  return clamp(playback.positionSeconds || 0, 0, Math.max(0.1, playback.duration || 0));
}

function getGuideClockSeconds() {
  if (reviewState.active && reviewState.audio && latestTake) {
    const started = Number(latestTake.startedSongSeconds) || 0;
    const speed = Number(latestTake.playbackSpeed) || 1;
    return started + (reviewState.audio.currentTime || 0) * speed;
  }
  if (midiState.playback.playing || Number.isFinite(midiState.playback.visualTailStartPerf) || midiState.playback.duration > 0) {
    return getMidiDisplayClockSeconds();
  }
  if (micState.captureClock) {
    return Math.max(0, performance.now() / 1000 - micState.captureClock);
  }
  if (audioPlayback.element) {
    return audioPlayback.element.currentTime || 0;
  }
  return 0;
}

function waitSeconds(seconds) {
  return new Promise((resolve) => window.setTimeout(resolve, Math.max(0, seconds) * 1000));
}

function scheduleHiHat(audioContext, destination, when, accent = false) {
  const duration = accent ? 0.055 : 0.04;
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, Math.ceil(sampleRate * duration), sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    const t = i / Math.max(1, data.length - 1);
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3.6);
  }
  const source = audioContext.createBufferSource();
  const highpass = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  highpass.type = "highpass";
  highpass.frequency.value = 6200;
  gain.gain.setValueAtTime(accent ? 0.34 : 0.24, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
  source.buffer = buffer;
  source.connect(highpass);
  highpass.connect(gain);
  gain.connect(destination);
  source.start(when);
  source.stop(when + duration + 0.02);
}

function resetPlaybackMetronome(playback = midiState.playback) {
  playback.metronomeNextStep = null;
  playback.metronomeLastMode = null;
}

function schedulePlaybackMetronome(playback = midiState.playback) {
  const grid = getMetronomeGrid();
  if (grid.mode === "off" || !grid.stepSeconds || !playback.playing || !playback.audioContext) {
    resetPlaybackMetronome(playback);
    return;
  }
  const audioContext = playback.audioContext;
  const destination = playback.masterGain || audioContext.destination;
  const currentSongTime = getMidiPlaybackPositionSeconds();
  const speed = Math.max(0.1, playback.playbackSpeed || getPlaybackSpeed());
  const lookAheadSongSeconds = 0.55 * speed;
  if (playback.metronomeLastMode !== grid.mode) {
    playback.metronomeNextStep = null;
    playback.metronomeLastMode = grid.mode;
  }
  if (!Number.isFinite(playback.metronomeNextStep)) {
    playback.metronomeNextStep = Math.max(0, Math.ceil((currentSongTime - 0.02) / grid.stepSeconds));
  }
  while ((playback.metronomeNextStep * grid.stepSeconds) <= currentSongTime + lookAheadSongSeconds) {
    const step = playback.metronomeNextStep;
    const songTime = step * grid.stepSeconds;
    if (songTime >= currentSongTime - 0.025) {
      const stepInMeasure = grid.stepsPerMeasure ? step % grid.stepsPerMeasure : 0;
      const accent = stepInMeasure === 0;
      const audioWhen = audioContext.currentTime + Math.max(0.01, (songTime - currentSongTime) / speed);
      scheduleHiHat(audioContext, destination, audioWhen, accent);
    }
    playback.metronomeNextStep += 1;
  }
}

function beginCountInCalibration(expectedTimes) {
  countInState.active = getCountInMode() === "auto";
  countInState.expectedTimes = expectedTimes;
  countInState.matched = [];
  countInState.lastPeakTime = 0;
  countInState.baselineRms = 0.01;
  micState.inputLatencySeconds = 0;
  if (countInState.active) {
    setText(els.micStatus, "カウント検知中");
  }
}

function finishCountInCalibration() {
  if (!countInState.active) return;
  countInState.active = false;
  if (countInState.matched.length < 2) {
    logMidi("カウント検知: 不十分なため自動補正なし");
    return;
  }
  const offsets = countInState.matched
    .map((item) => item.observed - item.expected)
    .filter((value) => Number.isFinite(value) && value >= -0.05 && value <= 0.8);
  const latency = median(offsets);
  if (!Number.isFinite(latency)) {
    logMidi("カウント検知: 補正値を計算できませんでした");
    return;
  }
  micState.inputLatencySeconds = clamp(latency, 0, 0.45);
  logMidi(`カウント検知: ${countInState.matched.length}/${countInState.expectedTimes.length} 拍, 歌声描画を ${micState.inputLatencySeconds.toFixed(3)}s 前へ補正`);
  setText(els.micStatus, `解析中 / 自動補正 ${Math.round(micState.inputLatencySeconds * 1000)}ms`);
}

function detectCountInPeak(nowAbsoluteSeconds, rms) {
  if (!countInState.active || !Number.isFinite(rms)) return;
  countInState.baselineRms = countInState.baselineRms * 0.94 + rms * 0.06;
  const loudEnough = rms > Math.max(0.035, countInState.baselineRms * 3.2);
  if (!loudEnough || nowAbsoluteSeconds - countInState.lastPeakTime < 0.16) return;
  const target = countInState.expectedTimes.find((time) => (
    !countInState.matched.some((item) => item.expected === time)
    && nowAbsoluteSeconds >= time - 0.08
    && nowAbsoluteSeconds <= time + 0.55
  ));
  if (!Number.isFinite(target)) return;
  countInState.matched.push({ expected: target, observed: nowAbsoluteSeconds, rms });
  countInState.lastPeakTime = nowAbsoluteSeconds;
}

async function playCountIn(playback) {
  const mode = getCountInMode();
  if (mode === "off") {
    micState.inputLatencySeconds = 0;
    return 0;
  }
  const audioContext = playback.audioContext;
  const destination = playback.masterGain || audioContext.destination;
  const tempo = getCountInTempo();
  const beatSeconds = 60 / tempo;
  const patternBeats = [0, 2, 4, 5, 6];
  const startDelay = 0.18;
  const startAt = audioContext.currentTime + startDelay;
  const perfStart = performance.now() / 1000 + startDelay;
  const expectedTimes = patternBeats.map((beat) => perfStart + beat * beatSeconds);
  beginCountInCalibration(expectedTimes);
  patternBeats.forEach((beat, index) => {
    scheduleHiHat(audioContext, destination, startAt + beat * beatSeconds, index === 0 || beat === 4);
  });
  const totalSeconds = 8 * beatSeconds + startDelay;
  logMidi(`カウントイン: 2小節 / ${tempo.toFixed(1)} BPM / pattern=1,3,5,6,7拍`);
  await waitSeconds(totalSeconds);
  finishCountInCalibration();
  return totalSeconds;
}

async function startPracticeSession() {
  stopReviewTake({ redrawLive: false });
  await startMic();
  const hasPlayableMidi = (midiState.tracks || []).some((track) => track?.notes?.length);
  if (!hasPlayableMidi) return;
  try {
    resetMicTrackingState({ clearHistory: true });
    startTakeRecording(midiState.playback.positionSeconds || 0);
    await playMidiTrack(midiState.playback.positionSeconds || 0);
    takeRecorderState.startedSongSeconds = midiState.playback.positionSeconds || takeRecorderState.startedSongSeconds;
    refreshMidiCharts();
  } catch (error) {
    await stopTakeRecording([]);
    stopMic().catch(() => {});
    throw error;
  }
}

async function stopPracticeSession() {
  const historySnapshot = micState.history.map((item) => ({ ...item }));
  await stopTakeRecording(historySnapshot);
  stopMidiPlayback();
  await stopMic();
}

function getMidiVoiceProfile(note) {
  const program = Number.isFinite(note?.program) ? note.program : 0;
  const family = programFamilyFromMidi(program);
  const velocity = clamp((note?.velocity ?? 80) / 127, 0.18, 1);
  const profiles = {
    piano: { waves: ["triangle", "sine"], attack: 0.004, sustain: 0.08, release: 0.12, gain: 0.95, filter: 2800, detune: 0, q: 0.7 },
    chromatic: { waves: ["triangle", "square"], attack: 0.01, sustain: 0.12, release: 0.14, gain: 0.85, filter: 2600, detune: 0, q: 0.6 },
    organ: { waves: ["square", "sine"], attack: 0.01, sustain: 0.85, release: 0.08, gain: 0.78, filter: 3200, detune: 0, q: 0.4 },
    guitar: { waves: ["triangle", "sawtooth"], attack: 0.006, sustain: 0.14, release: 0.1, gain: 0.8, filter: 2200, detune: -4, q: 0.8 },
    bass: { waves: ["square", "sine"], attack: 0.006, sustain: 0.22, release: 0.12, gain: 0.96, filter: 1200, detune: 0, q: 1.0 },
    strings: { waves: ["sawtooth", "triangle"], attack: 0.04, sustain: 0.75, release: 0.22, gain: 0.7, filter: 1800, detune: 6, q: 0.5 },
    ensemble: { waves: ["sawtooth", "triangle"], attack: 0.05, sustain: 0.7, release: 0.22, gain: 0.68, filter: 2000, detune: 8, q: 0.5 },
    brass: { waves: ["sawtooth", "square"], attack: 0.015, sustain: 0.58, release: 0.14, gain: 0.86, filter: 2400, detune: 4, q: 0.9 },
    reed: { waves: ["triangle", "sine"], attack: 0.01, sustain: 0.55, release: 0.12, gain: 0.78, filter: 2300, detune: 0, q: 0.7 },
    pipe: { waves: ["sine", "triangle"], attack: 0.006, sustain: 0.6, release: 0.12, gain: 0.72, filter: 2600, detune: 0, q: 0.4 },
    lead: { waves: ["sawtooth", "square"], attack: 0.008, sustain: 0.5, release: 0.1, gain: 0.92, filter: 3200, detune: 8, q: 1.1 },
    pad: { waves: ["sawtooth", "triangle"], attack: 0.06, sustain: 0.9, release: 0.32, gain: 0.56, filter: 1600, detune: 10, q: 0.45 },
    sfx: { waves: ["square", "sawtooth"], attack: 0.004, sustain: 0.18, release: 0.18, gain: 0.58, filter: 1800, detune: 0, q: 1.0 },
    ethnic: { waves: ["triangle", "sine"], attack: 0.012, sustain: 0.42, release: 0.14, gain: 0.78, filter: 2100, detune: 0, q: 0.6 },
    percussive: { waves: ["square", "triangle"], attack: 0.003, sustain: 0.12, release: 0.08, gain: 0.72, filter: 2600, detune: 0, q: 1.0 },
    fx: { waves: ["sawtooth", "square"], attack: 0.02, sustain: 0.3, release: 0.2, gain: 0.6, filter: 1800, detune: 0, q: 0.8 },
    unknown: { waves: ["triangle", "sine"], attack: 0.006, sustain: 0.16, release: 0.1, gain: 0.82, filter: 2400, detune: 0, q: 0.7 },
  };
  const profile = profiles[family] || profiles.unknown;
  return { ...profile, family, velocity };
}

function playMidiVoice(audioContext, destination, note, startTime, endTime, trackCount, trackIndex, volume) {
  const profile = getMidiVoiceProfile(note);
  const noteGain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  const trackBus = audioContext.createGain();
  const panner = typeof audioContext.createStereoPanner === "function" ? audioContext.createStereoPanner() : null;
  const baseGain = Math.max(0.001, volume * profile.gain * profile.velocity * 0.8 / Math.sqrt(trackCount));
  const safeStart = Math.max(0, startTime);
  const safeEnd = Math.max(safeStart + 0.08, endTime);
  const total = Math.max(0.08, safeEnd - safeStart);
  const attack = Math.min(Math.max(0.003, profile.attack), total * 0.35);
  const release = Math.min(Math.max(0.03, profile.release), total * 0.35);
  const sustainEnd = Math.max(safeStart + attack, safeEnd - release);

  filter.type = "lowpass";
  filter.frequency.value = profile.filter;
  filter.Q.value = profile.q;
  noteGain.gain.cancelScheduledValues(Math.max(0, safeStart - 0.02));
  noteGain.gain.setValueAtTime(0.0001, safeStart);
  noteGain.gain.linearRampToValueAtTime(baseGain, safeStart + attack);
  noteGain.gain.setValueAtTime(baseGain, sustainEnd);
  noteGain.gain.linearRampToValueAtTime(0.0001, safeEnd);

  trackBus.gain.value = 1;
  if (panner) {
    panner.pan.value = trackCount === 1 ? 0 : -0.7 + (1.4 * trackIndex) / Math.max(1, trackCount - 1);
  }

  const sourceCount = profile.waves.length;
  const oscillators = profile.waves.map((wave, index) => {
    const osc = audioContext.createOscillator();
    osc.type = wave;
    osc.frequency.value = 440 * Math.pow(2, (note.pitch - 69) / 12);
    osc.detune.value = profile.detune + (index - (sourceCount - 1) / 2) * 7;
    return osc;
  });

  const mix = audioContext.createGain();
  mix.gain.value = 1 / Math.max(1, sourceCount);
  oscillators.forEach((osc) => osc.connect(mix));
  mix.connect(filter);
  filter.connect(noteGain);
  if (panner) {
    noteGain.connect(panner);
    panner.connect(trackBus);
  } else {
    noteGain.connect(trackBus);
  }
  trackBus.connect(destination);

  oscillators.forEach((osc) => {
    osc.start(safeStart);
    osc.stop(safeEnd + 0.15);
  });
}

async function playMidiTrack(startSeconds = 0) {
  const tracks = (midiState.tracks || []).filter((track) => track.notes?.length);
  if (!tracks.length) {
    alert("MIDIトラックを選んでください。");
    return;
  }
  stopMidiPlayback();
  const playback = await ensureMidiRuntime();
  const sessionId = playback.sessionId + 1;
  playback.sessionId = sessionId;
  const { BasicMIDI } = playback.runtime;
  const midiSequence = BasicMIDI.fromArrayBuffer(midiState.midiBuffer);
  await Promise.resolve(playback.sequencer.loadNewSongList([midiSequence]));
  playback.duration = Math.max(0.1, ...(tracks || []).map((track) => track.duration || 0));
  playback.positionSeconds = clamp(startSeconds, 0, playback.duration);
  playback.seekStartSeconds = playback.positionSeconds;
  playback.visualTailStartPerf = null;
  playback.visualTailStartPosition = null;
  playback.visualTailSeconds = 0;
  playback.sequencer.currentTime = playback.positionSeconds;
  resetPlaybackMetronome(playback);
  applyMidiPlaybackSpeed(playback);
  await playCountIn(playback);
  if (playback.sessionId !== sessionId) return;
  playback.playing = true;
  playback.startTime = playback.audioContext.currentTime;
  applyMidiPlaybackSpeed(playback);
  await Promise.resolve(playback.sequencer.play());
  logMidi(`再生開始: tracks=${tracks.length}, notes=${midiSequence.tracks?.reduce((sum, track) => sum + (track.notes?.length || 0), 0) || 0}, seek=${playback.positionSeconds.toFixed(2)}s, speed=${Math.round((playback.playbackSpeed || 1) * 100)}%`);
  if (els.midiPlay) els.midiPlay.textContent = "再生中";
  updateMidiPlaybackUi(playback.positionSeconds);

  clearMidiPlaybackTimer();
  playback.timer = window.setInterval(() => {
    const seq = midiState.playback.sequencer;
    if (!seq) return;
    if (midiState.playback.playing) {
      midiState.playback.positionSeconds = getMidiPlaybackPositionSeconds();
      schedulePlaybackMetronome(midiState.playback);
      updateMidiPlaybackUi(midiState.playback.positionSeconds);
    } else if (Number.isFinite(midiState.playback.visualTailStartPerf)) {
      const elapsed = (performance.now() / 1000) - midiState.playback.visualTailStartPerf;
      if (elapsed > (midiState.playback.visualTailSeconds || 0)) {
        midiState.playback.visualTailStartPerf = null;
        midiState.playback.visualTailStartPosition = null;
        midiState.playback.visualTailSeconds = 0;
        clearMidiPlaybackTimer();
        refreshMidiCharts();
        return;
      }
    } else {
      return;
    }
    refreshMidiCharts();
    if (!seq.paused && midiState.playback.positionSeconds >= midiState.playback.duration - 0.03) {
      midiState.playback.positionSeconds = midiState.playback.duration;
      midiState.playback.visualTailStartPerf = performance.now() / 1000;
      midiState.playback.visualTailStartPosition = midiState.playback.duration;
      midiState.playback.visualTailSeconds = (20 / getGraphScale()) / 2 + 0.8;
      stopMidiPlayback({ keepVisualTail: true });
    }
  }, 50);
}

function getPitchModel() {
  return els.pitchModel?.value || "hybrid";
}

function preparePitchSignal(buffer, sampleRate) {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);

  let mean = 0;
  for (let i = 0; i < SIZE; i++) mean += buffer[i];
  mean /= SIZE;
  const signal = new Float32Array(SIZE);
  for (let i = 0; i < SIZE; i++) {
    const window = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / Math.max(1, SIZE - 1));
    signal[i] = (buffer[i] - mean) * window;
  }

  const minFrequency = 70;
  const maxFrequency = 1200;
  const minTau = Math.max(2, Math.floor(sampleRate / maxFrequency));
  const maxTau = Math.min(SIZE - 2, Math.ceil(sampleRate / minFrequency));
  return { signal, size: SIZE, rms, minTau, maxTau, sampleRate };
}

function refineTau(values, tau) {
  const prev = values[tau - 1] ?? values[tau];
  const curr = values[tau];
  const next = values[tau + 1] ?? values[tau];
  const denominator = prev + next - 2 * curr;
  if (Math.abs(denominator) < 1e-9) return tau;
  return tau + (prev - next) / (2 * denominator);
}

function frequencyResult(frequency, confidence, rms, model) {
  return {
    frequency: Number.isFinite(frequency) && frequency > 0 ? frequency : null,
    confidence: clamp(confidence || 0, 0, 1),
    rms,
    model,
  };
}

function estimateYinFrequency(buffer, sampleRate) {
  const prepared = preparePitchSignal(buffer, sampleRate);
  const { signal, size: SIZE, rms, minTau, maxTau } = prepared;
  if (rms < 0.01) return frequencyResult(null, 0, rms, "yin");
  const difference = new Float32Array(maxTau + 1);
  const cmnd = new Float32Array(maxTau + 1);

  for (let tau = minTau; tau <= maxTau; tau += 1) {
    let sum = 0;
    const limit = SIZE - tau;
    for (let i = 0; i < limit; i += 1) {
      const delta = signal[i] - signal[i + tau];
      sum += delta * delta;
    }
    difference[tau] = sum;
  }

  let runningSum = 0;
  let bestTau = -1;
  let bestValue = Infinity;
  const threshold = 0.13;
  for (let tau = minTau; tau <= maxTau; tau += 1) {
    runningSum += difference[tau];
    cmnd[tau] = runningSum > 0 ? (difference[tau] * tau) / runningSum : 1;
    if (cmnd[tau] < bestValue) {
      bestValue = cmnd[tau];
      bestTau = tau;
    }
    if (tau > minTau && cmnd[tau] < threshold && cmnd[tau] <= cmnd[tau - 1]) {
      while (tau + 1 <= maxTau && cmnd[tau + 1] < cmnd[tau]) tau += 1;
      bestTau = tau;
      bestValue = cmnd[tau];
      break;
    }
  }

  if (bestTau <= 0 || bestValue > 0.42) return frequencyResult(null, 0, rms, "yin");
  const refinedTau = refineTau(cmnd, bestTau);
  const frequency = sampleRate / refinedTau;
  const confidence = clamp(1 - bestValue, 0, 1);
  return frequencyResult(frequency, confidence, rms, "yin");
}

function estimateAutocorrelationFrequency(buffer, sampleRate) {
  const { signal, size, rms, minTau, maxTau } = preparePitchSignal(buffer, sampleRate);
  if (rms < 0.01) return frequencyResult(null, 0, rms, "acf");
  const corr = new Float32Array(maxTau + 1);
  let bestTau = -1;
  let best = -Infinity;

  for (let tau = minTau; tau <= maxTau; tau += 1) {
    let sum = 0;
    let e1 = 0;
    let e2 = 0;
    const limit = size - tau;
    for (let i = 0; i < limit; i += 1) {
      const a = signal[i];
      const b = signal[i + tau];
      sum += a * b;
      e1 += a * a;
      e2 += b * b;
    }
    const value = e1 > 0 && e2 > 0 ? sum / Math.sqrt(e1 * e2) : 0;
    corr[tau] = value;
    if (value > best) {
      best = value;
      bestTau = tau;
    }
  }

  if (bestTau <= 0 || best < 0.36) return frequencyResult(null, 0, rms, "acf");
  const refinedTau = refineTau(corr, bestTau);
  const confidence = clamp((best - 0.36) / 0.58, 0, 1);
  return frequencyResult(sampleRate / refinedTau, confidence, rms, "acf");
}

function estimateMpmFrequency(buffer, sampleRate) {
  const { signal, size, rms, minTau, maxTau } = preparePitchSignal(buffer, sampleRate);
  if (rms < 0.01) return frequencyResult(null, 0, rms, "mpm");
  const nsdf = new Float32Array(maxTau + 1);
  let highest = 0;
  const peaks = [];

  for (let tau = minTau; tau <= maxTau; tau += 1) {
    let acf = 0;
    let divisor = 0;
    const limit = size - tau;
    for (let i = 0; i < limit; i += 1) {
      const a = signal[i];
      const b = signal[i + tau];
      acf += a * b;
      divisor += a * a + b * b;
    }
    const value = divisor > 0 ? (2 * acf) / divisor : 0;
    nsdf[tau] = value;
    if (value > highest) highest = value;
  }

  for (let tau = minTau + 1; tau < maxTau - 1; tau += 1) {
    if (nsdf[tau] > 0.35 && nsdf[tau] >= nsdf[tau - 1] && nsdf[tau] > nsdf[tau + 1]) {
      peaks.push(tau);
    }
  }
  if (!peaks.length || highest < 0.42) return frequencyResult(null, 0, rms, "mpm");

  const cutoff = highest * 0.86;
  const selectedTau = peaks.find((tau) => nsdf[tau] >= cutoff) || peaks[0];
  const refinedTau = refineTau(nsdf, selectedTau);
  return frequencyResult(sampleRate / refinedTau, clamp(nsdf[selectedTau], 0, 1), rms, "mpm");
}

function estimateAmdfFrequency(buffer, sampleRate) {
  const { signal, size, rms, minTau, maxTau } = preparePitchSignal(buffer, sampleRate);
  if (rms < 0.012) return frequencyResult(null, 0, rms, "amdf");
  const amdf = new Float32Array(maxTau + 1);
  let bestTau = -1;
  let best = Infinity;
  let average = 0;
  let count = 0;

  for (let tau = minTau; tau <= maxTau; tau += 1) {
    let sum = 0;
    const limit = size - tau;
    for (let i = 0; i < limit; i += 1) {
      sum += Math.abs(signal[i] - signal[i + tau]);
    }
    const value = limit > 0 ? sum / limit : Infinity;
    amdf[tau] = value;
    average += value;
    count += 1;
    if (value < best) {
      best = value;
      bestTau = tau;
    }
  }

  average = count ? average / count : Infinity;
  const confidence = Number.isFinite(average) && average > 0 ? clamp(1 - best / average, 0, 1) : 0;
  if (bestTau <= 0 || confidence < 0.32) return frequencyResult(null, 0, rms, "amdf");
  const inverted = new Float32Array(maxTau + 1);
  for (let tau = minTau; tau <= maxTau; tau += 1) inverted[tau] = -amdf[tau];
  return frequencyResult(sampleRate / refineTau(inverted, bestTau), confidence, rms, "amdf");
}

function estimateHybridFrequency(buffer, sampleRate) {
  const yin = estimateYinFrequency(buffer, sampleRate);
  if (Number.isFinite(yin.frequency) && yin.confidence >= 0.78) {
    return frequencyResult(yin.frequency, yin.confidence, yin.rms, "hybrid");
  }

  const estimates = [
    yin,
    estimateMpmFrequency(buffer, sampleRate),
    estimateAutocorrelationFrequency(buffer, sampleRate),
  ].filter((item) => Number.isFinite(item.frequency) && item.confidence >= 0.25);

  if (!estimates.length) return estimateAmdfFrequency(buffer, sampleRate);
  const anchor = estimates.find((item) => item.model === "yin" && item.confidence >= 0.62) || estimates[0];
  const anchorMidi = 69 + 12 * Math.log2(anchor.frequency / 440);
  let weightedMidi = 0;
  let weightSum = 0;
  for (const estimate of estimates) {
    const midi = 69 + 12 * Math.log2(estimate.frequency / 440);
    const aligned = forceOctaveNearReference(midi, anchorMidi);
    const distancePenalty = clamp(1 - Math.abs(aligned - anchorMidi) / 5.5, 0.2, 1);
    const weight = estimate.confidence * distancePenalty;
    weightedMidi += aligned * weight;
    weightSum += weight;
  }
  const midi = weightSum > 0 ? weightedMidi / weightSum : anchorMidi;
  const confidence = clamp(estimates.reduce((sum, item) => sum + item.confidence, 0) / estimates.length, 0, 1);
  return frequencyResult(440 * Math.pow(2, (midi - 69) / 12), confidence, anchor.rms, "hybrid");
}

function estimateFrequency(buffer, sampleRate) {
  switch (getPitchModel()) {
    case "yin":
      return estimateYinFrequency(buffer, sampleRate);
    case "mpm":
      return estimateMpmFrequency(buffer, sampleRate);
    case "acf":
      return estimateAutocorrelationFrequency(buffer, sampleRate);
    case "amdf":
      return estimateAmdfFrequency(buffer, sampleRate);
    case "hybrid":
    default:
      return estimateHybridFrequency(buffer, sampleRate);
  }
}

function drawMicChart(history, expectedTarget) {
  const canvas = els.micChart;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 900;
  const cssHeight = 760;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.fillStyle = "#091120";
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const valid = history.filter((item) => Number.isFinite(item.rawMidi ?? item.midi));
  const preset = getDisplayVoiceRangePreset();
  const minMidi = preset.minMidi;
  const maxMidi = preset.maxMidi;
  const yFor = (midi) => midiToY(midi, minMidi, maxMidi, cssHeight);
  const selectedTrack = getSelectedMidiTrack();
  const expectedTrack = expectedTarget && Array.isArray(expectedTarget.notes)
    ? expectedTarget
    : (selectedTrack && Array.isArray(selectedTrack.notes) ? selectedTrack : null);
  const displayTracks = getGuideDisplayTracks();
  const expectedMidi = Number.isFinite(expectedTarget) ? expectedTarget : null;
  const windowSeconds = 20 / getGraphScale();
  const liveClock = getGuideClockSeconds();
  const guideDisplayOffset = getGuideDisplayOffsetSeconds();
  const guidePitchShift = expectedTrack ? getGuidePitchShiftSemitones(expectedTrack, minMidi, maxMidi) : 0;
  const centeredWindow = getCenteredWindow(liveClock, expectedTrack?.duration, windowSeconds);
  let windowStart = centeredWindow.start;
  let windowEnd = centeredWindow.end;
  const xForTime = (time) => 48 + ((cssWidth - 72) * (clamp(time, windowStart, windowEnd) - windowStart)) / Math.max(0.1, windowEnd - windowStart);
  const strengthFor = voiceStrengthFromSample;
  const thresholds = getVoiceThresholdPreset();

  const labels = { 0: 'ド', 1: 'ド♯', 2: 'レ', 3: 'レ♯', 4: 'ミ', 5: 'ファ', 6: 'ファ♯', 7: 'ソ', 8: 'ソ♯', 9: 'ラ', 10: 'ラ♯', 11: 'シ' };
  ctx.font = '10px sans-serif';

  for (let midi = minMidi; midi <= maxMidi; midi += 1) {
    const y = yFor(midi);
    const pc = ((midi % 12) + 12) % 12;
    const black = [1, 3, 6, 8, 10].includes(pc);
    ctx.beginPath();
    ctx.strokeStyle = black ? 'rgba(126,224,184,.18)' : 'rgba(153,171,200,.12)';
    ctx.setLineDash(black ? [5, 6] : []);
    ctx.moveTo(48, y);
    ctx.lineTo(cssWidth - 24, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = black ? 'rgba(190,204,224,.85)' : 'rgba(238,244,255,.92)';
    ctx.fillText(`${labels[pc]}${Math.floor(midi / 12) - 1}`, 8, y + 3);
  }

  if (displayTracks.length) {
    const allMode = midiState.guideDisplayMode === "all";
    displayTracks.forEach((track) => {
      const trackIsSelected = expectedTrack?.id === track.id;
      const trackShift = getGuidePitchShiftSemitones(track, minMidi, maxMidi);
      const visibleNotes = track.notes.filter((note) => {
        const displayStart = note.start + guideDisplayOffset;
        const displayEnd = note.end + guideDisplayOffset;
        return displayEnd >= windowStart && displayStart <= windowEnd;
      });
      visibleNotes.forEach((note) => {
        const x1 = xForTime((note.start || 0) + guideDisplayOffset);
        const x2 = xForTime((note.end || note.start || 0) + guideDisplayOffset);
        const y = yFor(note.pitch + trackShift);
        ctx.save();
        const noteStrength = clamp((note.velocity ?? 80) / 127, 0.22, 1);
        const selectedBoost = trackIsSelected ? 0.16 : 0;
        const alpha = allMode
          ? (trackIsSelected ? 0.3 + noteStrength * 0.34 : 0.11 + noteStrength * 0.18)
          : 0.22 + noteStrength * 0.42;
        ctx.fillStyle = allMode && !trackIsSelected
          ? `rgba(122,183,255,${clamp(alpha, 0.08, 0.42)})`
          : `rgba(126,224,184,${clamp(alpha + selectedBoost, 0.12, 0.82)})`;
        ctx.beginPath();
        ctx.roundRect(Math.min(x1, x2), y - (trackIsSelected ? 8 : 6), Math.max(5, Math.abs(x2 - x1)), trackIsSelected ? 16 : 12, trackIsSelected ? 8 : 6);
        ctx.fill();
        ctx.restore();
      });
    });
  } else if (expectedMidi != null) {
    const expectedY = yFor(expectedMidi);
    ctx.strokeStyle = 'rgba(126,224,184,.92)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(48, expectedY);
    ctx.lineTo(cssWidth - 24, expectedY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  const samples = valid.filter((item) => item.time >= windowStart - 0.4 && item.time <= windowEnd + 0.2);
  let lastDisplayMidi = Number.isFinite(micState.lastDisplayedMidi) ? micState.lastDisplayedMidi : null;
  const points = [];
  for (const item of samples) {
    const rawMidi = Number(item.rawMidi ?? item.midi);
    const guideMidi = expectedTrack ? getDisplayedGuideMidiAtTime(expectedTrack, item.time, minMidi, maxMidi) : null;
    const fallbackReference = Number.isFinite(guideMidi) ? guideMidi : (Number.isFinite(lastDisplayMidi) ? lastDisplayMidi : preset.center);
    const displayMidi = stabilizeMidiDisplay(rawMidi, fallbackReference, minMidi, maxMidi, lastDisplayMidi, item.confidence ?? 0);
    lastDisplayMidi = displayMidi;
    points.push({
      x: xForTime(item.time),
      y: yFor(displayMidi),
      time: item.time,
      confidence: item.confidence ?? 0,
      rms: item.rms ?? 0,
      strength: strengthFor(item),
      rawMidi,
      displayMidi,
    });
  }
  if (Number.isFinite(lastDisplayMidi)) {
    micState.lastDisplayedMidi = lastDisplayMidi;
  }

  const curveRuns = [];
  let currentRun = [];
  let pathMidi = null;
  let previousCurvePoint = null;
  for (const point of points) {
    const shouldBreak = point.strength < thresholds.line || (previousCurvePoint && point.time - previousCurvePoint.time > 0.24);
    if (shouldBreak) {
      if (currentRun.length) curveRuns.push(currentRun);
      currentRun = [];
      pathMidi = null;
      previousCurvePoint = null;
      if (point.strength < thresholds.line) continue;
    }
    pathMidi = Number.isFinite(pathMidi) ? (pathMidi * 0.38 + point.displayMidi * 0.62) : point.displayMidi;
    currentRun.push({
      ...point,
      pathY: yFor(pathMidi),
    });
    previousCurvePoint = point;
  }
  if (currentRun.length) curveRuns.push(currentRun);

  for (const curvePoints of curveRuns) {
    if (curvePoints.length < 2) continue;
    ctx.save();
    ctx.shadowColor = 'rgba(126,224,184,.22)';
    ctx.shadowBlur = 7;
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].x, curvePoints[0].pathY);
    for (let i = 1; i < curvePoints.length; i++) {
      const prev = curvePoints[i - 1];
      const curr = curvePoints[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.pathY + curr.pathY) / 2;
      ctx.strokeStyle = `rgba(126,224,184,${0.26 + ((prev.strength + curr.strength) / 2) * 0.54})`;
      ctx.quadraticCurveTo(prev.x, prev.pathY, midX, midY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(midX, midY);
    }
    const last = curvePoints.at(-1);
    ctx.strokeStyle = `rgba(126,224,184,${0.26 + last.strength * 0.54})`;
    ctx.lineTo(last.x, last.pathY);
    ctx.stroke();
    ctx.restore();
  }

  curveRuns.forEach((run) => {
    const first = run[0];
    if (!first) return;
    ctx.strokeStyle = 'rgba(122,183,255,.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(first.x, cssHeight - 34);
    ctx.lineTo(first.x, cssHeight - 18);
    ctx.stroke();
  });

  points.forEach((point) => {
    if (point.strength < thresholds.dot) return;
    ctx.fillStyle = `rgba(126,224,184,${0.12 + point.strength * 0.36})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.2 + point.strength * 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  const nowX = xForTime(liveClock);
  ctx.strokeStyle = 'rgba(126,224,184,.78)';
  ctx.lineWidth = 2.4;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(nowX, 18);
  ctx.lineTo(nowX, cssHeight - 18);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(126,224,184,.92)';
  ctx.font = '12px sans-serif';
  ctx.fillText('今', nowX - 6, 14);

  const latest = points.at(-1);
  if (latest && latest.strength >= thresholds.dot) {
    ctx.fillStyle = 'rgba(126,224,184,.95)';
    ctx.beginPath();
    ctx.arc(latest.x, latest.y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

}
const micState = {
  stream: null,
  audioContext: null,
  analyser: null,
  source: null,
  raf: null,
  history: [],
  samples: [],
  lastMidi: null,
  lastRawMidi: null,
  lastDisplayedMidi: null,
  smoothedMidi: null,
  pitchWindow: [],
  lastVoiceTime: 0,
  captureClock: 0,
  inputLatencySeconds: 0,
};

const midiState = {
  file: null,
  midiBuffer: null,
  tracks: [],
  selectedTrackId: null,
  selectedTrackIds: [],
  guideDisplayMode: "selected",
  parsed: null,
  playback: {
    audioContext: null,
    masterGain: null,
    synth: null,
    sequencer: null,
    runtime: null,
    timer: null,
    startTime: 0,
    seekStartSeconds: 0,
    positionSeconds: 0,
    duration: 0,
    notes: [],
    playing: false,
    playbackSpeed: 1,
    metronomeNextStep: null,
    metronomeLastMode: null,
    sessionId: 0,
    visualTailStartPerf: null,
    visualTailStartPosition: null,
    visualTailSeconds: 0,
  },
};

const countInState = {
  active: false,
  expectedTimes: [],
  matched: [],
  lastPeakTime: 0,
  baselineRms: 0.01,
};

async function loadMidiRuntime() {
  if (!midiRuntimePromise) {
    midiRuntimePromise = Promise.all([import(MIDI_LIB_URL), import(MIDI_CORE_URL)])
      .then(([lib, core]) => ({
        WorkletSynthesizer: lib.WorkletSynthesizer,
        Sequencer: lib.Sequencer,
        BasicMIDI: core.BasicMIDI,
        BasicSoundBank: core.BasicSoundBank,
      }))
      .catch((error) => {
        midiRuntimePromise = null;
        throw error;
      });
  }
  return midiRuntimePromise;
}

function updateMidiPlaybackUi(positionSeconds = midiState.playback.positionSeconds) {
  const duration = Math.max(0.1, midiState.playback.duration || 0);
  const safePosition = clamp(positionSeconds, 0, duration);
  if (els.midiSeek) els.midiSeek.value = String((safePosition / duration) * 100);
  if (els.midiTimeLabel) els.midiTimeLabel.textContent = `${formatTime(safePosition)} / ${formatTime(duration)}`;
}

function clearMidiPlaybackTimer() {
  if (midiState.playback.timer) {
    clearInterval(midiState.playback.timer);
    midiState.playback.timer = null;
  }
}

function resetMidiPlaybackState() {
  clearMidiPlaybackTimer();
  midiState.playback.playing = false;
  midiState.playback.startTime = 0;
  midiState.playback.seekStartSeconds = 0;
  midiState.playback.positionSeconds = 0;
  midiState.playback.duration = 0;
  midiState.playback.notes = [];
  midiState.playback.visualTailStartPerf = null;
  midiState.playback.visualTailStartPosition = null;
  midiState.playback.visualTailSeconds = 0;
  if (els.midiPlay) els.midiPlay.textContent = "再生";
  updateMidiPlaybackUi(0);
}

async function ensureMidiRuntime() {
  const playback = midiState.playback;
  if (playback.audioContext && playback.synth && playback.sequencer && playback.runtime) {
    return playback;
  }
  if (!midiState.midiBuffer) {
    throw new Error("MIDIファイルを先に読み込んでください");
  }
  const { WorkletSynthesizer, Sequencer, BasicMIDI, BasicSoundBank } = await loadMidiRuntime();
  const audioContext = new AudioContext({ sampleRate: 44100 });
  await audioContext.resume();
  await audioContext.audioWorklet.addModule(MIDI_WORKLET_URL);
  const synth = new WorkletSynthesizer(audioContext);
  await synth.isReady;
  const masterGain = audioContext.createGain();
  const initialVolume = updateMidiVolumeUi();
  masterGain.gain.value = Math.max(0.001, initialVolume);
  synth.connect(masterGain);
  masterGain.connect(audioContext.destination);
  let soundBank = null;
  try {
    await BasicSoundBank.isSF3DecoderReady;
    const response = await fetch(MIDI_SOUNDBANK_URL, { mode: "cors" });
    if (!response.ok) throw new Error(`soundbank HTTP ${response.status}`);
    soundBank = await response.arrayBuffer();
    logMidi("GM音源を読み込みました");
  } catch (error) {
    logMidi(`GM音源の読み込み失敗: ${error.message} / 代替音源を使用します`);
    soundBank = BasicSoundBank.getSampleSoundBankFile();
  }
  await synth.soundBankManager.addSoundBank(soundBank, "main");
  const sequencer = new Sequencer(synth, {
    // Keep the MIDI timeline intact. The default skips leading silence, which
    // makes audio start earlier than guide bars for files with an intro gap.
    skipToFirstNoteOn: false,
  });
  sequencer.skipToFirstNoteOn = false;
  playback.audioContext = audioContext;
  playback.masterGain = masterGain;
  playback.synth = synth;
  playback.sequencer = sequencer;
  playback.runtime = { BasicMIDI };
  logMidi("SpessaSynth を初期化しました (先頭無音スキップなし)");
  return playback;
}

function describeRuntimeValue(value, depth = 0) {
  if (value == null) return String(value);
  if (depth > 1) return typeof value;
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (ArrayBuffer.isView(value)) return `${value.constructor?.name || "TypedArray"}(${value.length})`;
  if (typeof value !== "object") return `${typeof value}:${String(value).slice(0, 40)}`;
  const ownKeys = Object.keys(value).slice(0, 12);
  const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(value) || {}).filter((key) => key !== "constructor").slice(0, 12);
  return `own=[${ownKeys.join(", ")}] proto=[${protoKeys.join(", ")}]`;
}

function firstFiniteValue(...values) {
  for (const value of values) {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function callRuntimeTimeConverter(basicMidi, tick) {
  for (const fnName of ["midiTicksToSeconds", "ticksToSeconds", "tickToSeconds"]) {
    const fn = basicMidi?.[fnName];
    if (typeof fn !== "function") continue;
    try {
      const seconds = Number(fn.call(basicMidi, tick));
      if (Number.isFinite(seconds)) return seconds;
    } catch {}
  }
  return null;
}

function extractNoteFromRuntimeNote(note, basicMidi, fallbackTrack, index) {
  const pitch = firstFiniteValue(
    note?.pitch,
    note?.midi,
    note?.midiNote,
    note?.note,
    note?.key,
    note?.noteNumber,
    note?.number,
  );
  if (!Number.isFinite(pitch)) return null;

  let start = firstFiniteValue(note?.start, note?.startTime, note?.time, note?.seconds, note?.absoluteTime, note?.startSeconds);
  let end = firstFiniteValue(note?.end, note?.endTime, note?.stopTime, note?.endSeconds);
  const duration = firstFiniteValue(note?.duration, note?.length, note?.secondsLength);
  const startTick = firstFiniteValue(note?.startTick, note?.tick, note?.ticks, note?.absoluteTick);
  const endTick = firstFiniteValue(note?.endTick, note?.stopTick, note?.offTick);

  if (start == null && startTick != null) {
    start = callRuntimeTimeConverter(basicMidi, startTick);
  }
  if (end == null && endTick != null) {
    end = callRuntimeTimeConverter(basicMidi, endTick);
  }
  if (end == null && start != null && duration != null) {
    end = start + duration;
  }
  if (start == null || end == null || end <= start) return null;

  return {
    pitch,
    velocity: firstFiniteValue(note?.velocity, note?.vel, note?.volume) ?? 80,
    program: firstFiniteValue(note?.program, note?.instrument, fallbackTrack?.dominantProgram) ?? 0,
    channel: firstFiniteValue(note?.channel, note?.midiChannel) ?? 0,
    start,
    end,
    startTick: startTick ?? undefined,
    endTick: endTick ?? undefined,
    sourceIndex: index,
  };
}

async function extractBasicMidiGuideTracks(arrayBuffer, fallbackTracks = []) {
  const { BasicMIDI } = await loadMidiRuntime();
  const basicMidi = BasicMIDI.fromArrayBuffer(arrayBuffer.slice(0));
  const runtimeTracks = Array.isArray(basicMidi?.tracks) ? basicMidi.tracks : [];
  const extracted = runtimeTracks.map((track, index) => {
    const runtimeNotes = Array.isArray(track?.notes) ? track.notes : [];
    const fallbackTrack = fallbackTracks[index] || {};
    const notes = runtimeNotes
      .map((note, noteIndex) => extractNoteFromRuntimeNote(note, basicMidi, fallbackTrack, noteIndex))
      .filter(Boolean);
    return {
      id: `${index}`,
      index,
      name: track?.name || track?.trackName || fallbackTrack.name || `Track ${index + 1}`,
      notes,
      guideSource: "BasicMIDI",
    };
  });
  const normalized = normalizeParsedTracks(extracted).filter((track) => track.notes.length);
  return { tracks: normalized, basicMidi };
}

async function inspectBasicMidiForGuideSource(arrayBuffer) {
  try {
    const { BasicMIDI } = await loadMidiRuntime();
    const basicMidi = BasicMIDI.fromArrayBuffer(arrayBuffer.slice(0));
    const tracks = Array.isArray(basicMidi?.tracks) ? basicMidi.tracks : [];
    logMidi(`BasicMIDI検査: ${describeRuntimeValue(basicMidi)}, tracks=${tracks.length}`);
    tracks.slice(0, 4).forEach((track, index) => {
      const events = Array.isArray(track?.events) ? track.events : [];
      const notes = Array.isArray(track?.notes) ? track.notes : [];
      const firstEvent = events[0];
      const firstNote = notes[0];
      logMidi(`BasicMIDI Track ${index + 1}: ${describeRuntimeValue(track)}, events=${events.length}, notes=${notes.length}`);
      if (firstEvent) logMidi(`  event: ${describeRuntimeValue(firstEvent)}`);
      if (firstNote) logMidi(`  note: ${describeRuntimeValue(firstNote)}`);
    });
  } catch (error) {
    logMidi(`BasicMIDI検査失敗: ${error.message}`);
  }
}

let audioPlayback = { element: null, url: null };
let metronomeState = { enabled: false, timer: null, audioContext: null };
let audioSyncAdjustment = 0;
let audioSilenceEstimate = 0;
let syncMicTimer = null;
let latestTake = null;
const takeRecorderState = {
  recorder: null,
  chunks: [],
  recording: false,
  startedSongSeconds: 0,
  playbackSpeed: 1,
  mimeType: "",
};
const reviewState = {
  audio: null,
  raf: null,
  active: false,
  restoreVolume: null,
};

function updateMicUi({ frequency, confidence }) {
  setText(els.micFrequency, frequency ? `${frequency.toFixed(1)} Hz` : "--");
  setText(els.micNote, frequency ? noteNameFromMidi(69 + 12 * Math.log2(frequency / 440)) : "--");
  setText(els.micConfidence, `${Math.round(confidence * 100)}%`);
}

function getAudioSyncOffset() {
  return Math.max(0, audioSilenceEstimate + audioSyncAdjustment);
}

function updateSyncStatus() {
  setText(els.syncStatus, `推定 ${audioSilenceEstimate.toFixed(1)}s / 補正 ${audioSyncAdjustment.toFixed(1)}s / 合計 ${getAudioSyncOffset().toFixed(1)}s`);
}

function stopAudioPlayback() {
  if (audioPlayback.element) {
    audioPlayback.element.pause();
    audioPlayback.element.currentTime = 0;
  }
  setText(els.audioStatus, "音声停止中");
  setText(els.audioProgress, "0.0 / 0.0 sec");
  setText(els.audioNote, "期待音: --");
  updateSyncStatus();
}

function playAudioFile() {
  alert("音声ファイル入力は省略しています。");
}

async function estimateLeadingSilenceSeconds() {
  alert("音声ファイル入力は省略しています。");
}

async function startSyncedPractice() {
  playAudioFile();
  const delaySeconds = Math.max(0, Number(els.syncDelay?.value || audioSilenceEstimate || 1.5));
  setText(els.syncStatus, `録音開始まで ${delaySeconds.toFixed(1)} 秒`);
  if (syncMicTimer) clearTimeout(syncMicTimer);
  syncMicTimer = window.setTimeout(() => {
    startMic().catch((error) => {
      setText(els.micStatus, error.message);
      alert(error.message);
    });
  }, delaySeconds * 1000);
}

async function startMic() {
  if (micState.audioContext) return;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
  });
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = MIC_ANALYSIS_FFT_SIZE;
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
  micState.stream = stream;
  micState.audioContext = audioContext;
  micState.analyser = analyser;
  micState.source = source;
  micState.captureClock = performance.now() / 1000;
  resetMicTrackingState({ clearHistory: true });
  setText(els.micStatus, "解析中");

  const buffer = new Float32Array(analyser.fftSize);
  const tick = () => {
    if (!micState.analyser) return;
    micState.analyser.getFloatTimeDomainData(buffer);
    const { frequency, confidence, rms } = estimateFrequency(buffer, audioContext.sampleRate);
    const nowAbsolute = performance.now() / 1000;
    detectCountInPeak(nowAbsolute, rms);
    const now = nowAbsolute - micState.captureClock;
    const guideClock = midiState.playback.playing ? getMidiPlaybackPositionSeconds() : now;
    const analysisLatencySeconds = (analyser.fftSize / audioContext.sampleRate) * 0.5;
    const historyTime = Math.max(0, guideClock - analysisLatencySeconds - (micState.inputLatencySeconds || 0));
    const thresholds = getVoiceThresholdPreset();
    const strongEnough = Number.isFinite(frequency) && confidence >= thresholds.confidence && rms >= thresholds.rms;
    if (strongEnough) {
      const rawMidi = 69 + 12 * Math.log2(frequency / 440);
      const range = getVoiceRangePreset();
      const previousDisplay = Number.isFinite(micState.lastDisplayedMidi) ? micState.lastDisplayedMidi : (Number.isFinite(micState.smoothedMidi) ? micState.smoothedMidi : rawMidi);
      const expectedReference = getDisplayedGuideMidiAtTime(getSelectedMidiTrack(), historyTime, range.minMidi, range.maxMidi);
      const displayReference = expectedReference ?? previousDisplay;
      const octaveAligned = octaveAlignedMidi(
        rawMidi,
        expectedReference,
        Number.isFinite(micState.lastRawMidi) ? micState.lastRawMidi : previousDisplay,
        range.minMidi,
        range.maxMidi,
      );
      const jumpChecked = rejectImplausiblePitchJump(
        octaveAligned,
        Number.isFinite(micState.lastRawMidi) ? micState.lastRawMidi : previousDisplay,
        confidence,
        rms,
        expectedReference,
      );
      const dampedRaw = smoothPitchCandidate(jumpChecked, confidence, rms);
      const displayedMidi = stabilizeMidiDisplay(
        dampedRaw,
        displayReference,
        range.minMidi,
        range.maxMidi,
        previousDisplay,
        confidence,
      );
      micState.smoothedMidi = displayedMidi;
      micState.lastMidi = displayedMidi;
      micState.lastRawMidi = dampedRaw;
      micState.lastDisplayedMidi = displayedMidi;
      micState.lastVoiceTime = now;
      micState.history.push({
        midi: dampedRaw,
        rawMidi: dampedRaw,
        displayMidi: displayedMidi,
        time: historyTime,
        confidence,
        rms,
      });
      if (micState.history.length > 12000) micState.history.shift();
      micState.samples.push(frequency);
      if (micState.samples.length > 12) micState.samples.shift();
      const avg = micState.samples.reduce((sum, value) => sum + value, 0) / micState.samples.length;
      const trend = micState.samples.length > 1 ? micState.samples[micState.samples.length - 1] - micState.samples[0] : 0;
      updateMicUi({ frequency: avg, confidence });
      setText(els.micTrend, `${trend >= 0 ? "+" : ""}${trend.toFixed(1)} Hz`);
      setText(els.micConfidence, `${Math.round(confidence * 100)}%`);
      setText(els.audioNote, `期待音: ${noteNameFromMidi(displayedMidi)}`);
      drawMicChart(micState.history, getSelectedMidiTrack());
      renderMidiComparison();
    } else {
      if (now - micState.lastVoiceTime > 0.22) {
        micState.pitchWindow = [];
        micState.samples = [];
        micState.smoothedMidi = null;
        micState.lastRawMidi = null;
      }
      updateMicUi({ frequency: null, confidence: 0 });
      setText(els.micTrend, "--");
      drawMicChart(micState.history, getSelectedMidiTrack());
      renderMidiComparison();
    }
    micState.raf = requestAnimationFrame(tick);
  };
  tick();
}

async function stopMic() {
  if (syncMicTimer) {
    clearTimeout(syncMicTimer);
    syncMicTimer = null;
  }
  if (micState.raf) cancelAnimationFrame(micState.raf);
  micState.raf = null;
  if (micState.source) micState.source.disconnect();
  if (micState.analyser) micState.analyser.disconnect();
  if (micState.stream) micState.stream.getTracks().forEach((track) => track.stop());
  if (micState.audioContext) await micState.audioContext.close();
  micState.stream = null;
  micState.audioContext = null;
  micState.analyser = null;
  micState.source = null;
  micState.samples = [];
  micState.history = [];
  micState.lastMidi = null;
  micState.lastRawMidi = null;
  micState.lastDisplayedMidi = null;
  micState.smoothedMidi = null;
  micState.pitchWindow = [];
  micState.lastVoiceTime = 0;
  micState.captureClock = 0;
  micState.inputLatencySeconds = 0;
  countInState.active = false;
  countInState.expectedTimes = [];
  countInState.matched = [];
  setText(els.micStatus, "停止中");
  setText(els.micNote, "--");
  setText(els.micFrequency, "--");
  setText(els.micConfidence, "--");
  setText(els.micTrend, "--");
  drawMicChart([], getSelectedMidiTrack());
  renderMidiComparison();
}

async function loadMidiFile(file) {
  if (!file) return;
  stopMidiPlayback({ resetPosition: true, resetDuration: true });
  resetMidiDebugLog();
  logMidi(`ファイル選択: ${file.name} (${file.size} bytes)`);
  setText(els.midiExcludeStatus, `読み込み中: ${file.name}`);
  setText(els.midiTopStatus, "解析中");
  setText(els.midiTopSelected, `読み込み中: ${file.name}`);
  try {
    const arrayBuffer = await file.arrayBuffer();
    midiState.midiBuffer = arrayBuffer.slice(0);
    const parsed = parseMidiFile(arrayBuffer);
    inspectBasicMidiForGuideSource(arrayBuffer).catch((error) => logMidi(`BasicMIDI検査失敗: ${error.message}`));
    let guideTracks = parsed.tracks;
    try {
      const extracted = await extractBasicMidiGuideTracks(arrayBuffer, parsed.tracks);
      if (isPlausibleGuideReplacement(extracted.tracks, parsed.tracks)) {
        guideTracks = extracted.tracks;
        logMidi(`描画ソース: BasicMIDI (${guideTracks.length}トラック)`);
      } else {
        logMidi("描画ソース: 自前パーサー (BasicMIDI抽出は不採用)");
      }
    } catch (error) {
      logMidi(`描画ソース: 自前パーサー (BasicMIDI抽出失敗: ${error.message})`);
    }
    midiState.file = file;
    midiState.parsed = parsed;
    midiState.tracks = guideTracks;
    midiState.selectedTrackId = guideTracks[0]?.id || null;
    midiState.selectedTrackIds = [midiState.selectedTrackId].filter(Boolean);
    midiState.guideDisplayMode = "selected";
    if (!guideTracks.length) {
      setText(els.midiExcludeStatus, "MIDI は読めましたが、音符が見つかりませんでした");
      setText(els.midiTopStatus, "読込済み");
      setText(els.midiTopSelected, "トラック未選択");
      logMidi("解析結果: トラックはあるが音符は抽出できませんでした");
      renderMidiTrackList();
      refreshMidiCharts();
      return;
    }
    logMidi(`解析成功: ${guideTracks.length}トラック, 先頭=${guideTracks[0]?.name || "?"}`);
    renderMidiTrackList();
    refreshMidiCharts();
    setText(els.midiTopStatus, `読込済み (${guideTracks.length}トラック)`);
  } catch (error) {
    midiState.file = null;
    midiState.midiBuffer = null;
    midiState.parsed = null;
    midiState.tracks = [];
    midiState.selectedTrackId = null;
    midiState.selectedTrackIds = [];
    midiState.guideDisplayMode = "selected";
    renderMidiTrackList();
    refreshMidiCharts();
    setText(els.midiExcludeStatus, `MIDI 読込失敗: ${error.message}`);
    setText(els.midiTopStatus, "読込失敗");
    setText(els.midiTopSelected, "トラック未選択");
    logMidi(`解析失敗: ${error.message}`);
    throw error;
  }
}

async function loadDefaultMidiSong(songId) {
  const song = defaultMidiSongs[songId];
  if (!song) return;
  stopMidiPlayback({ resetPosition: true, resetDuration: true });
  resetMidiDebugLog();
  setText(els.midiExcludeStatus, `読み込み中: ${song.title}`);
  setText(els.midiTopStatus, "読み込み中");
  setText(els.midiTopSelected, `デフォルト曲: ${song.title}`);
  try {
    const response = await fetch(song.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`デフォルト曲が見つかりません: ${song.url} (${response.status})`);
    }
    const blob = await response.blob();
    const file = new File([blob], song.fileName, { type: "audio/midi" });
    await loadMidiFile(file);
    setText(els.midiTopSelected, `デフォルト曲: ${song.title}`);
  } catch (error) {
    setText(els.midiExcludeStatus, error.message);
    setText(els.midiTopStatus, "読込失敗");
    setText(els.midiTopSelected, "デフォルト曲を配置してください");
    logMidi(error.message);
    throw error;
  }
}

function updateReviewTakeUi() {
  if (!els.reviewTake) return;
  const hasTake = Boolean(latestTake?.audioUrl && latestTake?.history?.length);
  els.reviewTake.disabled = takeRecorderState.recording || !hasTake;
  if (takeRecorderState.recording) {
    els.reviewTake.textContent = "録音中";
  } else if (reviewState.active) {
    els.reviewTake.textContent = "振り返り停止";
  } else {
    els.reviewTake.textContent = hasTake ? "直前テイク再生" : "直前テイクなし";
  }
}

function getLatestTakeClockSeconds() {
  if (!latestTake || !reviewState.audio) return 0;
  const started = Number(latestTake.startedSongSeconds) || 0;
  const speed = Number(latestTake.playbackSpeed) || 1;
  return started + (reviewState.audio.currentTime || 0) * speed;
}

function updateReviewPlaybackUi() {
  if (!latestTake || !reviewState.audio) return;
  const duration = Math.max(0.1, midiState.playback.duration || latestTake.durationSongSeconds || 0);
  const songTime = clamp(getLatestTakeClockSeconds(), 0, duration);
  updateMidiPlaybackUi(songTime);
}

function getRecordingMimeType() {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported?.(type)) || "";
}

function revokeLatestTakeAudioUrl() {
  if (latestTake?.audioUrl) {
    URL.revokeObjectURL(latestTake.audioUrl);
  }
}

function restoreReviewMidiVolume() {
  if (reviewState.restoreVolume == null || !els.midiVolume) return;
  els.midiVolume.value = String(reviewState.restoreVolume);
  updateMidiVolumeUi(reviewState.restoreVolume);
  if (midiState.playback.audioContext && midiState.playback.masterGain) {
    midiState.playback.masterGain.gain.setTargetAtTime(
      Math.max(0.001, Number(reviewState.restoreVolume) / 100),
      midiState.playback.audioContext.currentTime,
      0.02,
    );
  }
  reviewState.restoreVolume = null;
}

function stopReviewTake({ redrawLive = true } = {}) {
  if (reviewState.raf) cancelAnimationFrame(reviewState.raf);
  reviewState.raf = null;
  if (reviewState.audio) {
    reviewState.audio.pause();
    reviewState.audio.currentTime = 0;
  }
  stopMidiPlayback();
  restoreReviewMidiVolume();
  reviewState.audio = null;
  reviewState.active = false;
  updateReviewTakeUi();
  if (redrawLive) refreshMidiCharts();
}

function startTakeRecording(startedSongSeconds = getMidiPlaybackPositionSeconds()) {
  stopReviewTake({ redrawLive: false });
  takeRecorderState.chunks = [];
  takeRecorderState.startedSongSeconds = Math.max(0, Number(startedSongSeconds) || 0);
  takeRecorderState.playbackSpeed = getPlaybackSpeed();
  takeRecorderState.mimeType = getRecordingMimeType();
  if (!micState.stream || typeof MediaRecorder === "undefined") {
    takeRecorderState.recorder = null;
    takeRecorderState.recording = false;
    logMidi("録音: このブラウザでは MediaRecorder が使えないため、直前テイク音声は保存しません");
    return;
  }
  try {
    const options = takeRecorderState.mimeType ? { mimeType: takeRecorderState.mimeType } : undefined;
    const recorder = new MediaRecorder(micState.stream, options);
    recorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) takeRecorderState.chunks.push(event.data);
    });
    recorder.start();
    takeRecorderState.recorder = recorder;
    takeRecorderState.recording = true;
    updateReviewTakeUi();
    logMidi(`録音開始: start=${takeRecorderState.startedSongSeconds.toFixed(2)}s`);
  } catch (error) {
    takeRecorderState.recorder = null;
    takeRecorderState.recording = false;
    logMidi(`録音開始失敗: ${error.message}`);
  }
}

function stopTakeRecording(historySnapshot = []) {
  const recorder = takeRecorderState.recorder;
  if (!recorder || !takeRecorderState.recording) {
    takeRecorderState.recorder = null;
    takeRecorderState.recording = false;
    updateReviewTakeUi();
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const finish = () => {
      takeRecorderState.recording = false;
      takeRecorderState.recorder = null;
      if (!takeRecorderState.chunks.length || !historySnapshot.length) {
        updateReviewTakeUi();
        resolve(null);
        return;
      }
      const audioBlob = new Blob(takeRecorderState.chunks, {
        type: takeRecorderState.mimeType || takeRecorderState.chunks[0]?.type || "audio/webm",
      });
      revokeLatestTakeAudioUrl();
      latestTake = {
        id: crypto.randomUUID?.() || String(Date.now()),
        savedAt: new Date().toISOString(),
        audioBlob,
        audioUrl: URL.createObjectURL(audioBlob),
        history: historySnapshot,
        startedSongSeconds: takeRecorderState.startedSongSeconds,
        durationSongSeconds: midiState.playback.duration || Math.max(0.1, ...(midiState.tracks || []).map((track) => track.duration || 0)),
        playbackSpeed: takeRecorderState.playbackSpeed,
      };
      takeRecorderState.chunks = [];
      updateReviewTakeUi();
      logMidi(`直前テイク保存: ${historySnapshot.length} samples / ${(audioBlob.size / 1024).toFixed(1)} KB`);
      resolve(latestTake);
    };
    recorder.addEventListener("stop", finish, { once: true });
    try {
      recorder.stop();
    } catch {
      finish();
    }
  });
}

function drawReviewTakeFrame() {
  if (!reviewState.active || !reviewState.audio || !latestTake) return;
  updateReviewPlaybackUi();
  drawMicChart(latestTake.history || [], getSelectedMidiTrack());
  if (!reviewState.audio.paused && !reviewState.audio.ended) {
    reviewState.raf = requestAnimationFrame(drawReviewTakeFrame);
  } else {
    reviewState.active = false;
    updateReviewTakeUi();
  }
}

async function playLatestTakeReview() {
  if (reviewState.active) {
    stopReviewTake();
    return;
  }
  if (!latestTake?.audioUrl || !latestTake?.history?.length) {
    updateReviewTakeUi();
    return;
  }
  stopMidiPlayback();
  await stopMic().catch(() => {});
  const audio = new Audio(latestTake.audioUrl);
  audio.addEventListener("ended", () => {
    updateReviewPlaybackUi();
    drawMicChart(latestTake.history || [], getSelectedMidiTrack());
    stopMidiPlayback();
    restoreReviewMidiVolume();
    reviewState.active = false;
    reviewState.audio = null;
    updateReviewTakeUi();
  }, { once: true });
  reviewState.audio = audio;
  reviewState.active = true;
  reviewState.restoreVolume = els.midiVolume ? Number(els.midiVolume.value || 70) : null;
  updateReviewTakeUi();
  updateReviewPlaybackUi();
  audio.play()
    .then(async () => {
      if (els.midiVolume) {
        els.midiVolume.value = "25";
        updateMidiVolumeUi(25);
      }
      try {
        await playMidiTrack(getLatestTakeClockSeconds());
        if (midiState.playback.audioContext && midiState.playback.masterGain) {
          midiState.playback.masterGain.gain.setTargetAtTime(0.25, midiState.playback.audioContext.currentTime, 0.02);
        }
      } catch (error) {
        logMidi(`振り返りMIDI再生なし: ${error.message}`);
      }
      drawReviewTakeFrame();
    })
    .catch((error) => {
      reviewState.active = false;
      reviewState.audio = null;
      updateReviewTakeUi();
      alert(`直前テイクを再生できません: ${error.message}`);
    });
}

function saveTake() {
  const snapshot = micState.history.map((item) => ({ ...item }));
  stopTakeRecording(snapshot).then(() => {
    if (latestTake) alert("直前テイクを保存しました。");
  });
}

function toggleMetronome() {
  if (metronomeState.enabled) {
    if (metronomeState.timer) clearInterval(metronomeState.timer);
    if (metronomeState.audioContext) metronomeState.audioContext.close();
    metronomeState = { enabled: false, timer: null, audioContext: null };
    setText(els.metronomeToggle, "メトロノーム");
    return;
  }
  const audioContext = new AudioContext();
  const tempo = 120;
  const intervalMs = (60 / tempo) * 1000;
  const tick = () => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(audioContext.destination);
    const now = audioContext.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.1);
  };
  tick();
  metronomeState = { enabled: true, timer: window.setInterval(tick, intervalMs), audioContext };
  setText(els.metronomeToggle, "停止");
}

function init() {
  updateAppVersionInfo();
  resetMidiDebugLog();
  if (els.countIn) {
    els.countIn.value = "off";
    const countInLabel = els.countIn.closest("label");
    if (countInLabel) countInLabel.hidden = true;
  }
  if (els.guideOctave) {
    els.guideOctave.value = "auto";
    const guideOctaveLabel = els.guideOctave.closest("label");
    if (guideOctaveLabel) guideOctaveLabel.hidden = true;
  }
  if (els.metronomeMode) els.metronomeMode.value = "off";
  setupGuideOffsetOptions();
  setText(els.micStatus, "停止中");
  setText(els.micNote, "--");
  setText(els.micFrequency, "--");
  setText(els.micConfidence, "--");
  setText(els.micTrend, "--");
  setText(els.audioStatus, "音声停止中");
  setText(els.audioProgress, "0.0 / 0.0 sec");
  setText(els.audioNote, "期待音: --");
  setText(els.syncStatus, "推定 0.0s / 補正 0.0s / 合計 0.0s");
  setText(els.chartCaption, "声種に合わせた2オクターブ表示");
  if (els.midiTimeLabel) els.midiTimeLabel.textContent = "00:00 / 00:00";
  updateMidiVolumeUi();
  updateReviewTakeUi();
  drawMicChart([], null);
  renderMidiTrackList();
  renderMidiComparison();
}

function getSelectedMidiPartValues() {
  if (!els.midiPartList) return [];
  return Array.from(els.midiPartList.selectedOptions || []).map((option) => option.value).filter(Boolean);
}

function setupMidiPartMultiSelect() {
  if (!els.midiPartList) return;
  els.midiPartList.addEventListener("mousedown", (event) => {
    if (event.target?.tagName !== "OPTION") return;
    event.preventDefault();
    const option = event.target;
    if (option.value === "__all__") {
      Array.from(els.midiPartList.options).forEach((item) => {
        item.selected = item.value === "__all__";
      });
    } else {
      const allOption = Array.from(els.midiPartList.options).find((item) => item.value === "__all__");
      if (allOption) allOption.selected = false;
      option.selected = !option.selected;
      const anyTrackSelected = Array.from(els.midiPartList.options).some((item) => item.value !== "__all__" && item.selected);
      if (!anyTrackSelected) option.selected = true;
    }
    els.midiPartList.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function setupGuidePitchSwipe() {
  const canvas = els.micChart;
  if (!canvas) return;
  let gesture = null;
  canvas.addEventListener("pointerdown", (event) => {
    if (event.button != null && event.button !== 0) return;
    gesture = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startOffset: pitchViewOffsetSemitones,
      appliedDelta: 0,
    };
    canvas.setPointerCapture?.(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const deltaSemitones = Math.round((gesture.startY - event.clientY) / 22);
    if (deltaSemitones === gesture.appliedDelta) return;
    gesture.appliedDelta = deltaSemitones;
    setPitchViewOffsetSemitones(gesture.startOffset + deltaSemitones);
    event.preventDefault();
  }, { passive: false });
  const finish = (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    canvas.releasePointerCapture?.(event.pointerId);
    gesture = null;
  };
  canvas.addEventListener("pointerup", finish);
  canvas.addEventListener("pointercancel", finish);
}

els.audioPlay?.addEventListener("click", playAudioFile);
els.audioStop?.addEventListener("click", stopAudioPlayback);
els.syncStart?.addEventListener("click", () => {
  startSyncedPractice().catch((error) => {
    setText(els.syncStatus, error.message);
    alert(error.message);
  });
});
els.autoDelay?.addEventListener("click", () => {
  estimateLeadingSilenceSeconds().catch((error) => {
    setText(els.syncStatus, error.message);
    alert(error.message);
  });
});
els.micStart?.addEventListener("dblclick", () => {});
els.midiFile?.addEventListener("change", () => {
  const file = els.midiFile?.files?.[0];
  if (!file) return;
  setText(els.midiExcludeStatus, `選択中: ${file.name}`);
  setText(els.midiTopStatus, "読み込み中");
  setText(els.midiTopSelected, `選択中ファイル: ${file.name}`);
  loadMidiFile(file).catch((error) => {
    setText(els.midiExcludeStatus, error.message);
    alert(error.message);
  });
});
els.midiFile?.addEventListener("input", () => {
  const file = els.midiFile?.files?.[0];
  if (!file) return;
  setText(els.midiExcludeStatus, `選択中: ${file.name}`);
  setText(els.midiTopStatus, "読み込み中");
  setText(els.midiTopSelected, `選択中ファイル: ${file.name}`);
});
els.defaultMidi?.addEventListener("change", () => {
  const songId = els.defaultMidi.value;
  if (!songId) return;
  loadDefaultMidiSong(songId).catch((error) => {
    alert(error.message);
  });
});
els.metronomeToggle?.addEventListener("click", toggleMetronome);
els.saveTake?.addEventListener("click", saveTake);
els.reviewTake?.addEventListener("click", playLatestTakeReview);
els.graphScale?.addEventListener("change", refreshMidiCharts);
els.playbackSpeed?.addEventListener("input", () => handlePlaybackSpeedChange(els.playbackSpeed.value));
els.playbackSpeedNumber?.addEventListener("change", () => handlePlaybackSpeedChange(els.playbackSpeedNumber.value));
els.metronomeMode?.addEventListener("change", () => {
  resetPlaybackMetronome();
  const grid = getMetronomeGrid();
  const label = grid.mode === "off" ? "なし" : `${grid.mode === "eight" ? "8ビート" : "4ビート"} / ${grid.numerator}/${grid.denominator}`;
  logMidi(`メトロノーム: ${label}`);
});
els.voiceThreshold?.addEventListener("change", refreshMidiCharts);
els.guideOffset?.addEventListener("change", refreshMidiCharts);
els.guideOctave?.addEventListener("change", () => {
  renderMidiTrackList();
  refreshMidiCharts();
});
els.pitchModel?.addEventListener("change", refreshMidiCharts);
setupMidiPartMultiSelect();
setupGuidePitchSwipe();
els.midiPartList?.addEventListener("change", () => {
  selectMidiTracks(getSelectedMidiPartValues());
});
els.midiAutoExclude?.addEventListener("click", chooseBestMidiTrack);
els.midiUseScore?.addEventListener("click", refreshMidiCharts);
els.midiTopAutoExclude?.addEventListener("click", chooseBestMidiTrack);
els.midiTopUseScore?.addEventListener("click", refreshMidiCharts);
els.midiStop?.addEventListener("click", () => {
  stopPracticeSession().catch(() => {});
});
els.micStart?.addEventListener("click", async () => {
  try {
    await startPracticeSession();
  } catch (error) {
    setText(els.micStatus, error.message);
    alert(error.message);
  }
});
els.micStop?.addEventListener("click", () => {
  stopPracticeSession().catch(() => {});
});
els.midiVolume?.addEventListener("input", () => {
  const volume = updateMidiVolumeUi();
  if (midiState.playback.audioContext && midiState.playback.masterGain) {
    midiState.playback.masterGain.gain.setTargetAtTime(Math.max(0.001, volume), midiState.playback.audioContext.currentTime, 0.02);
  }
});
els.midiSeek?.addEventListener("input", () => {
  const duration = midiState.playback.duration || Math.max(0.1, ...(midiState.tracks || []).map((track) => track.duration || 0));
  if (!duration) return;
  const ratio = Number(els.midiSeek.value) / 100;
  const seekSeconds = duration * ratio;
  if (reviewState.active && reviewState.audio && latestTake) {
    const started = Number(latestTake.startedSongSeconds) || 0;
    const speed = Number(latestTake.playbackSpeed) || 1;
    const audioDuration = Number.isFinite(reviewState.audio.duration) ? reviewState.audio.duration : Number.MAX_SAFE_INTEGER;
    reviewState.audio.currentTime = clamp((seekSeconds - started) / speed, 0, audioDuration);
    updateReviewPlaybackUi();
    drawMicChart(latestTake.history || [], getSelectedMidiTrack());
    return;
  }
  if (midiState.playback.playing && midiState.playback.sequencer) {
    midiState.playback.positionSeconds = seekSeconds;
    midiState.playback.seekStartSeconds = seekSeconds;
    resetPlaybackMetronome();
    if (midiState.playback.audioContext) {
      midiState.playback.startTime = midiState.playback.audioContext.currentTime;
    }
    midiState.playback.sequencer.currentTime = seekSeconds;
    midiState.playback.sequencer.play();
    updateMidiPlaybackUi(seekSeconds);
  } else {
    midiState.playback.positionSeconds = seekSeconds;
    resetPlaybackMetronome();
    updateMidiPlaybackUi(seekSeconds);
  }
});
els.syncNudgeMinus?.addEventListener("click", () => {
  audioSyncAdjustment = Math.max(-10, Math.min(10, audioSyncAdjustment - 0.1));
  updateSyncStatus();
});
els.syncNudgePlus?.addEventListener("click", () => {
  audioSyncAdjustment = Math.max(-10, Math.min(10, audioSyncAdjustment + 0.1));
  updateSyncStatus();
});
els.syncReset?.addEventListener("click", () => {
  audioSyncAdjustment = 0;
  updateSyncStatus();
});

init();

