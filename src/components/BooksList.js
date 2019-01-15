import React, {Component} from 'react';
import Shelf from './Shelf';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
* @description Represents the main page book list
* @props {object} currentlyReading - The currentlyReading shelf books
* @props {object} wantToRead - The wantToRead shelf books
* @props {object} read - The read shelf books
* @props {function} changeShelf - The function for changing shelf
*/
class BooksList extends Component {
  state = {
    shelf: [
      {
        name:"Currently Reading",
        key: "currentlyReading"
      },
      {
        name:"Want to Read",
        key: "wantToRead"
      },
      {
        name:"Read",
        key: "read"
      },
    ]
  }
  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
           {this.state.shelf.map(shelf=> (
             <Shelf key={shelf.key} currentlyReading={this.props.currentlyReading} wantToRead={this.props.wantToRead} read={this.props.read} changeShelf={this.props.changeShelf} shelf={shelf} />
           ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
        )}
      </div>
    )
  }
}

BooksList.propTypes = {
  currentlyReading: PropTypes.object,
  wantToRead: PropTypes.object,
  read: PropTypes.object,
  changeShelf: PropTypes.func
};

export default BooksList;