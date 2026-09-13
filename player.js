const { spawn } = require("child_process");
const fs = require("fs");

const path = "./songs";

let childProcess = null;
let currentSong = null;


const songs = fs.readdirSync(path).filter((song) => {
  return song.endsWith(".mp3");
});


// ===============================
//         TERMINAL UI
// ===============================

console.log("\n");

console.log("╔════════════════════════════════════╗");
console.log("║       🎵 TERMINAL MUSIC PLAYER     ║");
console.log("╚════════════════════════════════════╝");


console.log("\n🎶 Songs\n");


for (let i = 0; i < songs.length; i++) {
  console.log(`   ${i + 1}. ${songs[i].split(".")[0]}`);
}


console.log("\n──────────────────────────────────────");

console.log("\n🎮 Commands\n");

console.log("   number     → Play song");
console.log("   play       → Play current song");
console.log("   pause / p  → Pause");
console.log("   resume / r → Resume");
console.log("   stop / s   → Stop");
console.log("   next / n   → Next song");
console.log("   previous / b → Previous song");
console.log("   current / c  → Current song");


console.log("\n──────────────────────────────────────");
console.log("\nEnter command:");


// ===============================
//         USER INPUT
// ===============================

process.stdin.setEncoding("utf-8");

process.stdin.on("data", (input) => {

  const userInput = input.trim();


  // PLAY
  if (userInput === "play") {

    if (currentSong === null) {
      console.log("\n❌ Select a song first");
      return;
    }

    playSong(currentSong);
    return;
  }


  // PAUSE
  if (userInput === "pause" || userInput === "p") {

    if (childProcess) {
      childProcess.kill("SIGSTOP");
      console.log("\n⏸️ Song paused");
    } else {
      console.log("\n❌ No song is playing");
    }

    return;
  }


  // RESUME
  if (userInput === "resume" || userInput === "r") {

    if (childProcess) {
      childProcess.kill("SIGCONT");
      console.log("\n▶️ Song resumed");
    } else {
      console.log("\n❌ No song is playing");
    }

    return;
  }


  // STOP
  if (userInput === "stop" || userInput === "s") {

    if (childProcess) {

      childProcess.kill();
      childProcess = null;

      console.log("\n⏹️ Song stopped");

    } else {

      console.log("\n❌ No song is playing");

    }

    return;
  }


  // NEXT
  if (userInput === "next" || userInput === "n") {

    if (currentSong === null) {
      console.log("\n❌ Select a song first");
      return;
    }


    if (currentSong === songs.length) {
      console.log("\n❌ This is the last song");
      return;
    }


    currentSong++;

    playSong(currentSong);

    return;
  }


  // PREVIOUS
  if (userInput === "previous" || userInput === "b") {

    if (currentSong === null) {
      console.log("\n❌ Select a song first");
      return;
    }


    if (currentSong === 1) {
      console.log("\n❌ This is the first song");
      return;
    }


    currentSong--;

    playSong(currentSong);

    return;
  }


  // CURRENT
  if (userInput === "current" || userInput === "c") {

    if (currentSong === null) {
      console.log("\n❌ No song selected");
      return;
    }


    const song = songs[currentSong - 1];

    console.log("\n🎵 Current Song");
    console.log(`   ${song.split(".")[0]}`);
    console.log(`   Song number: ${currentSong}`);

    return;
  }


  // SONG NUMBER
  const songNumber = Number(userInput);

  playSong(songNumber);
});


// ===============================
//         PLAY SONG
// ===============================

function playSong(songNumber) {

  // Check song number
  if (
    isNaN(songNumber) ||
    songNumber < 1 ||
    songNumber > songs.length
  ) {
    console.log("\n❌ Invalid song number");
    return;
  }


  // Save current song
  currentSong = songNumber;


  // Get song
  const song = songs[songNumber - 1];


  console.log(`\n▶️ Now playing: ${song.split(".")[0]}`);


  // Stop old song
  if (childProcess) {
    childProcess.kill();
  }


  // Start new song
  childProcess = spawn("afplay", [`${path}/${song}`]);


  // When song finishes
  childProcess.on("close", () => {
    console.log("\n✅ Song finished");
  });
}