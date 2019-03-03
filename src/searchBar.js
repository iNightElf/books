import React from 'react'

const SearchBar = (props) => {
  return (
    <div>
            <h1>Book Finder</h1>
			<form onSubmit={props.handleSearch}>
				<div className="searchBox">
					<input type="text" className="validate"/>
					<button type="submit" className="waves-effect waves-light btn-small">
						Search Books
					</button>
				</div>
		    </form>
    </div>
  )
}

export default SearchBar


