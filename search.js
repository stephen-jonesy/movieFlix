

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
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US&query=${urlQuery()}&page=1&include_adult=false`;
    //scorers https://api.football-data.org/v2/competitions/PL/scorers
    fetch(url, {
        method: "GET",

    })
    .then(resp => resp.json())
    .then(function(data) {
        console.log('data:', data.results);
        populateSearchMovies(data.results);

    })
    .catch(error => {
        console.log('error');
        console.error(error);
    });
};

const populateSearchMovies = (data) => {
    const imageURL = "https://image.tmdb.org/t/p/w500/";

    if (data == 0) {
        const searchTitle = document.querySelector(".search-title");
        searchTitle.innerText = `No results found for your search: "${urlQuery()}"`;

        return;
    }

    else {
        data.forEach(movie => {
            const popularMovies = document.querySelector('.search-movies-container');
            const img = document.createElement('img');
            img.classList.add('movie-img');
            img.src = imageURL+movie.poster_path;
            img.setAttribute("id", movie.id);

            
            popularMovies.appendChild(img);
        });
    
        searchTitle() 

    }
   
};

const searchTitle = () => {
    const searchTitle = document.querySelector(".search-title");
    searchQuery = urlQuery();
    searchQuery = searchQuery.replace("+", " ");
    searchTitle.innerText = searchQuery;
    searchTitle.innerText = `Results for your search: "${searchQuery}"`

};

getSearchedMovie();

