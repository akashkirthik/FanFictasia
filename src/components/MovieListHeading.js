import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css'

const MovieListHeading = (props) => {

    return (
        <div className='col '>
            <div className='row '>
                <h1 >{props.heading}</h1>
				<Link to="/"  >
                    <h1 className={'navbarLinks'}><a>Home</a></h1>

				</Link>
				<Link to="/fav" >
                    <h1 className={'navbarLinks'}><a>Favourites</a></h1>

				</Link>


            </div>

        </div>
    );
};

export default MovieListHeading;
