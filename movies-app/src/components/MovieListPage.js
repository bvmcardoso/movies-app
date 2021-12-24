import { useState } from 'react'

function MovieListPage() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const fetchMovies = (movieName) => {
        const searchUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=d0cda79`

        fetch(searchUrl)
        .then(response => response.json())
            .then(result => {
            console.log(result)
        })
    }

    return (
        <div>
            <h1>Movie list page</h1>
            Search: <input type="text" onChange={ handleSearchTermChange } />
            <button onClick={ ()=> fetchMovies(searchTerm) }>Search</button>
        </div>
    )
}

export default MovieListPage