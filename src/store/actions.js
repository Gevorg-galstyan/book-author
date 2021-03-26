import * as actionTypes from "./actionTypes";
import {getStorageBooks, getStorageUsers} from "../helpers/getFromStorage";
import {history} from "../helpers/history";

export function addAuthor(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        const storageAuthors = localStorage.getItem('authors');
        if (storageAuthors) {
            const authors = JSON.parse(storageAuthors)
            authors.push(data);
            localStorage.setItem('authors', JSON.stringify(authors))
        } else {
            localStorage.setItem('authors', JSON.stringify([data]))
        }
        dispatch({type: actionTypes.ADD_AUTHOR, alert: 'Вы успешно добавили автора', data})
    }
}

export function editAuthor(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        let authors = getStorageUsers()
        const editIndex = authors.findIndex(e => e._id === data._id);
        authors[editIndex] = data;
        localStorage.setItem('authors', JSON.stringify(authors))
        dispatch({type: actionTypes.EDIT_AUTHOR, alert: 'Вы успешно отредактировали автора', data})
    }
}

export function deleteAuthor(id) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        let authors = getStorageUsers()
        const deleteAuthor = authors.filter(e => e._id !== id);
        localStorage.setItem('authors', JSON.stringify(deleteAuthor))
        dispatch({type: actionTypes.DELETE_AUTHOR, alert: 'Вы успешно удалили автора', id})
        history.push('/authors')
    }
}

export function addBook(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        const storageBooks = localStorage.getItem('books');
        if (storageBooks) {
            const books = JSON.parse(storageBooks)
            books.push(data);
            localStorage.setItem('books', JSON.stringify(books))
        } else {
            localStorage.setItem('books', JSON.stringify([data]))
        }
        dispatch({type: actionTypes.ADD_BOOK, alert: 'Вы успешно добавили книгу', data})
    }
}
export function editBook(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        let books = getStorageBooks()
        const editIndex = books.findIndex(e => e._id === data._id);
        books[editIndex] = data;
        localStorage.setItem('books', JSON.stringify(books))
        dispatch({type: actionTypes.EDIT_BOOK, alert: 'Вы успешно отредактировали книгу', data})
    }
}


export function deleteBook(id) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        let books = getStorageBooks()
        const deleteBook = books.filter(e => e._id !== id);
        localStorage.setItem('books', JSON.stringify(deleteBook))
        dispatch({type: actionTypes.DELETE_BOOK, alert: 'Вы успешно удалили книгу', id})
        history.push('/books')
    }
}