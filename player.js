const { spawn } = require("child_process");
const fs = require("fs");

const path = "./songs";

let childProcess = null;
let currentSong = null;


const songs = fs.readdirSync(path).filter((song) => {
  return song.endsWith(".mp3");
});


console.log("\n🎵 =============================");
console.log("       TERMINAL MUSIC PLAYER");
console.log("============================= 🎵\n");


for (let i = 0; i < songs.length; i++) {
  console.log(`${i + 1}. ${songs[i].split(".")[0]}`);
}


console.log("\nCommands:");
console.log("number → Play song");
console.log("play → Play current song");
console.log("pause → Pause");
console.log("resume → Resume");
console.log("stop → Stop");
console.log("next → Next song");
console.log("previous → Previous song");

console.log("\nEnter command:");


process.stdin.setEncoding("utf-8");

process.stdin.on("data", (input) => {

  const userInput = input.trim();


  // PLAY
  if (userInput === "play") {

    if (currentSong === null) {
      console.log("❌ Select a song first");
      return;
    }

    playSong(currentSong);
    return;
  }


  // PAUSE
  if (userInput === "pause") {

    if (childProcess) {
      childProcess.kill("SIGSTOP");
      console.log("⏸️ Song paused");
    } else {
      console.log("❌ No song is playing");
    }

    return;
  }


  // RESUME
  if (userInput === "resume") {

    if (childProcess) {
      childProcess.kill("SIGCONT");
      console.log("▶️ Song resumed");
    } else {
      console.log("❌ No song is playing");
    }

    return;
  }


  // STOP
  if (userInput === "stop") {

    if (childProcess) {

      childProcess.kill();
      childProcess = null;

      console.log("⏹️ Song stopped");

    } else {

      console.log("❌ No song is playing");

    }

    return;
  }


  // NEXT
  if (userInput === "next") {

    if (currentSong === null) {
      console.log("❌ Select a song first");
      return;
    }


    if (currentSong === songs.length) {
      console.log("❌ This is the last song");
      return;
    }


    currentSong = currentSong + 1;

    playSong(currentSong);

    return;
  }


  // PREVIOUS
  if (userInput === "previous") {

    if (currentSong === null) {
      console.log("❌ Select a song first");
      return;
    }


    if (currentSong === 1) {
      console.log("❌ This is the first song");
      return;
    }


    currentSong = currentSong - 1;

    playSong(currentSong);

    return;
  }


  // SONG NUMBER
  const songNumber = Number(userInput);

  playSong(songNumber);
});


function playSong(songNumber) {

  if (
    isNaN(songNumber) ||
    songNumber < 1 ||
    songNumber > songs.length
  ) {
    console.log("❌ Invalid song number");
    return;
  }


  currentSong = songNumber;

  const song = songs[songNumber - 1];

  console.log(`\n▶️ Playing: ${song.split(".")[0]}`);


  if (childProcess) {
    childProcess.kill();
  }


  childProcess = spawn("afplay", [`${path}/${song}`]);


  childProcess.on("close", () => {
    console.log("✅ Song finished");
  });
}