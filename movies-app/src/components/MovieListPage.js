/** @format */

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function MovieListPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const [movies, setMovies] = useState([]);

    const [noMoviesFound, setNoMoviesFound] = useState(false);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearResults = () => {
        localStorage.removeItem("searchTerm");
        setMovies([]);
        setSearchTerm("");
    };

    useEffect(() => {
        // get movie from local storage
        let term = localStorage.getItem("searchTerm");
        if (term) {
            fetchMovies(term);
        }
    }, []);

    const fetchMovies = (movieName) => {
        const searchUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=d0cda79`;

        // put movie name in local storage
        localStorage.setItem("searchTerm", movieName);

        fetch(searchUrl)
            .then((response) => response.json())
            .then((result) => {
                if (result.Error) {
                    setMovies([]);
                    setNoMoviesFound(true);
                } else {
                    console.log(result)
                    setMovies(result.Search);
                    setNoMoviesFound(false);
                }
            });
    };

    const movieItems = movies.map((movie) => {
        return (
            <div class="col" key={movie.imdbID}>
                <div class="card shadow-sm">
                    <img src={movie.Poster === "N/A" ? "/missing_movie.jpg" : movie.Poster} class="bd-placeholder-iomg card-img-top" alt={movie.Title}/>
                    <div class="card-body">
                        <h4 class="card-text">{movie.Title}</h4>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <NavLink to={`/${movie.imdbID}`}>
                                    <button class="btn btn-sm btn-outline-secondary"> Details </button>{" "}
                                </NavLink>{" "}
                            </div>
                            <small class="text-muted">Year: {movie.Year}</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Movie Search</h1>
                        <p class="lead text-muted">We want to help you find the right movie. Start a search and see what you'll be watching tonight!</p>
                        <p>
                            <input type="text" onChange={handleSearchTermChange} placeholder="ex. Batman" />
                        </p>
                        <p>
                            <button class="btn btn-primary my-2 me-2" onClick={() => fetchMovies(searchTerm)}> Search </button>
                            <button class="btn btn-secondary my-2" onClick={clearResults}> Clear results </button>
                        </p>
                    </div>
                </div>
            </section>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {movieItems}
                    </div>
                </div>
            </div>


            {noMoviesFound ? <h1> No movies found </h1> : null}{" "}

        </div>
    );
}

export default MovieListPage;
