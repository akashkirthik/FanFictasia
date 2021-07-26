import React from 'react';
function validMovie(movie){


    console.log(movie["Plot"]);
    return movie["Poster"].length>3;


}
const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    let filteredMovies=props.movies.filter(validMovie)

    return (
        <>
            {filteredMovies.map((movie, index) => (

                <div onClick={() => props.handleDisplayDetails(movie["Title"])} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt={movie} />
                    <div
                        onClick={() => props.handleFavouritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouriteComponent/>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
