const searchForm = document.querySelector(".search-form");

const getMovieId = (e) => {
    console.log(e.target.id);
    const params = new URLSearchParams({
        movie: e.target.id,
    });
    console.log(params.toString());
    let url = location.hostname;
    url = `movie.html?${params}`;
    location.href = url;

}


const search = (event) => {
    event.preventDefault();
    let searchInput = document.querySelector(".search");
    let searchedMovie = searchInput.value;
    console.log(searchedMovie);

    const params = new URLSearchParams({
        movie: searchedMovie,
    });
    console.log(params.toString());
    let url = location.hostname;
    url = `page2.html?${params}`;
    location.href = url;

    searchInput.value = "";
}

searchForm.addEventListener('submit', (event) => {
    search(event)

})

document.addEventListener('click', (e) => {
    if (e.target.className === "movie-img") {
        getMovieId(e);

    }
})