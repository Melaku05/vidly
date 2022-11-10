import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import ListGroup  from "./common/listGroup";
import Like from "./common/like";
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import { genres, getGenres } from "../services/fakeGenreService";
import { filter } from "lodash";


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,

  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }); // update the state and overwrite the movies array of the state object
  };
  handleLike = (movie) => {
    console.log('Like Clicked', movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, pageSize, selectedGenre,currentPage } = this.state;
    // const {pageSize, currentPage, movies: allMovies} = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;
     
    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    //we can destructure the movies array from the state object
    // const movies = paginate(movies, currentPage, pageSize);
    return (
      <React.Fragment>
        <p className="text-center">Showing {filtered.length} movies in the database.</p>
        <div className="row">
          <div className="col-4">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect} />
          </div>
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
    
export default Movies;