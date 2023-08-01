const casino = () => {
  const numbers = document.querySelectorAll(".section-numbers");
  const zero = document.querySelector("#zero");
  const casinoChoice = document.querySelector("#casino-choice");
  const clientTotalAmount = document.querySelector("#amount");
  const value = document.querySelector("#value");
  let chipClone;
  let chip;
  let userChoice = "";
  let cpuAnswers = [];
  let userBet;
  let savedChip;
  const bets = {
    color: { coef: 2, variants: ["black", "red"] },
    number: { coef: 35, maxNum: 36 },
    type: { coef: 2, variants: ["even", "odd"] },
    dozen: { coef: 3, variants: ["1-12", "13-24", "25-36"] },
    half: { coef: 2, variants: ["1-18", "19-36"] },
  };
  clientTotalAmount.textContent = JSON.parse(localStorage.getItem("clientTotalAmount")) || 10000
  
  const makeCurrentChip = () => {
    const chipsImg = document.querySelectorAll(".img-chip-bet");
    let bet = document.querySelector("#bet");

    for (const el of chipsImg) {
      el.addEventListener("click", function () {
        userBet = Number(el.parentNode.innerText);
        if (userBet > +clientTotalAmount.innerText) {
          value.style.cssText = "color: red;";
          value.innerText = "Not Enough Money";
          return;
        }
        if (savedChip && savedChip !== el)
          savedChip.style.cssText = "width: 100%;";
        savedChip = el;
        el.style.cssText = "width: 140%;";
        chip = el;
        bet.innerText = "Bet:";
        bet.innerText += " " + userBet;
      });
      el.addEventListener("mouseover", function () {
        el.style.cssText = "width: 140%;";
      });
      el.addEventListener("mouseout", function () {
        el.style.cssText = "width: 100%;";
        if (savedChip) savedChip.style.cssText = "width: 140%;";
      });
    }
  };
  makeCurrentChip();

  function setChipOnBoard() {
    value.innerText = "";
    if (!chip) {
      console.log("Choose your bet");
    } else if (!userChoice.length) {
      if (chipClone) {
        chipClone.style.cssText = "display: none;";
      }
      userChoice = this.innerText.toLowerCase();
      chip.style.cssText = "display: block;";
      casinoChoice.style.cssText = "display: none;";
      chipClone = chip.cloneNode(true);
      chipClone.style.cssText = "width: 53px;";
      this.prepend(chipClone);
    }
    if (savedChip) savedChip.style.cssText = "width: 140%;";
    return;
  }

  const getCpuAnswers = (number) => {
    number = number.toString();
    cpuAnswers.push(number);
    if (number === 0) {
      cpuAnswers.push("0");
    }
    if (number % 2 === 0 && number !== 0) {
      cpuAnswers.push("black");
      cpuAnswers.push("even");
    }
    if (number % 2 !== 0) {
      cpuAnswers.push("red");
      cpuAnswers.push("odd");
    }
    if (number > 0 && number < 13) {
      cpuAnswers.push("1-12");
    }
    if (number > 12 && number < 24) {
      cpuAnswers.push("13-24");
    }
    if (number > 24 && number < 37) {
      cpuAnswers.push("25-36");
    }
    if (number > 0 && number < 19) {
      cpuAnswers.push("1-18");
    }
    if (number > 18 && number < 37) {
      cpuAnswers.push("19-36");
    }
    return cpuAnswers;
  };

  const addClick = () => {
    const sectionUp = document.querySelectorAll(".section-up");
    const sectionDown = document.querySelectorAll(".section-down");

    const helper = (data) => {
      if (!Boolean(data.length)) data.addEventListener("click", setChipOnBoard);
      else {
        for (const el of data) {
          el.addEventListener("click", setChipOnBoard);
        }
      }
    };
    helper(sectionUp);
    helper(sectionDown);
    helper(numbers);
    helper(zero);
  };
  addClick();

  const makeColor = () => {
    for (const el of numbers) {
      el.addEventListener("click", setChipOnBoard);
      if (el.textContent % 2 === 0) {
        el.style.cssText = "background-color: black; color: white;";
      } else {
        el.style.cssText = "background-color: red; color: white;";
      }
    }
  };
  makeColor();

  const play = (bet) => {
    const cpuChoice = Math.floor(Math.random() * 37);
    let amount = +clientTotalAmount.textContent;
    let winAmount = 0;
    let winOut = document.querySelector("#win");

    if (savedChip) savedChip.style.cssText = "width: 140%;";
    winOut.innerText = "Win: ";
    getCpuAnswers(cpuChoice);

    for (const el of numbers) {
      if (el.innerText == cpuChoice) {
        el.prepend(casinoChoice);
      }
    }
    if (zero.innerText == cpuChoice) zero.prepend(casinoChoice);
    casinoChoice.style.cssText = "display: block;";
    if (cpuAnswers.includes(userChoice)) {
      if (userChoice.length < 3) {
        winAmount = bet * bets.number.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      } else if (userChoice === 0) {
        winAmount = bet * bets.number.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      } else if (
        userChoice === bets.type.variants[0] ||
        userChoice === bets.type.variants[1]
      ) {
        winAmount = bet * bets.type.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      } else if (
        userChoice === bets.color.variants[0] ||
        userChoice === bets.color.variants[1]
      ) {
        winAmount = bet * bets.color.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      } else if (
        userChoice === bets.color.variants[0] ||
        userChoice === bets.color.variants[1]
      ) {
        winAmount = bet * bets.color.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      } else if (
        userChoice === bets.half.variants[0] ||
        userChoice === bets.half.variants[1]
      ) {
        winAmount = bet * bets.half.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      } else if (
        userChoice === bets.dozen.variants[0] ||
        userChoice === bets.dozen.variants[1] ||
        userChoice === bets.dozen.variants[2]
      ) {
        winAmount = bet * bets.dozen.coef;
        winOut.innerText += " " + winAmount;
        amount = amount + winAmount;
      }
      value.innerText = "YOU WIN";
      value.style.cssText = "color: green;";
    } else {
      amount = amount - bet;
      winOut.innerText += " " + winAmount;
      value.innerText = "YOU LOSE";
      value.style.cssText = "color: red;";
    }
    localStorage.setItem("clientTotalAmount", amount);
    clientTotalAmount.textContent = amount;
  };

  const game = () => {
    if (!userChoice.length) {
      console.log("Make your choice");
      return;
    }
    play(userBet);
    userChoice = "";
    cpuAnswers = [];
  };

  const manageButtons = () => {
    let button = document.querySelector(".btn");
    button.addEventListener("click", game);

    let buttonReset = document.querySelector("#btn-reset");
    buttonReset.addEventListener("click", makeColor);
    buttonReset.addEventListener("click", function () {
      chip.style.cssText = "display: block;";
      chipClone.style.cssText = "display: none;";
      casinoChoice.style.cssText = "display: none;";
      if (savedChip) savedChip.style.cssText = "width: 140%;";
    });
  };
  manageButtons();
};

casino();
