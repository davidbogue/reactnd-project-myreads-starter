import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from "./Book";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    shelfValue: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { books, shelfName, shelfValue, onUpdateBook } = this.props;

    books.sort(sortBy('title'));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
            <ReactCSSTransitionGroup component="ol" className="books-grid"
              transitionName="book"
              transitionAppear={true}
              transitionAppearTimeout={600}
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}>
              {books.filter((b) => b.shelf === shelfValue).map((book) => (
                <Book book={book} key={book.id} onUpdateBook={onUpdateBook}/>
              ))}
            </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default BookShelf
