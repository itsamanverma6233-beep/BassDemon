const { spawn } = require("child_process");
const fs = require("fs");

// Songs folder
const path = "./songs";

// This will store the currently playing song process
let childProcess = null;

// Get all mp3 files from songs folder
const songs = fs.readdirSync(path).filter((song) => {
  return song.endsWith(".mp3");
});

// Show welcome message
console.log("\n🎵 Welcome to Songs App 🎵\n");

// Show all songs
for (let i = 0; i < songs.length; i++) {
  console.log(`${i + 1}. ${songs[i].split(".")[0]}`);
}

console.log("\nEnter song number to play:");


// Take input from terminal
process.stdin.setEncoding("utf-8");

process.stdin.on("data", (input) => {

  // Remove \n from input
  const songNumber = Number(input.trim());

  playSong(songNumber);
});


// Function to play song
function playSong(songNumber) {

  // Check whether song number is valid
  if (songNumber < 1 || songNumber > songs.length || isNaN(songNumber)) {
    console.log("❌ Invalid song number");
    return;
  }

  // Get song name
  const song = songs[songNumber - 1];

  console.log(`\n▶️ Playing: ${song.split(".")[0]}`);

  // Stop previous song if one is already playing
  if (childProcess) {
    childProcess.kill();
  }

  // Start afplay
  childProcess = spawn("afplay", [`${path}/${song}`]);

  // This runs when afplay process ends
  childProcess.on("close", () => {
    console.log("✅ Song finished");
  });
}