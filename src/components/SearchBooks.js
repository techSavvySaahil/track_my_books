import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

/**
* @description Represents the Search books component
* @states
* @props {object} currentlyReading - The currentlyReading shelf books
* @props {object} wantToRead - The wantToRead shelf books
* @props {object} read - The read shelf books
* @props {function} changeShelf - The function for changing shelf
*/
class SearchBooks extends Component {
  state= {
    books: []
  }

  /**
  * @description   Searches books with the query given
  * @description   Checks for the current shelf for the books
  * @params {string} query - The query for which books would be searched
  */
  searchBooks = (query)=> {
    let userBooks = Object.assign({}, this.props.currentlyReading, this.props.wantToRead, this.props.read);
    BooksAPI.search(query)
    .then(books=> {
      books.forEach(book=> {
        book.shelf = userBooks[book.id] ? userBooks[book.id].shelf : "none";
        return book;
      });
      this.setState({books})
    })
    .catch((err)=> {
      this.setState({books: []})
    })
  }

  /**
  * @description   Handles changes in the input field
  * @params {object} event - The event triggered
  */
  handleChange = (e)=> {
    let query = e.target.value;
    this.setState({books: []});
    if(query) {
      this.searchBooks(query);
    }
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input type="text" autoFocus="true" placeholder="Search by title or author" onChange={this.handleChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.state.books.map(book=>(
                <Book key={book.id} book={book} changeShelf={this.props.changeShelf} />
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  currentlyReading: PropTypes.object,
  wantToRead: PropTypes.object,
  read: PropTypes.object,
  changeShelf: PropTypes.func
};

export default SearchBooks;