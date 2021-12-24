import { useState } from 'react'

function MovieListPage() {

    const [searchTerm, setSearchTerm] = useState('');

    const [movies, setMovies] = useState([])

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const fetchMovies = (movieName) => {
        const searchUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=d0cda79`

        fetch(searchUrl)
        .then(response => response.json())
            .then(result => {
                setMovies(result.Search)
        })
    }


    const movieItems = movies.map(movie => {
        return (
            <div>
                <img src={movie.Poster} />
                <h3>{movie.Title}</h3>
            </div>
        )
    })

    return (
        <div>
            <h1>Movie list page</h1>
            Search: <input type="text" onChange={ handleSearchTermChange } />
            <button onClick={() => fetchMovies(searchTerm)}>Search</button>
            {movieItems}
        </div>
    )
}

export default MovieListPage