const Movie = require('../models/Movie');

exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find()

exports.getMovie = (movieId) =>  Movie.findById(movieId);

exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean();
    if(title){
        result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if(genre){
        result = result.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    if(year) {
        result = result.filter(movie => movie.year === year);
    }

    return result;
};

exports.attach = (movieId, castId) => {
    return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
}