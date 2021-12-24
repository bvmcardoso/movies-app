import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'



function MovieListPage() {
    
    const [searchTerm, setSearchTerm] = useState('');

    const [movies, setMovies] = useState([])

    const [noMoviesFound, setNoMoviesFound] = useState(false)

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const clearResults = () => {
        localStorage.removeItem("searchTerm")
        setMovies([])
        setSearchTerm('')
        
    }

    useEffect(() => {
        // get movie from local storage
        let term = localStorage.getItem("searchTerm")
        if (term) {
            fetchMovies(term)
        }
    }, [])

    const fetchMovies = (movieName) => {
        const searchUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=d0cda79`

        // put movie name in local storage
        localStorage.setItem("searchTerm", movieName)

        fetch(searchUrl)
        .then(response => response.json())
            .then(result => {

                if (result.Error) {
                    setMovies([])
                    setNoMoviesFound(true)
                }
                else {
                    setMovies(result.Search)
                    setNoMoviesFound(false)
                }
                
        })
    }


    const movieItems = movies.map(movie => {
        return (
            <div key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} />
                <br/>
                <NavLink to={`/${movie.imdbID}`}>
                    <button>Details</button>
                </NavLink>
            </div>
        )
    })

    return (
        <div>
            <h1>Movie list page</h1>
            Search: <input type="text" onChange={ handleSearchTermChange } />
            <button onClick={() => fetchMovies(searchTerm)}>Search</button>
            <button onClick={clearResults}>Clear results</button>
            {movieItems}

            {noMoviesFound ? <h1>No movies found</h1> : null}
        </div>
    )
}

export default MovieListPage