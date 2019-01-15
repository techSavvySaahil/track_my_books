import React from 'react';
import * as BooksAPI from './api/BooksAPI';
import './styles/App.css';
import BooksList from './components/BooksList';
import SearchBooks from './components/SearchBooks';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    currentlyReading: {},
    read: {},
    wantToRead: {}
  }

  componentDidMount() {
    /**
    * @description  Gets all the books and categorise them according to shelf
    * @description  and makes each book object a value with key as the book's id 
    */
    BooksAPI.getAll()
    .then(books=>{
      books.forEach(book=> {
        if(book.shelf) {
          this.setState((prevState)=>({
            [book.shelf]: Object.assign({}, prevState[book.shelf], {[book.id]: book})
          }));
        }
      });
    })
  }

  /**
  * @description   Updates shelf for a book
  * @description   Deletes the book from the previous shelf object(if required, not in case of "none")
  * @description   Adds the book to the new shelf object(if required, not in case of "none")
  * @param {object} book - The book object
  * @param {string} prevShelf - The shelf in which book is currently placed
  * @param {string} newShelf - The new shelf in which book will be placed
  */
  changeShelf = (book, newShelf)=> {
    let prevShelf = book.shelf;
    if(prevShelf && prevShelf!=="none") {
      delete this.state[prevShelf][book.id];
      this.setState(prevState=>({
        [prevShelf]: Object.assign({}, this.state[prevShelf])
      }))
    }
    book.shelf = newShelf;
    if(newShelf !== "none") {
      this.setState(prevState=>({
        [book.shelf]: Object.assign({}, prevState[book.shelf], {[book.id]: book})
      }))
    }
    BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <BooksList currentlyReading={this.state.currentlyReading} read={this.state.read} wantToRead={this.state.wantToRead} changeShelf={this.changeShelf} />)} />
        <Route path='/search' render={()=>(
          <SearchBooks currentlyReading={this.state.currentlyReading} read={this.state.read} wantToRead={this.state.wantToRead} changeShelf={this.changeShelf} />)} />   
      </div>
    )
  }

}

export default BooksApp;