import React, {useState} from "react";

const Search = (props) => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchInputChanges = (e) => {
		setSearchValue(e.target.value);
	}

	const resetInputField = () => {
		setSearchValue("");
	}

	const callSearchFunction = (e) => {
		if (searchValue === '') {
			return ;
		}
		e.preventDefault();
		props.search(searchValue);
		resetInputField();
	}

	return (
		<form className="search">
			<label htmlFor="title" className="label">Title:</label>
			<input
				value={searchValue}
				onChange={handleSearchInputChanges}
				type="text"
				id="title"
				placeholder="i.e. Jurassic Park"
			/>
			<input 
				onClick={callSearchFunction} 
				type="submit" 
				value="SEARCH" 
				className="search__btn"
			/>
		</form>
	);
}

export default Search;
