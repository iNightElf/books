import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from "./searchBar";

import logo from './img/loading.gif';
import img1 from './img/no-thumbnail.jpg';
import './app.css';

export default function App() {
	const [ results, setResults ] = useState([]);
	const [ query, setQuery ] = useState('');
	const [ loading, setLoading ] = useState(false);

	useEffect(
		() => {
			getResults();
		},
		[query]
	);

	const getResults = async () => {
		setLoading(true);

		const response = await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${query}=ebooks&key=AIzaSyA1TwEGbJpyAQfo_XCB2iZ3QMBkjxvVgto`,
			{timeout:5000}
		);

		setResults(response.data.items);
		setLoading(false);
		
	};


	const handleSearch = (event) => {
		event.preventDefault();
		setQuery(document.querySelector(".validate").value);
		document.querySelector('.validate').value = '';
	};

	return (
		<div className="container">
			<SearchBar handleSearch = {handleSearch}/>

			<div className="row">
				
				{query === '' ? (

					<h5 className="col l12 m12 s12">
						Please type a Book name Or Author name
					</h5>

				) : loading ? (

					<img className="loading" src={logo} alt="Thumbnail"/>

				) : results ? (

					results.map((result) => (

						<div className="col l6 m6 s12" key={result.id}>

							<div className="card horizontal" style={{ height: '285px' }}>

								<div className="card-image">
									<img
										style={{ height: '210px', width: '160px' }}
										src={
											result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : img1
										}
										alt="Spinner"
									/>
								</div>

								<div className="card-stacked" style={{ height: '250px' }}>
									<div className="card-content cardCon">
										<div className="header" style={{ fontSize: '14px' }}>
											<strong>{result.volumeInfo.title}</strong>
										</div>
										<p style={{ fontSize: '12px' }}>
											<strong>By: </strong>
											{result.volumeInfo.authors ? 
											result.volumeInfo.authors : 'Unknown'}
										</p>
										<p style={{ fontSize: '12px' }}>
											<strong>Publisher: </strong>
											{result.volumeInfo.publisher ? 
											result.volumeInfo.publisher : 'Unknown'}
										</p>
									</div>

									<div className="card-action">
										<a
											className="waves-effect waves-light btn-small"
											href={result.volumeInfo.canonicalVolumeLink}
											target="_blank"
											rel="noopener noreferrer"
										>
											See the Book
										</a>
									</div>

								</div>

							</div>

						</div>
					))

				) : (

					<h5 className="col l12 m12 s12">
						Please enter valid book name or author name
					</h5>

				)}

			</div>

		</div>
	);
}
