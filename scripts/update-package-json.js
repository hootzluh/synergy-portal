// Update package.json to add SASS compilation script
const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the sass script if it doesn't exist
if (!packageJson.scripts.sass) {
  packageJson.scripts.sass = "node scripts/compile-sass.js";
  
  // Add a combined script for development with SASS watching
  packageJson.scripts["start:with-sass"] = "npm run sass && npm start";
  
  // Add a build script that includes SASS compilation
  packageJson.scripts["build:with-sass"] = "npm run sass && npm run build";
  
  // Write the updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  
  console.log('Added SASS scripts to package.json');
} else {
  console.log('SASS scripts already exist in package.json');
}
