import * as React from "react";
import Layout from "../components/layout";
import Button from "../components/button";
import * as Styles from "../components/styles.module.css";
import { StaticImage } from "gatsby-plugin-image";

var letters = [
  "letter.a",
  "letter.b",
  "letter.c",
  "letter.d",
  "letter.e",
  "letter.f",
  "letter.g",
  "letter.h",
  "letter.i",
  "letter.j",
  "letter.k",
  "letter.l",
  "letter.m",
  "letter.n",
  "letter.o",
  "letter.p",
  "letter.q",
  "letter.r",
  "letter.s",
  "letter.t",
  "letter.u",
  "letter.v",
  "letter.w",
  "letter.x",
  "letter.y",
  "letter.z",
];
const pokemonData = require("/json/pokemon.json");
var secretPokemon;
var mistakesLeft;
var guess = [];

const IndexPage = () => {
  React.useEffect(() => {
    generatePokemon();
    mistakesLeft = 5;
    generateGuessBlock();
  });
  return (
    <Layout>
      <div id="welcome">
        <h1 className={Styles.heading}>Pokémon Guesser!</h1>
        <div className={Styles.description}>
          I'm thinking of a Gen 1 Pokémon. Can you guess it with less than 5
          mistakes?
          <br /> <br />
        </div>
        <div className={Styles.mistakeCounter} id="mistakeCounter">
          You have 5 mistakes remaining.
        </div>
        <br /> <br />
      </div>
      <div id="quiz">
        <div className={Styles.quizQuestion}>Guess a letter: </div>
        <br />
        <div>
          <Button
            name="letterButtons"
            value="a"
            id="letter.a"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="b"
            id="letter.b"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="c"
            id="letter.c"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="d"
            id="letter.d"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="e"
            id="letter.e"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="f"
            id="letter.f"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="g"
            id="letter.g"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="h"
            id="letter.h"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="i"
            id="letter.i"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="j"
            id="letter.j"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="k"
            id="letter.k"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="l"
            id="letter.l"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="m"
            id="letter.m"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="n"
            id="letter.n"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="o"
            id="letter.o"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="p"
            id="letter.p"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="q"
            id="letter.q"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="r"
            id="letter.r"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="s"
            id="letter.s"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="t"
            id="letter.t"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="u"
            id="letter.u"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="v"
            id="letter.v"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="w"
            id="letter.w"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="x"
            id="letter.x"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="y"
            id="letter.y"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <Button
            name="letterButtons"
            value="z"
            id="letter.z"
            onClick={buttonPressed}
            className={Styles.button}
          />
          <br />
        </div>
        <br />
      </div>
      <br />
      <br />
      <div className={Styles.pokemonBody} id="pokemonBody"></div>
      <div className={Styles.result} id="result"></div>
      <br />
      <Button
        name="resetButton"
        value="New game"
        id="resetButton"
        onClick={resetPage}
        className={Styles.button}
      />
      <br />
      <br />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Pokémon Guesser</title>;

function buttonPressed(e) {
  e.target.className = Styles.buttonSelected;
  e.target.disabled = true;
  var matchFound = false;

  for (let i = 0; i < secretPokemon.name.length; i++) {
    if (secretPokemon.name.charAt(i) === e.target.value) {
      guess[i] = e.target.value;
      matchFound = true;
    }
  }

  if (!matchFound) {
    updateMistakesLeft();
  } else {
    updateGuessBlock();
  }
}

function resetPage(e) {
  generatePokemon();
  generateGuessBlock();
  resetMistakes();
  resetLetters();
  resetResult();
}

function resetResult() {
  document.getElementById("result").style.display = "none";
}

function generatePokemon() {
  secretPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
}

function disableLetters() {
  for (let i = 0; i < letters.length; i++) {
    document.getElementById(letters[i]).disabled = true;
  }
}

function updateMistakesLeft() {
  mistakesLeft--;

  if (mistakesLeft > 1) {
    document.getElementById("mistakeCounter").innerHTML =
      "You have " + mistakesLeft + " mistakes remaining.";
  } else if (mistakesLeft == 1) {
    document.getElementById("mistakeCounter").innerHTML =
      "You have 1 mistake remaining.";
  } else {
    displayLoss();
  }
}

function resetMistakes() {
  mistakesLeft = 5;
  document.getElementById("mistakeCounter").innerHTML =
    "You have 5 mistakes remaining.";
}

function resetLetters() {
  for (let i = 0; i < letters.length; i++) {
    document.getElementById(letters[i]).disabled = false;
    document.getElementById(letters[i]).className = Styles.button;
  }
}

function generateGuessBlock() {
  var b = "<br />";
  guess = [];
  for (let i = 0; i < secretPokemon.name.length; i++) {
    b += "_ ";
    guess.push("_");
  }
  document.getElementById("pokemonBody").innerHTML = b;
}

function updateGuessBlock() {
  var b = "<br />";
  for (let i = 0; i < guess.length; i++) {
    b += guess[i] + " ";
  }
  document.getElementById("pokemonBody").innerHTML = b;
  if (!guess.includes("_")) {
    displayWin();
  }
}

function displayLoss() {
  disableLetters();
  var resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML =
    "<br/>Better luck next time! I was thinking of " +
    secretPokemon.display +
    '. </br> <img src="https://www.serebii.net/pokemon/art/' +
    secretPokemon.number +
    '.png"/>';
  resultDiv.scrollIntoView();
}

function displayWin() {
  disableLetters();
  var resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML =
    "<br/>You win! I was thinking of " +
    secretPokemon.display +
    '. </br> <img src="https://www.serebii.net/pokemon/art/' +
    secretPokemon.number +
    '.png"/>';
  resultDiv.scrollIntoView();
}
