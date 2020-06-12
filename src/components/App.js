import React, {useReducer, useEffect} from "react";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const api_key = '59e4ef5ea7b47fe41a91a4d52abb74fd';
const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

const initialState = {
	loading: false,
	movies: [],
	errorMessage: null
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_MOVIES_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null
			};
		case "SEARCH_MOVIES_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload
			};
		case "SEARCH_MOVIES_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error
			};
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(MOVIE_API_URL)
		.then(response => response.json())
		.then(jsonResponse => {
			//console.log(jsonResponse.results)
			dispatch({
				type: "SEARCH_MOVIE_SUCCESS",
				payload: jsonResponse.results
			});
		});
	}, []);

	const search = searchValue => {
		dispatch({
			type: "SEARCH_MOVIES_REQUEST"
		});

		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchValue}`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.success === undefined) {
					dispatch({
						type: "SEARCH_MOVIES_SUCCESS",
						payload: jsonResponse.results
					});
				} else {
					dispatch({
						type: "SEARCH_MOVIES_FAILURE",
						error: jsonResponse.status_message
					});
				}
			});
	};

	const {movies, errorMessage, loading} = state;

	return (
  	<div className="container">
			<Header text="MovieSearch" />
			<p className="App-intro">Find your favorite movies!</p>
			<Search search={search} />
			<div className="movies">
				{loading && !errorMessage ? 
					( <span>loading...</span>) : 
					errorMessage ? 
					( <div className="errorMessage">
							{errorMessage}
						</div> ) :
					( movies.map((movie, index) => (
						<Movie 
							key={`${index}-${movie.title}`} 
							movie={movie} />	
					))
				)}
			</div>
    </div>
  )
}

export default App;
