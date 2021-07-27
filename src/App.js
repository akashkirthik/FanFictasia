import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal'

const App = () => {
    const [movies, setMovies] = useState([
            {
                "Title": "The Avengers",
                "Year": "2012",
                "imdbID": "tt0848228",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Endgame",
                "Year": "2019",
                "imdbID": "tt4154796",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Infinity War",
                "Year": "2018",
                "imdbID": "tt4154756",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Age of Ultron",
                "Year": "2015",
                "imdbID": "tt2395427",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
            },
            {
                "Title": "The Avengers",
                "Year": "1998",
                "imdbID": "tt0118661",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
            },
            {
                "Title": "The Avengers: Earth's Mightiest Heroes",
                "Year": "2010–2012",
                "imdbID": "tt1626038",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
            },
            {
                "Title": "Ultimate Avengers: The Movie",
                "Year": "2006",
                "imdbID": "tt0491703",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg"
            },
            {
                "Title": "Ultimate Avengers II",
                "Year": "2006",
                "imdbID": "tt0803093",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            },
            {
                "Title": "The Avengers",
                "Year": "1961–1969",
                "imdbID": "tt0054518",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers Assemble",
                "Year": "2012–2019",
                "imdbID": "tt2455546",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg"
            }
        ],
        
    );
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [movieDetails, setResponse] = useState('');

    const notify = () => toast("Added to favourites !");
    const notifyRemove = () => toast("Removed from favourites :(")

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6fc0e00`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            console.log(responseJson)
            setMovies(responseJson.Search);
        }
    };


    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        console.log(JSON.stringify(items))
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };
    const displayDetails = async (movie) => {
        let url = `http://www.omdbapi.com/?t=${movie['Title']}&apikey=6fc0e00`;
        url = url.replaceAll(" ", "%20");
        // console.log(url);
        const response = await fetch(url);
        const responseJson = await response.json();
        // console.log(responseJson);
        setResponse(responseJson);
        setOpenModal(!openModal);
    }
    const toggleModal = () => {
        setOpenModal(!openModal);
    }
    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        notify();
        saveToLocalStorage(newFavouriteList);
    };
    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        notifyRemove();

        saveToLocalStorage(newFavouriteList);
    };

    return (
        <div className='container-fluid movie-app'>
            <ToastContainer/>

            <Router>

                <Route path="/" exact>
                    <div className='row d-flex align-items-center mt-4 mb-4 '>
                        <MovieListHeading heading='FanFictasia'/>
                        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
                    </div>
                    <div className='row '>
                        <MovieList
                            movies={movies}
                            handleDisplayDetails={displayDetails}
                            handleFavouritesClick={addFavouriteMovie}
                            favouriteComponent={AddFavourites}
                        />
                    </div>
                    {openModal && <Modal movieDetails={movieDetails} toggleModal={toggleModal}/>}
                </Route>

                <Route exact path='/fav'>
                    <div className='row d-flex align-items-center mt-4 mb-4'>
                        <MovieListHeading heading='FanFictasia'/>

                    </div>
                    <div className='row'>
                        <MovieList
                            movies={favourites}
                            handleDisplayDetails={displayDetails}
                            handleFavouritesClick={removeFavouriteMovie}
                            favouriteComponent={RemoveFavourites}
                        />
                        {openModal && <Modal movieDetails={movieDetails} toggleModal={toggleModal}/>}
                    </div>
                </Route>
            </Router>
        </div>
    );
};

export default App;
