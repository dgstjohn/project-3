import React from "react";
import { Link, useParams } from 'react-router-dom';


// import FindGame from "./FindGame"

function BetGame() {
    const { id } = useParams();


    return(
          <>
          {console.log(id)}

        'This is placeholder text!!!'
        
        
        </>

        )
    // if (bookmakers.title === "FanDuel") {
    //     // create two cards with bookmakers.markets.outcomes

    // }
}

export default BetGame;