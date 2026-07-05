/*=========================================
MOROCCO EXPERIENCE
PARTE 1
=========================================*/


//-------------------------------
// VARIABLES
//-------------------------------

const screens = document.querySelectorAll(".screen");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


//-------------------------------
// LOADER
//-------------------------------

window.addEventListener("load", function(){

    const loader =
    document.getElementById("loader");

    if(loader){

        setTimeout(function(){

            loader.classList.add("hidden");

        },2000);

    }

});


//-------------------------------
// CAMBIAR PANTALLAS
//-------------------------------

function showScreen(screenId){

    console.log("showScreen() llamado con:", screenId);

    screens.forEach(function(screen){

        screen.classList.remove("active");

    });

    const selected =
    document.getElementById(screenId);

    console.log("Elemento encontrado para", screenId, ":", selected);

    if(selected){

        selected.classList.add("active");

    } else {

        console.error("¡NO SE ENCONTRÓ el elemento con id:", screenId, "! Revisa que el HTML tenga ese id exacto.");

    }

    requestAnimationFrame(function(){

        window.scrollTo({

            top:0,
            behavior:"auto"

        });

        console.log("Pantalla activa ahora:", document.querySelector(".screen.active") ? document.querySelector(".screen.active").id : "NINGUNA");

    });

}

window.addEventListener("error", function(e){
    console.error("ERROR GLOBAL CAPTURADO:", e.message, "en", e.filename, "línea", e.lineno);
});



//-------------------------------
// MÚSICA
//-------------------------------

if(musicBtn && bgMusic){

    musicBtn.addEventListener(

    "click",

    function(){

        if(musicPlaying){

            bgMusic.pause();

            musicBtn.innerHTML="🔇";

            musicPlaying=false;

        }

        else{

            bgMusic.play();

            musicBtn.innerHTML="🔊";

            musicPlaying=true;

        }

    });

}

//-------------------------------
// INICIAR MÚSICA EN EL PRIMER CLIC
//-------------------------------

document.addEventListener(

"click",

function(){

    if(bgMusic && bgMusic.paused){

        bgMusic.play().catch(()=>{});

        musicBtn.innerHTML="🔊";

        musicPlaying=true;

    }

},

{once:true}

);


//-------------------------------
// VISITANTES
//-------------------------------

function loadVisitors(){

    let visitors =
    localStorage.getItem(
    "moroccoVisitors"
    );

    if(!visitors){

        visitors =
        Math.floor(
        Math.random()*300
        )+200;

    }

    else{

        visitors =
        parseInt(visitors)+1;

    }

    localStorage.setItem(

    "moroccoVisitors",

    visitors

    );

    const number =
    document.getElementById(
    "visitorNum"
    );

    if(number){

        number.innerHTML =
        visitors;

    }

}

loadVisitors();



//-------------------------------
// MAPA
//-------------------------------

const cities={

rabat:{

icon:"🏛️",

title:"Rabat",

description:
"Rabat is the capital city of Morocco.",

fact:
"It became the capital in 1912."

},

casablanca:{

icon:"🕌",

title:"Casablanca",

description:
"Casablanca is Morocco's largest city.",

fact:
"The Hassan II Mosque is here."

},

marrakech:{

icon:"🌴",

title:"Marrakech",

description:
"The Red City of Morocco.",

fact:
"It is famous for its markets."

},

fez:{

icon:"🏰",

title:"Fez",

description:
"The cultural capital.",

fact:
"It has one of the oldest universities."

},

chefchaouen:{

icon:"💙",

title:"Chefchaouen",

description:
"The Blue Pearl of Morocco.",

fact:
"Known for its blue streets."

},

merzouga:{

icon:"🏜️",

title:"Merzouga",

description:
"Gateway to the Sahara.",

fact:
"Famous for camel rides."

}

};



//-------------------------------
// MOSTRAR CIUDAD
//-------------------------------

function showCityInfo(city){

    const data =
    cities[city];

    if(!data){

        return;

    }

    document.getElementById(
    "popupIcon"
    ).innerHTML=
    data.icon;

    document.getElementById(
    "popupCity"
    ).innerHTML=
    data.title;

    document.getElementById(
    "popupDesc"
    ).innerHTML=
    data.description;

    document.getElementById(
    "popupFact"
    ).innerHTML=
    data.fact;

    document.getElementById(
    "cityPopup"
    ).classList.remove(
    "hidden"
    );

    document.getElementById(
    "popupOverlay"
    ).classList.remove(
    "hidden"
    );

}



//-------------------------------
// CERRAR POPUP
//-------------------------------

function closeCityPopup(){

    document.getElementById(
    "cityPopup"
    ).classList.add(
    "hidden"
    );

    document.getElementById(
    "popupOverlay"
    ).classList.add(
    "hidden"
    );

}


console.log(
"PARTE 1 CARGADA"
);
/*=========================================
PARTE 2
QUIZ
=========================================*/


//---------------------------------
// VARIABLES
//---------------------------------

const quizQuestions = [

{
question:"What is the capital of Morocco?",
options:["Rabat","Cairo","Madrid"],
correct:0
},

{
question:"What is the official currency?",
options:["Euro","Moroccan Dirham","Dollar"],
correct:1
},

{
question:"Which desert is famous in Morocco?",
options:["Sahara","Gobi","Atacama"],
correct:0
},

{
question:"Which city is known as the Blue City?",
options:["Casablanca","Chefchaouen","Tangier"],
correct:1
},

{
question:"What is a famous Moroccan dish?",
options:["Sushi","Pizza","Couscous"],
correct:2
},

{
question:"What language is spoken in Morocco?",
options:["Arabic","Amazigh","Both"],
correct:2
},

{
question:"What color is the Moroccan flag?",
options:["Blue","Red with a green star","White"],
correct:1
},

{
question:"Morocco is located in:",
options:["Africa","Asia","Europe"],
correct:0
},

{
question:"Which mosque is one of the largest in the world?",
options:["Hassan II Mosque","Blue Mosque","Al-Aqsa Mosque"],
correct:0
},

{
question:"Morocco is famous for:",
options:["Carpets and traditional markets","Ice castles","Kangaroos"],
correct:0
}

];


let currentQuestion=0;
let score=0;


//---------------------------------
// INICIAR QUIZ
//---------------------------------

function startQuiz(){

currentQuestion=0;
score=0;

const quizBox=
document.getElementById("quizBox");

const quizResults=
document.getElementById("quizResults");

if(quizBox){

quizBox.classList.remove("hidden");

}

if(quizResults){

quizResults.classList.add("hidden");

}

const live=
document.getElementById("liveScore");

if(live){

live.innerHTML=0;

}

loadQuestion();

}



//---------------------------------
// CARGAR PREGUNTA
//---------------------------------

function loadQuestion(){

const q=
quizQuestions[currentQuestion];

document.getElementById(
"questionText"
).innerHTML=
q.question;

document.getElementById(
"questionCount"
).innerHTML=

"Question "
+(currentQuestion+1)
+" of "
+quizQuestions.length;


const options=
document.getElementById(
"optionsContainer"
);

options.innerHTML="";

q.options.forEach(

function(option,index){

const btn=
document.createElement(
"button"
);

btn.className=
"option-btn";

btn.innerHTML=
option;

btn.onclick=
function(){

answerQuestion(
index
);

};

options.appendChild(
btn
);

}

);


const progress=
document.getElementById(
"progressFill"
);

if(progress){

progress.style.width=

(
currentQuestion
/
quizQuestions.length
)

*100

+"%";

}

}



//---------------------------------
// RESPONDER
//---------------------------------

function answerQuestion(selected){

const correct=

quizQuestions[
currentQuestion
].correct;


if(selected===correct){

score++;

const live=
document.getElementById(
"liveScore"
);

if(live){

live.innerHTML=
score;

}

}


currentQuestion++;


setTimeout(function(){

if(

currentQuestion
<
quizQuestions.length

){

loadQuestion();

}

else{

showResults();

}

},500);

}



//---------------------------------
// RESULTADOS
//---------------------------------

function showResults(){

document.getElementById(
"quizBox"
).classList.add(
"hidden"
);

document.getElementById(
"quizResults"
).classList.remove(
"hidden"
);

document.getElementById(
"finalScore"
).innerHTML=

score

+"/10";


let emoji="";
let title="";
let msg="";

if(score<=4){

emoji="🏜️";
title="Explorer";
msg="You have started your journey!";

}

else if(score<=7){

emoji="🧭";
title="Traveler";
msg="Great job!";

}

else{

emoji="👑";
title="Morocco Expert";
msg="Excellent!";

}


document.getElementById(
"resultsEmoji"
).innerHTML=
emoji;

document.getElementById(
"resultsTitle"
).innerHTML=
title;

document.getElementById(
"resultsMsg"
).innerHTML=
msg;


const badge=
document.getElementById(
"rankBadge"
);

if(badge){

badge.innerHTML=
title;

}

}



//---------------------------------
// REINICIAR
//---------------------------------

function resetQuiz(){

currentQuestion=0;
score=0;

document.getElementById(
"progressFill"
).style.width="0%";

startQuiz();

}


console.log(
"PARTE 2 CARGADA"
);
/*=========================================
PARTE 3
LEADERBOARD
=========================================*/


//------------------------------------
// ABRIR MODAL
//------------------------------------

function saveScore(){

    const modal =
    document.getElementById(
    "saveModal"
    );

    const overlay =
    document.getElementById(
    "modalOverlay"
    );

    if(modal){

        modal.classList.remove(
        "hidden"
        );

    }

    if(overlay){

        overlay.classList.remove(
        "hidden"
        );

    }

}



//------------------------------------
// CERRAR MODAL
//------------------------------------

function closeModal(){

    const modal =
    document.getElementById(
    "saveModal"
    );

    const overlay =
    document.getElementById(
    "modalOverlay"
    );

    if(modal){

        modal.classList.add(
        "hidden"
        );

    }

    if(overlay){

        overlay.classList.add(
        "hidden"
        );

    }

}



//------------------------------------
// GUARDAR PUNTUACIÓN
//------------------------------------

function confirmSaveScore(){

    const input =
    document.getElementById(
    "playerName"
    );

    if(!input){

        return;

    }

    const player =
    input.value.trim();

    if(player===""){

        alert(
        "Please enter your name."
        );

        return;

    }

    let rank="";

    if(score<=4){

        rank="Explorer";

    }

    else if(score<=7){

        rank="Traveler";

    }

    else{

        rank="Morocco Expert";

    }


    let ranking =

    JSON.parse(

    localStorage.getItem(
    "moroccoRanking"
    )

    )

    ||

    [];


    ranking.push({

        name:player,

        score:score,

        rank:rank

    });


    ranking.sort(

    function(a,b){

        return b.score-a.score;

    }

    );


    ranking=

    ranking.slice(
    0,
    10
    );


    localStorage.setItem(

    "moroccoRanking",

    JSON.stringify(
    ranking
    )

    );


    input.value="";

    closeModal();

    loadRanking();

}



//------------------------------------
// CARGAR RANKING
//------------------------------------

function loadRanking(){

    const rankList=

    document.getElementById(
    "rankList"
    );

    const empty=

    document.getElementById(
    "emptyRank"
    );

    if(!rankList){

        return;

    }

    rankList.innerHTML="";


    let ranking=

    JSON.parse(

    localStorage.getItem(
    "moroccoRanking"
    )

    )

    ||

    [];


    if(ranking.length===0){

        if(empty){

            empty.classList.remove(
            "hidden"
            );

        }

        return;

    }

    else{

        if(empty){

            empty.classList.add(
            "hidden"
            );

        }

    }


    ranking.forEach(

    function(player,index){

        let medal="";

        if(index===0){

            medal="🥇";

        }

        else if(index===1){

            medal="🥈";

        }

        else if(index===2){

            medal="🥉";

        }

        else{

            medal="#" +
            (index+1);

        }


        const item=

        document.createElement(
        "div"
        );

        item.className=
        "rank-item";


        item.innerHTML=

        `

        <div class="rank-position">

        ${medal}

        </div>

        <div class="rank-name">

        ${player.name}

        </div>

        <div class="rank-score">

        ${player.score}/10

        </div>

        <div class="rank-badge-sm">

        ${player.rank}

        </div>

        `;


        rankList.appendChild(
        item
        );

    }

    );

}



//------------------------------------
// BORRAR RANKING
//------------------------------------

function clearRanking(){

    const ok=

    confirm(

    "Delete all rankings?"

    );

    if(!ok){

        return;

    }

    localStorage.removeItem(

    "moroccoRanking"

    );

    loadRanking();

}



//------------------------------------
// CARGAR AL INICIO
//------------------------------------

loadRanking();


console.log(

"PARTE 3 CARGADA"

);
/*=========================================
PARTE 4
CERTIFICADO + QR + CONFETI
=========================================*/


//------------------------------------
// ÚLTIMO JUGADOR
//------------------------------------

let lastPlayerName = "";



//------------------------------------
// MODIFICAR GUARDAR SCORE
//------------------------------------

const oldConfirmSaveScore =
confirmSaveScore;

confirmSaveScore = function(){

    const input =
    document.getElementById(
    "playerName"
    );

    if(input){

        lastPlayerName =
        input.value.trim();
    }

    oldConfirmSaveScore();

};




//------------------------------------
// GENERAR CERTIFICADO
//------------------------------------

function generateCert(){

    const input =
    document.getElementById(
    "certName"
    );

    if(input){

        if(input.value.trim()===""
        &&
        lastPlayerName!==""){

            input.value =
            lastPlayerName;

        }

    }

    const player =

    input.value.trim();

    if(player===""){

        alert(
        "Please enter your name."
        );

        return;

    }

    document.getElementById(
    "certNameDisplay"
    ).innerHTML=
    player;


    const today =
    new Date();

    const date =

    today.toLocaleDateString(

    "en-US",

    {

    year:"numeric",
    month:"long",
    day:"numeric"

    }

    );

    document.getElementById(
    "certDate"
    ).innerHTML=
    date;


    document.getElementById(
    "certificateDisplay"
    ).classList.remove(
    "hidden"
    );

}



//------------------------------------
// IMPRIMIR
//------------------------------------

function printCert(){

    window.print();

}



//------------------------------------
// QR
//------------------------------------

function createQR(){

    const qr =

    document.getElementById(
    "qrCode"
    );

    if(!qr){

        return;

    }

    qr.innerHTML="";


    const img =
    document.createElement(
    "img"
    );

    img.src=

    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://visitmorocco.com";

    img.style.width=
    "180px";

    img.style.height=
    "180px";

    qr.appendChild(
    img
    );

}

createQR();




//------------------------------------
// CONFETI
//------------------------------------

function launchConfetti(){

    for(

    let i=0;

    i<150;

    i++

    ){

        let confetti =

        document.createElement(
        "div"
        );

        confetti.className=
        "confetti";

        confetti.style.left=

        Math.random()*100

        +"vw";

        confetti.style.animationDuration=

        (Math.random()*3+2)

        +"s";

        confetti.style.opacity=

        Math.random();

        confetti.style.transform=

        "rotate("+

        Math.random()*360+

        "deg)";

        document.body.appendChild(
        confetti
        );


        setTimeout(function(){

            confetti.remove();

        },5000);

    }

}



//------------------------------------
// MODIFICAR RESULTADO
//------------------------------------

const oldShowResults =
showResults;

showResults=function(){

    oldShowResults();

    if(score>=8){

        launchConfetti();

    }

};




console.log(
"PARTE 4 CARGADA"
);
