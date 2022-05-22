const searchInput = document.getElementById('search-input')
const searchBtn = document.querySelector(".btn-search")
const movieContainer = document.querySelector(".movie-container")
let movieTitle 
let html

window.addEventListener("DOMContentLoaded", function(){

    displayWatchList()
})


function addBtn(data) {
    console.log("Add button clicked")
    console.log(data.parentElement.value)
    let movieTitle = data.parentElement.value
    let movieList
    if(localStorage.getItem('watchlist') === null){
        movieList = []
    } else {
        movieList = JSON.parse(localStorage.getItem('watchlist'))
    }
    if(movieList.includes(movieTitle) === false){
        movieList.push(movieTitle)
    }
    
    localStorage.setItem('watchlist',JSON.stringify(movieList))
    displayWatchList()
}

function removeBtn(data) {
    let movieTitle = data.parentElement.value
    if(localStorage.getItem('watchlist') === null){
        movieList = []
    } else {
        movieList = JSON.parse(localStorage.getItem('watchlist'))
    }

    let index = movieList.indexOf(movieTitle)
    movieList.splice(index, 1)
    localStorage.setItem('watchlist',JSON.stringify(movieList))
    displayWatchList()
}

function displayWatchList(){
    let movieList = JSON.parse(localStorage.getItem('watchlist'))
    console.log(movieList.length)
    if(movieList.length > 0){
        console.log(movieList)
        document.querySelector('.watchlist').innerHTML = ''
        for(let movie of movieList){
            fetch(`https://www.omdbapi.com/?apikey=35b7a2ab&t=${movie}`)
                .then(response => response.json())
                .then(data => { 
                    html = `
                    <div class="movie-center">
                        <div class="movie-poster">
                            <img src=${data.Poster} alt="Movie Poster">
                        </div>
            
                        <div class="movie-info">
                            <div class="movie-title">
                                <h3>${data.Title} <span id="movie-rating">⭐️ ${data.imdbRating}</span></h3>
                            </div>
            
                            <div class="movie-detail">
                                <p id='movie-length'>${data.Runtime}</p>
                                <p id="movie-genre">${data.Genre}</p>                      
                                <button type="button" class="watchlist-btn" value="${data.Title}">
                                    <i class="fa fa-minus-circle" onclick="removeBtn(this)"></i>  
                                </button>
                                <p>Remove</p>
                                
                            </div>
            
                            <div class="movie-synopsis">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    `
                    document.querySelector('.watchlist').innerHTML += html 
                })
    
        }
    }


    if(movieList <= 0){
        console.log("empty")
        document.querySelector('.watchlist').innerHTML = ''
        document.querySelector('.watchlist').innerHTML =`
        <div class="watchlist-default">
            <p>Your Watchlist is empty.
                Add a movie.
            </p>
        </div>
        `
       
        
    }

}




searchBtn.addEventListener('click', function(e){
    e.preventDefault()
    movieTitle = searchInput.value
    fetch(`https://www.omdbapi.com/?apikey=35b7a2ab&s=${movieTitle}`)
        .then(response => response.json())
        .then(data => displayMovies(data.Search))
})


function displayMovies(movies){
    movieContainer.innerHTML = ''
    if(movies == undefined){
        console.log("movies are undefined")
        movieContainer.innerHTML = `
            <div class="unable-search">
                <p>Unable to find what you are looking for.<br>
                Please try another search.</p>
        `
    } else {
        for(let movie of movies){
            movieTitle = movie.Title
            console.log(movieTitle)
             fetch(`https://www.omdbapi.com/?apikey=35b7a2ab&t=${movieTitle}`)
                 .then(response => response.json())
                 .then(data => {
                     
                    html = `
                    <div class="movie-center">
                        <div class="movie-poster">
                            <img src=${data.Poster} alt="Movie Poster">
                        </div>
            
                        <div class="movie-info">
                            <div class="movie-title">
                                <h3>${data.Title} <span id="movie-rating">⭐️ ${data.imdbRating}</span></h3>
                            </div>
            
                            <div class="movie-detail">
                                <p id='movie-length'>${data.Runtime}</p>
                                <p id="movie-genre">${data.Genre}</p>                      
                                <button type="button" class="watchlist-btn" value="${data.Title}">
                                    <i class="fa fa-plus-circle add-btn" onclick="addBtn(this)"></i>  
                                </button>
                                <p>Watchlist</p>
                                
                            </div>
            
                            <div class="movie-synopsis">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    `
                    movieContainer.innerHTML += html
                })
                    
            }  
        }              
}




