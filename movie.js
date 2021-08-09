
const urlQuery = () => {
    console.log(location.search);
    let searchResult = location.search;
    searchResult = searchResult.slice( 1 );
    console.log(searchResult);
    let searchQuery = searchResult.replace("movie=", "");
    console.log(searchQuery);

    return searchQuery;

}

const getSearchedMovie = () => {

    const url = `https://api.themoviedb.org/3/movie/${urlQuery()}?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US`;

    const creditsURL = `https://api.themoviedb.org/3/movie/${urlQuery()}/credits?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US`;

    Promise.all([
        fetch(url, {
            method: "GET",

        }),
        fetch(creditsURL, {
            method: "GET",

        }),

    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }) .then(function(data) {
        console.log('data:', data);
        populateSearchMovies(data);

    })
    .catch(error => {
    console.log('error');
    console.error(error);
    });
};

const movieInfo = (data) => {
    const url = data[0];
    const creditsURL = data[1];
    

    const imageURL = "https://image.tmdb.org/t/p/w500/";
    console.log('backdrop path ' + imageURL+url.backdrop_path);   

    if (url == 0) {
        const searchTitle = document.querySelector(".search-title");
        searchTitle.innerText = `No results found for your search: "${urlQuery()}"`;

        return;
    }

    else {
        const popularMovies = document.querySelector('.movie-container');
        const movieTitle = document.querySelector('.movie-title');
        const movieOverview = document.querySelector(".movie-overview");
        const movieScore = document.querySelector(".movie-score");
        const genres = document.querySelector(".genres");

        const img = document.createElement('img');
        img.classList.add('movie-img');
        img.src = imageURL+url.poster_path;
          
        movieTitle.innerText = url.title;
        movieOverview.innerText = url.overview;
        movieScore.innerText = `Audience score: ${url.vote_average}`;
        genres.innerHTML = `Genres: <div class="genre-list"></div>`;
        /*
        console.log(url.genres[0].name);
        console.log(url.genres[1].name);
        genres.innerText = `Genres: ${url.genres[0].name}, ${url.genres[1].name}`;
        */
        url.genres.forEach(genre => {
            const genreList = document.querySelector('.genre-list');
            const genreTitle = document.createElement("span");
            console.log(genre.name);
            genreTitle.innerText = `${genre.name} `;

            genreList.appendChild(genreTitle);


        });

        popularMovies.appendChild(img);

    }
    movieCast(creditsURL)
}
const searchTitle = () => {
    const searchTitle = document.querySelector(".search-title");
    searchQuery = urlQuery();
    searchQuery = searchQuery.replace("+", " ");

    searchTitle.innerText = searchQuery;

};

const movieCast = (creditsURL) => {
    const cast = document.querySelector(".crew");
    const directorTitle = document.querySelector(".director");
    const writersTitle = document.querySelector(".writers");
    const directorsList = document.createElement("div");
    const writersList = document.createElement("div");

    console.log(creditsURL.crew );

    let directors =  creditsURL.crew.filter(function(movie) {
        return movie.job == "Director";
    });

    let writers = creditsURL.crew.filter(function(movie) {
        return movie.job == "Screenplay" || movie.job == "Writer";
    });
    console.log(directors)

    console.log(writers);

    directorTitle.innerText = "Directors"
    directors.forEach(director => {
        console.log(director.name)
        directorsList.innerText = director.name;

        
        directorTitle.appendChild(directorsList);
        
        
    });
    writersTitle.innerText = `writers: `


    writers.forEach(writer => {
        const writersList = document.createElement("div");


        writersList.innerText = `${writer.name}`;
        
        writersTitle.appendChild(writersList);
        
    });

}

const populateSearchMovies = (data) => {
    movieInfo(data);

};

getSearchedMovie();
