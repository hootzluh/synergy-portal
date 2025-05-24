// Compile SASS to CSS
const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const outputDir = path.join(__dirname, '../src/styles');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Compile main.scss to main.css
try {
  const result = sass.compile(path.join(__dirname, '../src/styles/sass/main.scss'), {
    style: 'compressed',
    sourceMap: true
  });
  
  fs.writeFileSync(
    path.join(outputDir, 'main.css'),
    result.css
  );
  
  console.log('SASS compilation successful!');
} catch (error) {
  console.error('SASS compilation failed:', error);
}
