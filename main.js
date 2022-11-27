const button = document.querySelector('.button');
const selector = document.querySelector('#genres-select');
const movieBox = document.querySelector('.movie-box');

const movieImgDOM = document.querySelector('.movie-img');
const movieNameDOM = document.querySelector('.movie-name');
const movieTextDOM = document.querySelector('.movie-description');
const movieYearDOM = document.querySelector('.movie-year')




const key = '12aca90b542a30095c62620899490307';
const baseUrl = 'https://api.themoviedb.org/3';

async function getGenres() {
    const genresUrl = '/genre/movie/list';
    const additionalUrl = `?api_key=${key}&language=en-US`;
    const completeUrl = `${baseUrl}${genresUrl}${additionalUrl}`;

    try {
        const response = await fetch(completeUrl);
        if (response.ok) {
            const genresObj = await response.json();
            return genresObj;

        }
        throw new Error('network problem');
    } catch (er) {
        console.log(er)
    }
}

async function genresToWeb(fn) {
    const Obj = await fn;
    const genres = Obj['genres'];
    const arr = [];
    try {

    genres.forEach(element => {
        arr.push(`<option id='${element.name}' class='${element.id}'>${element.name}</option>`);
    });

    selector.innerHTML = `${arr.join(' ')}`;
    } catch (er) {
        console.log(er);
    }
}

function getChosenGenreId() {
    const value = selector.value;
    const domElement = document.getElementById(`${value}`);
    let id = domElement.attributes['class'].value;
    return id;
}




async function getMovieByGenre() {
    const randomNumber = Math.floor(Math.random() * 100);
    const chosenGenre = getChosenGenreId();
    const discoveryUrl = '/discover/movie';
    const additionalUrl = `?api_key=${key}&language=en-US&with_genres=${chosenGenre}&sort_by=popularity.desc&page=${randomNumber}`;
    const completeUrl = `${baseUrl}${discoveryUrl}${additionalUrl}`;


    try {
        const response = await fetch(completeUrl);
        if (response.ok) {
            const discoveryObj = await response.json();
            console.log(discoveryObj);
            return discoveryObj;
        }
        throw new Error('network error');
    } catch (error) {
        console.log(error);
    }
}

async function makeVisual() {
    const obj = await getMovieByGenre();
    const randomNumberForMovie = Math.floor(Math.random() * 15);
    const movie = obj.results[`${randomNumberForMovie}`];
    const movieId = movie.id;
    const movieName = movie.title;
    const movieText = movie.overview;
    const movieImg = `https://image.tmdb.org/t/p/original${movie['poster_path']}`;
    const movieYear = movie['release_date'];
    console.log(movieYear)

    movieImgDOM.attributes.src.value = movieImg;
    movieNameDOM.innerHTML = movieName;
    movieTextDOM.innerHTML = movieText;
    movieBox.style.height = 'fit-content'
    movieYearDOM.innerHTML = movieYear.slice(0,4);
}








button.onclick = makeVisual;




genresToWeb(getGenres());
