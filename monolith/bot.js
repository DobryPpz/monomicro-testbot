const { performance, PerformanceObserver } = require("perf_hooks");
const axios = require("axios");
const fs = require("fs/promises");
const uniqid = require("uniqid");
const path = require("path");

const serverPath = "http://212.182.26.143:8080";

const results = {
    "data": []
};

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach(async (entry) => {
    results.data.push(entry);
  })
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

const Users = [];

class User{
    constructor(){
        this.intervalId = null;
        this.token = null;
        this.username = null;
        this.password = null;
    }
    simulateUse = () => {
        performance.mark("menu-start");
        axios.get(`${serverPath}/menu`,{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("menu-end");
            performance.measure("menu","menu-start","menu-end");
        })
        .catch(err => {
            //console.log("wejście do menu error");
        });
        performance.mark("decreasing-start");
        axios.get(`${serverPath}/score/decreasing`,{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("decreasing-end");
            performance.measure("decreasing","decreasing-start","decreasing-end");
        })
        .catch(err => {
            //console.log("wejście do decreasing error");
        });
        performance.mark("increasing-start");
        axios.get(`${serverPath}/score/increasing`,{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("increasing-end");
            performance.measure("increasing","increasing-start","increasing-end");
        })
        .catch(err => {
            //console.log("wejście do increasing error");
        });
        performance.mark("player-start");
        axios.get(`${serverPath}/score/player`,{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("player-end");
            performance.measure("player","player-start","player-end");
        })
        .catch(err => {
            //console.log("wejście do player error");
        });
        performance.mark("menu-start");
        axios.get(`${serverPath}/menu`,{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("menu-end");
            performance.measure("menu","menu-start","menu-end");
        })
        .catch(err => {
            //console.log("wejście do menu error");
        });
        performance.mark("settings-start");
        axios.post(`${serverPath}/settings/save`,{
            "skincolor": "#FFFFFF",
            "bulletcolor": "#FFFFFF",
            "deathsound": "deathsounddefault.wav",
            "shootsound": "shootsounddefault.wav"
        },{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("settings-end");
            performance.measure("settings","settings-start","settings-end");
        })
        .catch(err => {
            //console.log("zapis settings error");
        });
        performance.mark("menu-start");
        axios.get(`${serverPath}/menu`,{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("menu-end");
            performance.measure("menu","menu-start","menu-end");
        })
        .catch(err => {
            //console.log("wejście do menu error");
        });
        performance.mark("game-start");
        axios.post(`${serverPath}/game`,{
            "socketid": ""
        },{
            headers: {
                "x-access-token": this.token
            }
        })
        .then(response => {
            performance.mark("game-end");
            performance.measure("game","game-start","game-end");
        })
        .catch(err => {
            //console.log("wejście do gry error");
        });
    }
    register = async () => {
        this.username = uniqid();
        this.password = "w";
        performance.mark("register-start");
        await axios.post(`${serverPath}/auth/signup`,{
            "username": this.username,
            "password": this.password
        })
        .then(response => {
            performance.mark("register-end");
            performance.measure("register","register-start","register-end");
        })
        .catch(err => {
            //console.log("register error");
        });
    }
    login = async () => {
        performance.mark("login-start")
        await axios.post(`${serverPath}/auth/signin`,{
            "username": this.username,
            "password": this.password
        })
        .then(response => {
            performance.mark("login-end");
            performance.measure("login","login-start","login-end");
            this.token = response.data["x-access-token"];
            //console.log(this.token);
        })
        .catch(err => {
            //console.log("login error");
        });
    }
    start = () => {
        this.intervalId = setInterval(this.simulateUse,1000);
    }
    stop = () => {
        clearInterval(this.intervalId);
    }
}

const initiate = async () => {
    for(let i=0;i<10;i++){
        const u = new User;
        Users.push(u);
        await u.register();
        await u.login();
    }
}

initiate().then(() => {
    for(let u of Users){
        u.start();
    }
    setTimeout(async () => {
        for(let u of Users){
            u.stop();
        }
        await fs.writeFile(path.join(__dirname,"10users.json"),JSON.stringify(results))
    },30000);
});





