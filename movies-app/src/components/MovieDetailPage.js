/** @format */

import { useEffect, useState } from "react";
function MovieDetailPage(props) {
    useEffect(() => {
        const imdbId = props.match.params.imdbId;
        fetchMovieDetailsById(imdbId);
    }, []);

    const [movieDetail, setMovieDetail] = useState({});

    const fetchMovieDetailsById = (movieId) => {
        const movieDetailsUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=d0cda79`;

        fetch(movieDetailsUrl)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setMovieDetail(result);
            });
    };

    return (
        <div class="container">
            <div className="row justify-content-center">
                <div className="col col-lg-6 mt-5">
                    <div className="text-center">
                        <img src={movieDetail.Poster} />
                        <h1 class="mt-3">{movieDetail.Title}</h1>
                    </div>
                    <table class="table table-hover mt-3">
                        <tbody>
                            <tr>
                                <th scope="row">Plot</th>
                                <td>{movieDetail.Plot}</td>
                            </tr>
                            <tr>
                                <th scope="row">Director</th>
                                <td>{movieDetail.Director}</td>
                            </tr>
                            <tr>
                                <th scope="row">Writer</th>
                                <td>{movieDetail.Writer}</td>
                            </tr>
                            <tr>
                                <th scope="row">Actors</th>
                                <td>{movieDetail.Actors}</td>
                            </tr>
                            <tr>
                                <th scope="row">Awards</th>
                                <td>{movieDetail.Awards}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default MovieDetailPage;
