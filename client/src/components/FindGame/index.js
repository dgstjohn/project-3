import React from "react";
import { Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';

const FindGame = () => {
    // create state for holding searched games
    const [searchedGames, setSearchedGames] = useState([]);

    // show all games
    const gamesList = () => {
        try {
            const response = await fetch(process.env.SEARCH_ODDS);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const { games } = await response.json();

            const gamesData = games.map((game) => ({
                gameId: game.id,
                homeTeam: game.home_team,
                awayTeam: game.away_team
            }));

            setSearchedGames(gamesData);
        } catch (err) {
            console.error(err)
        }
    };

    const chooseGame = () => {

    };

    return (
        <>
            <Container>
                <CardColumns>
                    {gamesList.map((game) => {
                        return (
                            <Card key={game.gameId} border='dark'>
                                <Card.Body>
                                    <Card.Text>{game.awayTeam}
                                        `at`
                                        {game.homeTeam}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            className='btn-block btn-info'
                                            // click switches to BetGame component
                                            onClick={() => chooseGame(game.gameId)}>
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
};

export default FindGame;