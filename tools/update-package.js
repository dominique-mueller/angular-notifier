const fs = require('fs');

console.log('Update package.json info ...');

// Read both package.json files
const rootPackageJson = JSON.parse(fs.readFileSync('./package.json').toString());
const distPackageJson = JSON.parse(fs.readFileSync('./dist/angular-notifier/package.json').toString());

// Update dist package.json file with some info from root package.json file
const keys = ['description', 'version', 'license', 'repository', 'keywords', 'peerDependencies'];
keys.forEach((key) => {
  distPackageJson[key] = rootPackageJson[key];
});

// Write updated package.json file
fs.writeFileSync('./dist/angular-notifier/package.json', JSON.stringify(distPackageJson, null, '  '));

console.log('Done.');
