// async function getsongs(){

//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text()
//     let div=document.createElement("div")
//     div.innerHTML=response
//     let anchs=div.getElementsByTagName("a")
//     let songs=[]
//     for (let index = 0; index < anchs.length; index++) {
//         const element = anchs[index]
//         if (element.href.endsWith(".mp3")){
//             songs.push(element.href)
//         }
//     }
//     return songs

// }    
// let fsongs
// let currentsong=new Audio()

// function formatTime(seconds) {
//     if (isNaN(seconds)){
//         return "00:00"
//     }
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
//     return formattedMinutes + ':' + formattedSeconds;
// }
// async function main(){
//     fsongs =await getsongs()
//     let songsul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
//     for (let i of fsongs) {
//         let song=i.split("/songs/")[1]
//         song=song.replaceAll("%20"," ")
//         song=song.replaceAll(".mp3","")
//         songsul.innerHTML=songsul.innerHTML+`<li>
//         <img src="/Svgs/music.svg" alt="">
//         <div class="info">
//         <div>${song}</div>
//         </div>
//         <div class="playnow">
//         <span>Play Now</span>
//         <img src="/Svgs/liplay.svg" alt="">
//         </div>
//         </li>`
//     }    
//     let left=document.querySelector(".left")
//     let hamburger=document.querySelector(".hamburger")
//     let cross=document.querySelector(".cross")
//     cross.addEventListener("click",()=>{
//         left.style.left="-100%"
//     })    
//     hamburger.addEventListener("click",() => {
//         left.style.left="0%"
//     })
//     let songduration=document.querySelector(".songduration")

//     //  attach event listener to the list of songs in left section...
//     let arrayofsongs=Array.from(document.querySelector(".songlist").getElementsByTagName("li"))
//     arrayofsongs.forEach((li) => {
//         li.addEventListener("click",() => {
//             playmusic(li.querySelector(".info").firstElementChild.innerHTML+".mp3")         
//         })    
//     })    

//     // Add first song to the playbar 
//     disfs(arrayofsongs[0].querySelector(".info").innerText+".mp3")
//     currentsong.addEventListener("loadedmetadata", () => {
//         songduration.innerHTML = `00:00/${formatTime(currentsong.duration)}`;
//     });
    

//     let previous=document.getElementById("previous")
//     let next=document.getElementById("next")
//     let play=document.getElementById("play")

//     // attach event listener to play next and previous buttons
//     play.addEventListener("click",() => {
//         if (currentsong.paused){
//             currentsong.play()
//             play.src="/Svgs/stop.svg"
//         }
//         else{
//             currentsong.pause()
//             play.src="/Svgs/pause.svg"
//         }
//     })
//     next.addEventListener("click",() => {
//         let index=fsongs.indexOf(currentsong.src)
//         if (index==fsongs.length-1){
//             let r=fsongs[0].split("/songs/")[1]
//             playmusic(r)
//         }
//         else{
//             let r=fsongs[index+1].split("/songs/")[1]
//             playmusic(r)
//         }
//     })
//     previous.addEventListener("click",() => {
//         let index=fsongs.indexOf(currentsong.src)
//         if (index==0){
//             let r=fsongs[fsongs.length-1].split("/songs/")[1]
//             playmusic(r)
//         }
//         else{
//             let r=fsongs[index-1].split("/songs/")[1]
//             playmusic(r)
//         }
//     })



//     // Listen for timeupdate event
//     currentsong.addEventListener("timeupdate",() => {
//         if (formatTime(currentsong.duration)!="00:00"){
//             songduration.innerHTML=`${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
//         }
//         document.querySelector(".seekbar .circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
//     })

//     // add event listener to the seekbar 
//     document.querySelector(".seekbar").addEventListener("click",(e) => {
//         let p =(e.offsetX/e.target.getBoundingClientRect().width)*100
//         document.querySelector(".seekbar .circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
//         currentsong.currentTime=p*currentsong.duration/100
//     })
//     // add event to the volume range type
    
    
//     let range=document.querySelector(".rangeofvol").getElementsByTagName("input")[0]

//     let volsvg=document.querySelector(".volume img")
//     range.addEventListener("change",(eventobj) => {
//         let value=eventobj.target.value
//         currentsong.volume=value/100
//         if (value==0){
//             volsvg.src="/Svgs/mute.svg"
//         }
//         else{
//             volsvg.src="/Svgs/volume.svg"

//         }
        
//     })

// }    

// function disfs(link){playmusic(link)
//     currentsong.pause() 
//     play.src="/Svgs/pause.svg"
// }

// function playmusic(trackk){
//     currentsong.src="/songs/"+trackk
//     currentsong.play()
//     play.src="/Svgs/stop.svg"
//     let songname=document.querySelector(".songname")
//     trackk=trackk.replaceAll("%20"," ")
//     songname.innerHTML=trackk.replaceAll(".mp3","")
// }
// main()
// // 






















let currentfolder
let fsongs
let currentsong=new Audio()
async function getsongs(currentfolder){
    let a = await fetch(`http://127.0.0.1:3000/songs/${currentfolder}/`)
    let response = await a.text()
    let div=document.createElement("div")
    div.innerHTML=response
    let anchs=div.getElementsByTagName("a")
    let songs=[]
    for (let index = 0; index < anchs.length; index++) {
        const element = anchs[index]
        if (element.href.endsWith(".mp3")){
            songs.push(element.href)
        }
    }
    return songs
}    
function formatTime(seconds) {
    if (isNaN(seconds)){
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return formattedMinutes + ':' + formattedSeconds;
}
async function main(){
    currentfolder="punjabi"
    fsongs =await getsongs(currentfolder)
    let songsul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (let i of fsongs) {
        let song=i.split(`${currentfolder}/`)[1]
        song=song.replaceAll("%20"," ")
        song=song.replaceAll(".mp3","")
        songsul.innerHTML=songsul.innerHTML+`<li>
        <img src="/Svgs/music.svg" alt="">
        <div class="info">
        <div>${song}</div>
        </div>
        <div class="playnow">
        <span>Play Now</span>
        <img src="/Svgs/liplay.svg" alt="">
        </div>
        </li>`
    }    
    let left=document.querySelector(".left")
    let hamburger=document.querySelector(".hamburger")
    let cross=document.querySelector(".cross")
    cross.addEventListener("click",()=>{
        left.style.left="-100%"
    })    
    hamburger.addEventListener("click",() => {
        left.style.left="0%"
    })
    let songduration=document.querySelector(".songduration")

    //  attach event listener to the list of songs in left section...
    let arrayofsongs=Array.from(document.querySelector(".songlist").getElementsByTagName("li"))
    arrayofsongs.forEach((li) => {
        li.addEventListener("click",() => {
            playmusic(li.querySelector(".info").firstElementChild.innerHTML+".mp3")         
        })    
    })    

    // Add first song to the playbar 
    disfs(arrayofsongs[0].querySelector(".info").innerText+".mp3")
    currentsong.addEventListener("loadedmetadata", () => {
        songduration.innerHTML = `00:00/${formatTime(currentsong.duration)}`;
    });
    

    let previous=document.getElementById("previous")
    let next=document.getElementById("next")
    let play=document.getElementById("play")

    // attach event listener to play next and previous buttons
    play.addEventListener("click",() => {
        if (currentsong.paused){
            currentsong.play()
            play.src="/Svgs/stop.svg"
        }
        else{
            currentsong.pause()
            play.src="/Svgs/pause.svg"
        }
    })
    next.addEventListener("click",() => {
        let index=fsongs.indexOf(currentsong.src)
        if (index==fsongs.length-1){
            let r=fsongs[0].split(`/songs/${currentfolder}/`)[1]
            playmusic(r)
        }
        else{
            let r=fsongs[index+1].split(`/songs/${currentfolder}/`)[1]
            playmusic(r)
        }
    })
    previous.addEventListener("click",() => {
        let index=fsongs.indexOf(currentsong.src)
        if (index==0){
            let r=fsongs[fsongs.length-1].split(`/songs/${currentfolder}/`)[1]
            playmusic(r)
        }
        else{
            let r=fsongs[index-1].split(`/songs/${currentfolder}/`)[1]
            playmusic(r)
        }
    })



    // Listen for timeupdate event
    currentsong.addEventListener("timeupdate",() => {
        if (formatTime(currentsong.duration)!="00:00"){
            songduration.innerHTML=`${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
        }
        document.querySelector(".seekbar .circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
    })

    // add event listener to the seekbar 
    document.querySelector(".seekbar").addEventListener("click",(e) => {
        let p =(e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".seekbar .circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
        currentsong.currentTime=p*currentsong.duration/100
    })
    // add event to the volume range type
    
    
    let range=document.querySelector(".rangeofvol").getElementsByTagName("input")[0]

    let volsvg=document.querySelector(".volume img")
    range.addEventListener("change",(eventobj) => {
        let value=eventobj.target.value
        currentsong.volume=value/100
        if (value==0){
            volsvg.src="/Svgs/mute.svg"
        }
        else{
            volsvg.src="/Svgs/volume.svg"

        }
        
    })
    range.addEventListener("change", (eventobj) => {
        let value = eventobj.target.value;
        currentsong.volume = value / 100;
        if (value == 0) {
            volsvg.src = "/Svgs/mute.svg";
        } else {
            volsvg.src = "/Svgs/volume.svg";
        }
    });
    document.querySelector(".seekbar").addEventListener("click", (ev) => {
        let p = (ev.offsetX / ev.target.getBoundingClientRect().width) * 100;
        console.log(p)
        document.querySelector(".circle").style.left = p + "%";
        currentsong.currentTime = p * currentsong.duration / 100;
    });

}    

function disfs(link){
    playmusic(link)
    currentsong.pause() 
    play.src="/Svgs/pause.svg"
}

function playmusic(trackk){
    currentsong.src=`/songs/${currentfolder}/`+trackk
    currentsong.play()
    play.src="/Svgs/stop.svg"
    let songname=document.querySelector(".songname")
    trackk=trackk.replaceAll("%20"," ")
    songname.innerHTML=trackk.replaceAll(".mp3","")
}
main()