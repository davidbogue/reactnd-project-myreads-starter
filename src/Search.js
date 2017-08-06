import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Book from "./Book"

const MAX_SEARCH_RESULTS = 25

class Search extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    searchResults: []
  }

  updateQuery = (query) => {
    if(query){
      BooksAPI.search(query,MAX_SEARCH_RESULTS).then((books) => {
        if(books.error){
          this.setState({ searchResults: [] })
        }else{
          let displayBooks = books.sort(sortBy('title')).map( book => {
            let currentBook = this.props.myBooks.find(b => (b.id === book.id))
            book.shelf = (currentBook) ? currentBook.shelf : "none"
            return book;
          })
          this.setState({ searchResults: displayBooks })
        }
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    const { onUpdateBook } = this.props
    const { searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="300" handler="onChange">
              <input type="text"
                     placeholder="Search by title or author"
                     onChange={(event) => this.updateQuery(event.target.value)}/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
              <Book book={book} key={book.id} onUpdateBook={onUpdateBook}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
