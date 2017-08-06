import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    this.props.onUpdateBook(this.props.book, e.target.value)
  }

  render() {
    const { book } = this.props
    let thumbnail = book.imageLinks ? book.imageLinks.smallThumbnail : "/noImage.png"

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                 style={{ width: 128,
                          height: 193,
                          backgroundImage: `url(${thumbnail})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: '100%'
                                                }}>
            </div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.map((author) => (
              <div key={author}>{author}</div>
            ))}
          </div>
        </div>
      </li>
    )
  }
}

export default Book
