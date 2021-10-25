// temporary file to hold fetch calls for the ODDS API 
// until we can insert it into a page function

import { dotenv } from 'dotenv';

dotenv.config();

export const searchSport = (query) => {
  return fetch(process.env.SEARCH_SPORT);
};

export const searchOdds = (query) => {
  return fetch(process.env.SEARCH_ODDS);
}