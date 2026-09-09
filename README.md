# 🎵 Terminal Music Player

A simple terminal-based music player built with **Node.js**.

The player loads `.mp3` files from the `songs` folder and allows you to control music directly from the terminal.

## 🖥️ Interface

```text
╔════════════════════════════════════╗
║        🎵 TERMINAL MUSIC PLAYER    ║
╚════════════════════════════════════╝

🎶 Songs

  1. Believer
  2. Shape of You
  3. Perfect
  4. Faded

──────────────────────────────────────

🎮 Controls

  play       ▶️  Play
  pause      ⏸️  Pause
  resume     ▶️  Resume
  stop       ⏹️  Stop
  next       ⏭️  Next
  previous   ⏮️  Previous
  current    ℹ️  Current song

──────────────────────────────────────

Enter command:
```

## 🎧 How It Works

* Songs are stored inside the `songs` folder.
* The player automatically detects `.mp3` files.
* Select a song using its number.
* Use commands to play, pause, resume, stop, or switch songs.
* The currently selected song can be displayed using `current`.

### Example

```text
Enter command: 2

▶️ Playing: Shape of You

Enter command: pause

⏸️ Song paused

Enter command: resume

▶️ Song resumed

Enter command: next

⏭️ Playing: Perfect
```

> **Note:** This player currently uses macOS `afplay` for audio playback.
