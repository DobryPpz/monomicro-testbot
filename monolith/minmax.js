const fs = require('fs/promises');
const path = require("path");

const parseText = async () => {
    const text = await fs.readFile(path.join(__dirname,"5000users.json"));
    const obj = JSON.parse(text);
    const min = Math.min.apply(null, obj["data"].map(a => a["duration"]));
    const max = Math.max.apply(null, obj["data"].map(a => a["duration"]));
    return [min,max];
}


parseText().then(o => {
    console.log(o);
});