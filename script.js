
function getMovies(url) {

    fetch(url).then(res => res.json()). then(data => {
        showMovies(data.results)
    })
}

function showMovies(data) {

    document.getElementById("main").innerHTML = '';
    
    data.forEach((movie) => {

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')

        movieEl.innerHTML += `
            <img id="img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div id="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getColor(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <p id="release-date">Release Date : <strong>${movie.release_date}</strong></p>
            <div id="overview"><h3>Overview</h3>${movie.overview}</div>`
        console.log(movie)
        document.getElementById("main").appendChild(movieEl)
    })
}

function getColor(vote) {
    if(vote >= 8) {
        return "green"
    }else if(vote >= 5) {
        return "orange"
    }else {
        return 'red'
    }
}

getMovies("https://api.themoviedb.org/3/discover/movie?api_key=f25dc3f21d703b6fa08b3c7195700d0b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")

document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = document.getElementById("search").value;
    if(searchTerm) {
        getMovies("https://api.themoviedb.org/3/search/movie?api_key=f25dc3f21d703b6fa08b3c7195700d0b&query="+searchTerm)
    }else {
        getMovies("https://api.themoviedb.org/3/discover/movie?api_key=f25dc3f21d703b6fa08b3c7195700d0b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    }
})

