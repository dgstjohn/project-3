import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Auth from "../../utils/auth";

function FindGame() {
    // create state for holding searched games
    const [searchedGames, setSearchedGames] = useState([]);
    useEffect(() => {
        games()
    }, [])
    const games = () => {
        fetch('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&oddsFormat=american&apiKey=86b8c8f2a4d55411e2cf0c32aa4c1800')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const gameData = data.map(data => ({
                    gameId: data.id,
                    homeTeam: data.home_team,
                    awayTeam: data.away_team
                }));
                setSearchedGames(gameData)
            })
    };

    const handleSubmit = (gameId) => {
        window.location.href = '/betGame/'+gameId
    }

    // show all games
    // const gamesList = () => {


    //     // const gamesArr = games();
    //     // console.log(gamesArr)

    //     // const gamesData = games.map(data => ({
    //     //     gameId: games.id,
    //     //     homeTeam: games.home_team,
    //     //     awayTeam: games.away_team
    //     // }));

    //     // setSearchedGames(gamesData);

    // };

    return (
        <>
            <Container>
                {searchedGames.map(game => {
                    return (
                        <Card key={game.gameId} border='dark'>
                            <Card.Body>
                                <Card.Text>{game.awayTeam} at {game.homeTeam}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                        className='btn-block btn-info'
                                        // click switches to BetGame page
                                        onClick={() => handleSubmit(game.gameId)}>
                                            Bet This Game!
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </>
    )
};
    
export default FindGame;
