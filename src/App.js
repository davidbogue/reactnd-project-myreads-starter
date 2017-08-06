import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from "./BookShelf"
import Search from "./Search"

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks:books })
    })
  }

  updateBook(book, shelf) {
    book.shelf = shelf
    this.setState( (prevState) => {
      let bookIndex = prevState.myBooks.findIndex( b => (b.id === book.id) )
      if (bookIndex > -1) {
        prevState.myBooks[bookIndex] = book
      } else {
        prevState.myBooks.push(book)
      }
      return {myBooks: prevState.myBooks}
    })

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfName="Currently Reading"
                  shelfValue="currentlyReading"
                  books={this.state.myBooks}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book,shelf)
                  }}
                />
                <BookShelf
                  shelfName="Want To Read"
                  shelfValue="wantToRead"
                  books={this.state.myBooks}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book,shelf)
                  }}
                />
                <BookShelf
                  shelfName="Read"
                  shelfValue="read"
                  books={this.state.myBooks}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book,shelf)
                  }}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
        )}/>

        <Route exact path='/search' render={() => (
          <Search myBooks={this.state.myBooks}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book,shelf)
                  }}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
