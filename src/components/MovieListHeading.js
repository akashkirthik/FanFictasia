import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css'

const MovieListHeading = (props) => {

    return (
        <div className='col'>
            <div className='row'>


                <link href='https://fonts.googleapis.com/css?family=Caesar+Dressing' rel='stylesheet' type='text/css'/>
                <h1 className={'navbarSpan'}>{props.heading}</h1>

                <link href='https://fonts.googleapis.com/css?family=Amethysta' rel='stylesheet' type='text/css'/>
                <Link to="/">
                    <h1 className={'navbarLink'}>HOME</h1>

                </Link>
                <Link to="/fav">
                    <h1 className={'navbarLink'}>FAVOURITES</h1>

                </Link>


            </div>

        </div>
    );
};

export default MovieListHeading;
