import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Auth from "../../utils/auth";

function FindGame() {
  // create state for holding searched games
  const [searchedGames, setSearchedGames] = useState([]);

    // show all games
    const gamesList = () => {
        const games = () => {
            fetch('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&oddsFormat=american&apiKey=86b8c8f2a4d55411e2cf0c32aa4c1800')
            .then(response => response.json())
            .then(data => console.log('This is the response', data))
        };

        const gamesArr = games();

        const gamesData = gamesArr.map(data => ({
            gameId: games.id,
            homeTeam: games.home_team,
            awayTeam: games.away_team
        }));

        setSearchedGames(gamesData);

    };

    return (
        <>
            <Container>
                {gamesList((game) => {
                    return (
                        <Card key={game.gameId} border='dark'>
                            <Card.Body>
                                <Card.Text>{game.awayTeam}
                                    `at`
                                    {game.homeTeam}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                        className='btn-block btn-info'
                                        // click switches to BetGame page
                                        onClick={() => FindGame(game.gameId)}>
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </Container>
        </>
    )
};

export default FindGame;
