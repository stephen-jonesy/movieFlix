
const popularPage1 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d95f4fac08f4eb5639ca4efc90bd9178";

const popularPage2 = "https://api.themoviedb.org/3/discover/movie?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate";

const popularPage3 = "https://api.themoviedb.org/3/discover/movie?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3&with_watch_monetization_types=flatrate";

const popularPage4 = "https://api.themoviedb.org/3/discover/movie?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=4&with_watch_monetization_types=flatrate";

const popularPage5 = "https://api.themoviedb.org/3/discover/movie?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=5&with_watch_monetization_types=flatrate";

const genresURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=d95f4fac08f4eb5639ca4efc90bd9178&language=en-US";

const imageURL = "https://image.tmdb.org/t/p/w500/";

const highResImageURL = "https://image.tmdb.org/t/p/original/";

console.log(window.location.pathname);

const addMovies = () => {

    Promise.all([
        fetch(popularPage1, {
            method: "GET",

        }),
        fetch(popularPage2, {
            method: "GET",

        }),
        fetch(popularPage3, {
            method: "GET",

        }),
        fetch(popularPage4, {
            method: "GET",

        }),
        fetch(popularPage5, {
            method: "GET",

        }),
        fetch(genresURL, {
            method: "GET",

        })

    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }) .then(function(data) {
        console.log('data:', data);
        console.log('page1:', data[0].results);
        console.log('page2:', data[1].results);
        console.log('page3:', data[2].results);
        console.log('page4:', data[3].results);
        console.log('page5:', data[4].results);
        console.log('genres:', data[5].genres);


        const allPopularPages = data[0].results.concat(data[1].results, data[2].results, data[3].results, data[4].results)

        if(window.location.pathname == '/movieFlix/' ) {
            console.log('on index page');
            populateIndexPage(allPopularPages);
        }
        
        if(window.location.pathname == '/movieFlix/index.html' ) {
            console.log('on index page');
            populateIndexPage(allPopularPages);
        }
        
        if(window.location.pathname == '/movieFlix/genre.html' ) {
            genrePagePopulate(data);
        }

        if(window.location.pathname == '/movieFlix/genre-search.html' ) {
            genreSearchPopulate(allPopularPages);
        }


    })
    .catch(error => {
    console.log('error');
    console.error(error);
    });
}

const shuffle = (array) => {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const populateIndexPage = (allPopularPages) => {
    console.log('allpages', allPopularPages[0]);

    const populateHeroBanner = () => {
        console.log(highResImageURL+allPopularPages[0].backdrop_path);
        const heroBanner = document.querySelector('.hero-banner');
        heroBanner.style.backgroundImage = `url(${highResImageURL+allPopularPages[0].backdrop_path})`;
        
    }

    const populatePopularScroll = () => {

        allPopularPages.forEach(movie => {
            const popularMovies = document.querySelector('.popular-movies-container');
            const img = document.createElement('img');
            img.classList.add('movie-img');
            img.src = imageURL+movie.poster_path;         
            img.setAttribute("id", movie.id);
   
            popularMovies.appendChild(img);

        });
        populateHeroBanner()

    }

    const populateGenre =  (code, genre) => {
        const main = document.querySelector('.main'); 
        const genreMovies = allPopularPages.filter(movie => movie.genre_ids.includes(code));
        shuffle(genreMovies);

        const genreTitles = document.createElement('h2');
        const genreContainer = document.createElement('div');
        genreTitles.innerHTML = `<h2 class="carousel-title">${genre}</h2>`
        genreContainer.classList.add(`movies-container`);
        genreContainer.classList.add(`movies-carousel`);
        genreContainer.classList.add(`${genre}-movies-container`);
        main.appendChild(genreTitles);
        main.appendChild(genreContainer);

        genreMovies.forEach(movie => {

            const img = document.createElement('img');
            img.classList.add('movie-img');
            img.src = imageURL+movie.poster_path;
            img.setAttribute("id", movie.id);

            genreContainer.appendChild(img);
        });
    
        
    };

    populatePopularScroll()
    populateGenre(28, "action");
    //populateGenre(12, "adventure");
    populateGenre(16, "animated");
    populateGenre(35, "comedy");
    populateGenre(80, "crime");
    populateGenre(18, "drama");
    populateGenre(10751, "family");
    populateGenre(14, "fantasy");

};

const genrePagePopulate = (data) => {
    const colourArray = [
        '#4d7987',
        '#4d5187',
        '#874d52',
        '#2f9445',
        '#8b2f94',
        '#2f3194',
        '#942f48'
    ]
    colourArray.sort( () => .5 - Math.random() );
    let index = 0;

    const pageContainer = document.querySelector('.genre-page-container');
    data[5].genres.forEach((genre) => {
        index++;
        const genreContainer = document.createElement('div');
        genreContainer.classList.add('genre-container');
        genreContainer.style.backgroundColor = colourArray[index];
        if (index == 6) {

            index = -1;
        }
        console.log(genre)

        pageContainer.appendChild(genreContainer);
        genreContainer.innerText = genre.name;
        genreContainer.setAttribute('id', genre.id);

        
    });



    document.addEventListener('click', (e) => {
        if(e.target.classList == "genre-container") {
            
            const genreID = e.target.id;
            const params = new URLSearchParams({
                genre: genreID,
            });
            console.log(params.toString());
            let url = location.hostname;
            url = `genre-search.html?${params}`;
            location.href = url;
            
        }
    });


}

const genreSearchPopulate = (allPopularPages) => {

    const urlQuery = () => {
        let searchResult = location.search;
        searchResult = searchResult.slice( 1 );
        let searchQuery = searchResult.replace("genre=", "");

        return searchQuery;

    }
    const genreMoviesList = () => {
        const genreID = parseInt(urlQuery());
        const genreMovies = allPopularPages.filter(movie => movie.genre_ids.includes(genreID));
        return genreMovies;

    }
    console.log(genreMoviesList());
    const populatePage = () => {
        console.log(genreMoviesList())
        const popularMovies = document.querySelector('.movies-container');
        /*
        const searchText = document.querySelector('.search-title');
        searchText.innerText = "Results for the genre: "
        */
        genreMoviesList().forEach(movie => {
            const img = document.createElement('img');

            img.classList.add('movie-img');
            img.src = imageURL+movie.poster_path;         
            img.setAttribute("id", movie.id);

            popularMovies.appendChild(img);
            

        });


    };
    populatePage()


}

addMovies();


