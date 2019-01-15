import React, {Component} from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
* @description Represents the book shelf
* @props {object} currentlyReading - The currentlyReading shelf books
* @props {object} wantToRead - The wantToRead shelf books
* @props {object} read - The read shelf books
* @props {function} changeShelf - The function for changing shelf
* @props {function} shelf - The shelf object with name and key name
*/
class Shelf extends Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Boolean(Object.keys(this.props[this.props.shelf.key]).length) && Object.values(this.props[this.props.shelf.key]).map(book=> (
              <Book key={book.id} book={book} changeShelf={this.props.changeShelf} />))
            }
          </ol>
         </div>
       </div>
    )
  }
}

Shelf.propTypes = {
  currentlyReading: PropTypes.object,
  wantToRead: PropTypes.object,
  read: PropTypes.object,
  changeShelf: PropTypes.func,
  shelf: PropTypes.object
};

export default Shelf;