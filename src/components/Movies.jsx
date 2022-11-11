import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import MoviesTable from './moviesTable';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
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
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      sortColumn,
      selectedGenre,
      currentPage,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);
    //we can destructure the movies array from the state object
    // const movies = paginate(movies, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      sortColumn,
      currentPage,
    } = this.state;
    // const {pageSize, currentPage, movies: allMovies} = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;
    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <p className="text-center">
          Showing {totalCount} movies in the database.
        </p>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
            {/* component high level */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
    
export default Movies;