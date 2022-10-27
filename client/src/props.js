import React from "react";
import List from "./components/List";
import burgerKing from "./images/burger_king.png"
import starbucks from "./images/starbucks.png"
import kfc from "./images/kfc.png"
import jco from "./images/jco.png"

//Import Components

function Props() {
  return (
    // Code Inside div
    <div>
      <List name="Burger King" image={burgerKing} />
      <List name="Starbucks" image={starbucks} />
      <List name="KFC" image={kfc} />
      <List name="J.co" image={jco} />
    </div>
  );
}

export default Props;