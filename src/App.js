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
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [movieDetails, setResponse] = useState('');

    const notify = () => toast("Added to favourites !");
    const notifyRemove = () => toast("Removed from favourites :(")

    const getMovieRequest = async (searchValue) => {
        require('dotenv').config()
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
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
        require('dotenv').config()
        let url = `http://www.omdbapi.com/?t=${movie['Title']}&apikey=${process.env.REACT_APP_API_KEY}`;
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
