import * as actionTypes from "./actionTypes";
import {getStorageUsers, getStorageBooks} from "../helpers/getFromStorage";

let defaultState = {
    authors: getStorageUsers(),
    books: getStorageBooks(),
    successAlert: false,
}

export function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.PENDING : {
            return {
                ...state,
                successAlert: false,
            }
        }
        //AUTHORS
        case actionTypes.ADD_AUTHOR : {
            return {
                ...state,
                authors: [...state.authors, action.data],
                successAlert: action.alert,
            }
        }
        case actionTypes.EDIT_AUTHOR : {
            let authors = [...state.authors];
            const changedAuthorIndex = authors.findIndex((e) => e._id === action.data._id);
            authors[changedAuthorIndex] = action.data;
            return {
                ...state,
                authors,
                successAlert: action.alert,
            }
        }

        case actionTypes.DELETE_AUTHOR : {
            let authors = [...state.authors];
            const changedAuthors = authors.filter((e) => e._id !== action.id);
            console.log(changedAuthors)
            return {
                ...state,
                authors: changedAuthors,
                successAlert: action.alert,
            }
        }


        //BOOKS
        case actionTypes.ADD_BOOK : {
            return {
                ...state,
                books: [...state.books, action.data],
                successAlert: action.alert,
            }
        }

        case actionTypes.EDIT_BOOK : {
            let books = [...state.books];
            const changedbookIndex = books.findIndex((e) => e._id === action.data._id);
            books[changedbookIndex] = action.data;
            return {
                ...state,
                books,
                successAlert: action.alert,
            }
        }

        case actionTypes.DELETE_BOOK : {
            let books = [...state.books];
            const changedBooks = books.filter((e) => e._id !== action.id);
            console.log(changedBooks)
            return {
                ...state,
                books: changedBooks,
                successAlert: action.alert,
            }
        }

        default :
            return state
    }
}

