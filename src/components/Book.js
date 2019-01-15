import React from 'react';
import PropTypes from 'prop-types';

const defaultURL = 'http://books.google.com/books/content?id=NLK2AAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api';

/**
* @description Represents a book
* @props {object} book - The book object
* @props {function} changeShelf - The function for changing shelf
*/
class Book extends React.Component{
  render(){
    return(
      <li>
        <div className="book">
          <div className="book-top">
            {this.props.book.imageLinks ? 
              (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>) : 
              (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${defaultURL})`}}></div>)
            }
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={(e)=>this.props.changeShelf(this.props.book,e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors && this.props.book.authors[0]}</div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object,
  changeShelf: PropTypes.func
};

export default Book;