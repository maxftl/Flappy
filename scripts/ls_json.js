import * as  fs from 'fs';

if(process.argv.length !== 3) {
    console.error("exactly 1 argument required");
    process.exit(1);
}

const filename = process.argv[2];

fs.readdir(filename, {}, (err, files) => {
    if(err) {
        console.error(err);
        return;
    }
    const nonHiddenFiles = files.filter( (file) => !file.startsWith("."));
    console.log(JSON.stringify(nonHiddenFiles));
});