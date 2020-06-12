import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({movie}) => {
	const poster =
		movie.poster_path === "N/A" ? 
			DEFAULT_PLACEHOLDER_IMAGE : 
			`http://image.tmdb.org/t/p/w200${movie.poster_path}`;
	const year = movie.release_date ?
		movie.release_date.slice(0, 4) :
		"?";
	const overview = movie.overview ? 
		movie.overview.split(' ').splice(0, 30).join(' ') + '...' :
		'';
	return (
		<div className="movie">
			<div>
				<img 
					width="200"
					alt={`The movie titled: ${movie.title}`}
					src={poster}
				/>
			</div>
			<div className="movie__text">
				<h2>{movie.title} <span>({year})</span></h2>
				<p>{overview}</p>
			</div>
		</div>
	);
};

export default Movie;
