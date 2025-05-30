const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Create a simple SVG with the CircuitBoard icon
const svg = `
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 12H22M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12M22 12L18 12M6 12L2 12" stroke="#06B6D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="#06B6D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// Ensure the public directory exists
const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Convert SVG to PNG and save as favicon
sharp(Buffer.from(svg))
  .resize(32, 32)
  .toFile(path.join(publicDir, "favicon.ico"))
  .then(() => {
    console.log("Favicon generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating favicon:", err);
  });

// Also create an Apple touch icon
sharp(Buffer.from(svg))
  .resize(180, 180)
  .toFile(path.join(publicDir, "apple-touch-icon.png"))
  .then(() => {
    console.log("Apple touch icon generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating Apple touch icon:", err);
  });
