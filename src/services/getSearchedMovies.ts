// http://www.omdbapi.com/?apikey=817eb860&s=inception
import { type MoviesResult } from "../types/movies"
const URL_BASE = 'http://www.omdbapi.com'
const API_KEY = '817eb860' // apikey should keep hidden in a .env file, this is just for demo purposes.
const SEARCH_MOVIES = `${URL_BASE}/?apikey=${API_KEY}`

export const getSearchedMovies = async (title: string): Promise<MoviesResult> => await (await fetch(`${SEARCH_MOVIES}&s=${title}`)).json()
