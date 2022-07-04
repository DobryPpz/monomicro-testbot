const fs = require('fs/promises');
const path = require("path");

const getMedian = arr => {
    const a = arr.slice().sort((a,b) => a-b);
    if(a.length & 1 == 0) return (a[a.length/2-1]+a[a.length/2])/2;
    else return a[Math.floor(a.length/2)];
}

const parseText = async (...filenames) => {
    let durations = [];
    for(let f of filenames){
        const data = JSON.parse(await fs.readFile(path.join(__dirname,f)));
        durations = durations.concat(data["data"].map(a => a.duration));
    }
    const median = getMedian(durations);
    return median;
}

parseText("10usersdecreasing.json","10usersgame.json","10usersincreasing.json","10userslogin.json",
"10usersmenu.json","10usersplayer.json","10usersregister.json","10userssettings.json")
.then(res => {
    console.log(res);
});

parseText("50usersdecreasing.json","50usersgame.json","50usersincreasing.json","50userslogin.json",
"50usersmenu.json","50usersplayer.json","50usersregister.json","50userssettings.json")
.then(res => {
    console.log(res);
});