const { spawn } = require("child_process");
const fs = require("fs");

const path = "./songs";

let childProcess = null;

// Store current song number
let currentSong = null;

const songs = fs.readdirSync(path).filter((song) => {
  return song.endsWith(".mp3");
});


console.log("\n🎵 Welcome to Songs App 🎵\n");

for (let i = 0; i < songs.length; i++) {
  console.log(`${i + 1}. ${songs[i].split(".")[0]}`);
}

console.log("\nCommands:");
console.log("Enter a number → Select song");
console.log("play → Play current song");


process.stdin.setEncoding("utf-8");

process.stdin.on("data", (input) => {

  const userInput = input.trim();


  // If user types play
  if (userInput === "play") {

    if (currentSong === null) {
      console.log("❌ Select a song first");
      return;
    }

    playSong(currentSong);
    return;
  }


  // Otherwise convert input into number
  const songNumber = Number(userInput);

  playSong(songNumber);
});


function playSong(songNumber) {

  if (songNumber < 1 || songNumber > songs.length || isNaN(songNumber)) {
    console.log("❌ Invalid song number");
    return;
  }


  // Remember current song
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