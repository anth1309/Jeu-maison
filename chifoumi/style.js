const choice = document.querySelectorAll(".icone .choice");
const playerId = "MA CHERIE";
const resultView = document.querySelector(".result");
const stopOrAgain = document.querySelector(".stopOrAgain");
const upButton = document.querySelector(".icone");
const stopAgain = document.querySelectorAll(".stopOrAgain button");
const scoreView = document.querySelector(".score");
let result = "";
let score = 0;
let play = true;
////
///
//while (play === true) {
// console.log("essais" + play);

for (let i = 0; i < choice.length; i++) {
  upButton.classList.remove("hidden");
  choice[i].addEventListener("click", () => {
    const player = choice[i].name;
    const bot = choice[Math.floor(Math.random() * choice.length)].name;
    if (bot === player) {
      result = "egalité";
    } else if (
      (player === "PIERRE" && bot == "CISEAUX") ||
      (player === "FEUILLE" && bot == "PIERRE") ||
      (player === "CISEAUX" && bot == "FEUILLE")
    ) {
      result = `Félicitation ${playerId} tu as gagné`;
      score++;
    } else {
      result = `Désolé ${playerId} tu as perdu`;
    }

    stopOrAgain.classList.add("visible");
    resultView.classList.add("visible");
    resultView.innerHTML = `Tu as joué ${player}<br>
     bot a joué ${bot}<br>
    ${result} `;
    upButton.classList.add("hidden");
    //
    ////
    /////

    for (let i = 0; i < 2; i++) {
      stopAgain[i].addEventListener("click", () => {
        const stop = stopAgain[i].innerHTML;
        console.log(stop);
        if (stop === "CONTINUER") {
          upButton.classList.remove("hidden");
          stopOrAgain.classList.remove("visible");
          resultView.classList.remove("visible");
          play = true;
        } else {
          stopOrAgain.classList.remove("visible");
          resultView.classList.remove("visible");

          scoreView.innerHTML = `Tu as obtenu ${score} points Au revoir ${playerId}`;
          scoreView.classList.add("visible");
          upButton.classList.add("hidden");
          play = false;
        }
        console.log(`play = ${play} ${score}`);
      });
    }
  });
}
//}

//upButton.animate(
//   [
//     // étapes/keyframes
//     { transform: "translateY(10px)" },
//     { transform: "translateY(-500px)" },
//   ],
//   {
//     // temporisation
//     duration: 9000,
//     iterations: Infinity,
