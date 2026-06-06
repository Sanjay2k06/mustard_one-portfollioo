import fs from 'fs';

function getMP4Duration(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const mvhdOffset = fileBuffer.indexOf('mvhd');
  if (mvhdOffset === -1) {
    console.log("Could not find mvhd atom");
    return;
  }

  const version = fileBuffer[mvhdOffset + 4];
  let timescale, duration;

  if (version === 0) {
    timescale = fileBuffer.readUInt32BE(mvhdOffset + 16);
    duration = fileBuffer.readUInt32BE(mvhdOffset + 20);
  } else if (version === 1) {
    timescale = fileBuffer.readUInt32BE(mvhdOffset + 24);
    // duration is 64-bit, let's read the lower 32-bit for simplicity as duration fits in it
    duration = fileBuffer.readUInt32BE(mvhdOffset + 32); 
  }

  console.log(`Version: ${version}`);
  console.log(`Timescale: ${timescale}`);
  console.log(`Duration: ${duration}`);
  console.log(`Duration in seconds: ${duration / timescale}`);
}

getMP4Duration('video_images/splashpage.mp4');
