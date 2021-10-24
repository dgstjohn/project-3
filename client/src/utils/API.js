// temporary file to hold fetch calls for the ODDS API 
// until we can insert it into a page function

import dotenv from 'dotenv';

export const searchSport = (query) => {
    return fetch(`https://api.the-odds-api.com/v4/sports?apiKey=YOUR_API_KEY(opens new window)`);
  };