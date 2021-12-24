import { useEffect, useState} from 'react'
function MovieDetailPage(props) {
    
    useEffect(() => {
        const imdbId = props.match.params.imdbId
        fetchMovieDetailsById(imdbId)
    }, [])

    const [movieDetail, setMovieDetail] = useState({})

    const fetchMovieDetailsById = (movieId) => {
        const movieDetailsUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=d0cda79`

        fetch(movieDetailsUrl)
        .then(response => response.json())
            .then(result => {
                console.log(result)
                setMovieDetail(result)
        })
    }

    return (
        <div>
            <img src={ movieDetail.Poster }/>
            <h5>{movieDetail.Title}</h5>
            <p>{movieDetail.Plot}</p>
            <p>Released:{movieDetail.Released}</p>
            <p>Director: {movieDetail.Director }</p>
            <p>Writer: {movieDetail.Writer}</p>
            <p>Actors: {movieDetail.Actors}</p>
            <p>Awards: {movieDetail.Awards}</p>
        </div>

    )
}

export default MovieDetailPage