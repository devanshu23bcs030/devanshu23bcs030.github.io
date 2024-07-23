// let fsongs;
// let currentsong = new Audio();
// let currentfolder
// let volsvg = document.querySelector(".volume img");
// console.log(volsvg.src);

// async function getsongs(currentfolder) {
//     let a = await fetch(`http://127.0.0.1:3000/songs/${currentfolder}/`);
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchs = div.getElementsByTagName("a");
//     let songs = [];
//     for (let index = 0; index < anchs.length; index++) {
//         const element = anchs[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href);
//         }
//     }
//     return songs;
// }

// function formatTime(seconds) {
//     if (isNaN(seconds)) {
//         return "00:00";
//     }
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
//     return formattedMinutes + ':' + formattedSeconds;
// }
// async function displayalbums() {
//     let cardcontainer = document.querySelector(".cardcontainer")
//     // Code to display all the cards of albums.
//     let hello = await fetch(`http://127.0.0.1:3000/songs/`)
//     let text = await hello.text()
//     let div2 = document.createElement("div")
//     div2.innerHTML = text
//     let finalsongsas = Array.from(div2.getElementsByTagName("a"))
//     let folders = []
//     finalsongsas.forEach(element => {
//         if ((element.href).split("songs/")[1] != undefined) {
//             element = (element.href).split("songs/")[1]
//             element = element.replace("/", "")
//             folders.push(element)
//         }

//     });
//     // folders.forEach(async e=>{
//     //     let hell=await fetch(`http://127.0.0.1:3000/songs/${e}/info.json`)
//     //     let info=await hell.json()
//     //     cardcontainer.innerHTML=cardcontainer.innerHTML+`<div data-folder="${e}" class="card">
//     //                     <div id="image">
//     //                         <img src=${`http://127.0.0.1:3000/songs/${e}/cover.jpg`} alt="">
//     //                         <img class="svg" src="/Svgs/play.svg" alt="">
//     //                     </div>
//     //                     <h3>${e}  !</h3>
//     //                     <p>${info.description}</p>
//     //                 </div>`
//     // })
//     let array = folders
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];

//         let hell = await fetch(`http://127.0.0.1:3000/songs/${e}/info.json`)
//         let info = await hell.json()
//         cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${e}" class="card">
//         <div id="image">
//         <img src=${`http://127.0.0.1:3000/songs/${e}/cover.jpg`} alt="">
//         <img class="svg" src="/Svgs/play.svg" alt="">
//         </div>
//         <h3>${e}  !</h3>
//         <p>${info.description}</p>
//         </div>`
        

//     }


// }
// async function main() {


//     await displayalbums()

//     Array.from(document.getElementsByClassName("card")).forEach((card) => {
//         card.addEventListener("click", async () => {
//             currentfolder = card.dataset.folder;
//             fsongs = await getsongs(currentfolder);
//             let songsul = document.querySelector(".songlist ul");
//             songsul.innerHTML = "";
//             for (let i of fsongs) {
//                 let song = i.split(`${currentfolder}/`)[1];
//                 song = song.replaceAll("%20", " ");
//                 song = song.replaceAll(".mp3", "");
//                 let li = document.createElement("li");
//                 li.innerHTML = `
//                     <img src="/Svgs/music.svg" alt="">
//                     <div class="info">
//                         <div>${song}</div>
//                     </div>
//                     <div class="playnow">
//                         <span>Play Now</span>
//                         <img src="/Svgs/liplay.svg" alt="">
//                     </div>
//                 `;
//                 songsul.appendChild(li);

//             }

//             let arrayofsongs = Array.from(document.querySelectorAll(".songlist li"));
//             arrayofsongs.forEach((li) => {
//                 li.addEventListener("click", () => {
//                     playmusic(li.querySelector(".info").firstElementChild.innerHTML + ".mp3");
//                 });
//             });


//             // Add first song to the playbar 
//             disfs(arrayofsongs[0].querySelector(".info").innerText + ".mp3");
//         });
//     });

//     let left = document.querySelector(".left");
//     let hamburger = document.querySelector(".hamburger");
//     let cross = document.querySelector(".cross");
//     cross.addEventListener("click", () => {
//         left.style.left = "-100%";
//     });
//     hamburger.addEventListener("click", () => {
//         left.style.left = "0%";
//     });

//     let songduration = document.querySelector(".songduration");

//     currentsong.addEventListener("loadedmetadata", () => {
//         songduration.innerHTML = `00:00/${formatTime(currentsong.duration)}`;
//     });

//     let previous = document.getElementById("previous");
//     let next = document.getElementById("next");
//     let play = document.getElementById("play");

//     play.addEventListener("click", () => {
//         if (currentsong.paused) {
//             currentsong.play();
//             play.src = "/Svgs/stop.svg";
//         } else {
//             currentsong.pause();
//             play.src = "/Svgs/pause.svg";
//         }
//     });

//     next.addEventListener("click", () => {
//         let index = fsongs.indexOf(currentsong.src);
//         if (index == fsongs.length - 1) {
//             let r = fsongs[0].split(`songs/${currentfolder}/`)[1];
//             playmusic(r);
//         } else {
//             let r = fsongs[index + 1].split(`songs/${currentfolder}/`)[1];
//             playmusic(r);
//         }
//     });

//     previous.addEventListener("click", () => {
//         let index = fsongs.indexOf(currentsong.src);
//         if (index == 0) {
//             let r = fsongs[fsongs.length - 1].split(`songs/${currentfolder}/`)[1];
//             playmusic(r);
//         } else {
//             let r = fsongs[index - 1].split(`songs/${currentfolder}/`)[1];
//             playmusic(r);
//         }
//     });


//     let circle = document.querySelector(".circle");
//     currentsong.addEventListener("timeupdate", () => {
//         let time = currentsong.currentTime
//         let duration = currentsong.duration
//         let per = (time / duration) * 100
//         circle.style.left = `${per}%`
//         songduration.innerHTML = `${formatTime(time)}/${formatTime(duration)}`
//     })
//     let seekbar = document.querySelector(".seekbar");

    





//     let range = document.querySelector(".rangeofvol input");


//     range.addEventListener("change", (eventobj) => {
//         let value = eventobj.target.value;
//         currentsong.volume = value / 100;
//         if (value == 0) {
//             volsvg.src = "/Svgs/mute.svg";
//         } else {
//             volsvg.src = "/Svgs/volume.svg";
//         }
//     });
//     volsvg.addEventListener("click",() => {
//         console.log("Vol svg clicked")
//         if (volsvg.src == "http://127.0.0.1:3000/Svgs/volume.svg"){
//             volsvg.src = "http://127.0.0.1:3000/Svgs/mute.svg"
//             currentsong.volume=0
//             range.value=0
//         }
//         else{
//             volsvg.src = "http://127.0.0.1:3000/Svgs/volume.svg"
//             currentsong.volume=0.27
//             range.value=27
//         }
//     })
//     function disfs(link) {
//         playmusic(link);
//         currentsong.pause();
//         document.getElementById("play").src = "/Svgs/pause.svg";
//     }
//     function playmusic(trackk) {
//         currentsong.src = `/songs/${currentfolder}/${trackk}`;
//         currentsong.play();
//         document.getElementById("play").src = "/Svgs/stop.svg";
//         let songname = document.querySelector(".songname");
//         trackk = trackk.replaceAll("%20", " ");
//         songname.innerHTML = trackk.replaceAll(".mp3", "");
//     }
// }




// main();

let fsongs;
let currentsong = new Audio();
let currentfolder;
let volsvg = document.querySelector(".volume img");
console.log(volsvg.src);

async function getsongs(currentfolder) {
    let a = await fetch(`http://127.0.0.1:3000/songs/${currentfolder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchs = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < anchs.length; index++) {
        const element = anchs[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    return songs;
}

function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return formattedMinutes + ':' + formattedSeconds;
}

async function displayalbums() {
    let cardcontainer = document.querySelector(".cardcontainer");
    let hello = await fetch(`http://127.0.0.1:3000/songs/`);
    let text = await hello.text();
    let div2 = document.createElement("div");
    div2.innerHTML = text;
    let finalsongsas = Array.from(div2.getElementsByTagName("a"));
    let folders = [];
    finalsongsas.forEach(element => {
        if ((element.href).split("songs/")[1] != undefined) {
            element = (element.href).split("songs/")[1];
            element = element.replace("/", "");
            folders.push(element);
        }
    });

    let array = folders;
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        let hell = await fetch(`http://127.0.0.1:3000/songs/${e}/info.json`);
        let info = await hell.json();
        cardcontainer.innerHTML += `
            <div data-folder="${e}" class="card">
                <div id="image">
                    <img src=${`http://127.0.0.1:3000/songs/${e}/cover.jpg`} alt="">
                    <img class="svg" src="/Svgs/play.svg" alt="">
                </div>
                <h3>${e}  !</h3>
                <p>${info.description}</p>
            </div>`;
    }
}

async function main() {
    await displayalbums();

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        card.addEventListener("click", async () => {
            currentfolder = card.dataset.folder;
            fsongs = await getsongs(currentfolder);
            let songsul = document.querySelector(".songlist ul");
            songsul.innerHTML = "";
            for (let i of fsongs) {
                let song = i.split(`${currentfolder}/`)[1];
                song = song.replaceAll("%20", " ");
                song = song.replaceAll(".mp3", "");
                let li = document.createElement("li");
                li.innerHTML = `
                    <img src="/Svgs/music.svg" alt="">
                    <div class="info">
                        <div>${song}</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img src="/Svgs/liplay.svg" alt="">
                    </div>
                `;
                songsul.appendChild(li);
            }

            let arrayofsongs = Array.from(document.querySelectorAll(".songlist li"));
            arrayofsongs.forEach((li) => {
                li.addEventListener("click", () => {
                    playmusic(li.querySelector(".info").firstElementChild.innerHTML + ".mp3");
                });
            });

            // Add first song to the playbar 
            disfs(arrayofsongs[0].querySelector(".info").innerText + ".mp3");
        });
    });

    let left = document.querySelector(".left");
    let hamburger = document.querySelector(".hamburger");
    let cross = document.querySelector(".cross");
    cross.addEventListener("click", () => {
        left.style.left = "-100%";
    });
    hamburger.addEventListener("click", () => {
        left.style.left = "0%";
    });

    let songduration = document.querySelector(".songduration");

    currentsong.addEventListener("loadedmetadata", () => {
        songduration.innerHTML = `00:00/${formatTime(currentsong.duration)}`;
    });

    let previous = document.getElementById("previous");
    let next = document.getElementById("next");
    let play = document.getElementById("play");

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "/Svgs/stop.svg";
        } else {
            currentsong.pause();
            play.src = "/Svgs/pause.svg";
        }
    });

    next.addEventListener("click", () => {
        let index = fsongs.indexOf(currentsong.src);
        if (index == fsongs.length - 1) {
            let r = fsongs[0].split(`songs/${currentfolder}/`)[1];
            playmusic(r);
        } else {
            let r = fsongs[index + 1].split(`songs/${currentfolder}/`)[1];
            playmusic(r);
        }
    });

    previous.addEventListener("click", () => {
        let index = fsongs.indexOf(currentsong.src);
        if (index == 0) {
            let r = fsongs[fsongs.length - 1].split(`songs/${currentfolder}/`)[1];
            playmusic(r);
        } else {
            let r = fsongs[index - 1].split(`songs/${currentfolder}/`)[1];
            playmusic(r);
        }
    });

    let circle = document.querySelector(".circle");
    currentsong.addEventListener("timeupdate", () => {
        let time = currentsong.currentTime;
        let duration = currentsong.duration;
        let per = (time / duration) * 100;
        circle.style.left = `${per}%`;
        songduration.innerHTML = `${formatTime(time)}/${formatTime(duration)}`;
        if (time==duration){
            play.src = "/Svgs/pause.svg";

        }
    });

    let seekbar = document.querySelector(".seekbar");
    seekbar.addEventListener("click",(e)=>{

        let totalwidth=seekbar.clientWidth
        let clickwidth=e.offsetX
        currentsong.currentTime=currentsong.duration*clickwidth/totalwidth;
        let percentge=clickwidth/totalwidth*100
        console.log(percentge);
        circle.style.left=`${percentge}%`
    })
    
    // seekbar.addEventListener("click", (event) => {
    //     const seekbarWidth = seekbar.clientWidth;
    //     const clickPosition = event.offsetX;
    //     const newTime = (clickPosition / seekbarWidth) * currentsong.duration;
    //     currentsong.currentTime = newTime;
    // });

    let range = document.querySelector(".rangeofvol input");
    range.addEventListener("change", (eventobj) => {
        let value = eventobj.target.value;
        currentsong.volume = value / 100;
        if (value == 0) {
            volsvg.src = "/Svgs/mute.svg";
        } else {
            volsvg.src = "/Svgs/volume.svg";
        }
    });

    volsvg.addEventListener("click", () => {
        console.log("Vol svg clicked");
        if (volsvg.src == "http://127.0.0.1:3000/Svgs/volume.svg") {
            volsvg.src = "http://127.0.0.1:3000/Svgs/mute.svg";
            currentsong.volume = 0;
            range.value = 0;
        } else {
            volsvg.src = "http://127.0.0.1:3000/Svgs/volume.svg";
            currentsong.volume = 0.27;
            range.value = 27;
        }
    });

    function disfs(link) {
        playmusic(link);
        currentsong.pause();
        document.getElementById("play").src = "/Svgs/pause.svg";
    }

    function playmusic(trackk) {
        currentsong.src = `/songs/${currentfolder}/${trackk}`;
        currentsong.play();
        document.getElementById("play").src = "/Svgs/stop.svg";
        let songname = document.querySelector(".songname");
        trackk = trackk.replaceAll("%20", " ");
        songname.innerHTML = trackk.replaceAll(".mp3", "");
    }
}

main();
