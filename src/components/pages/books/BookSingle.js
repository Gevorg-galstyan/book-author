import React, {useState} from "react";
import {connect} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteBook} from "../../../store/actions";
import {confirmAlert} from "react-confirm-alert";
import AddEditBook from "../../modals/bookModals/AddEditBook";

function BookSingle({match, books, authors, deleteBook}) {
    const bookId = match.params.id;
    const singleBook = books.find(e=>e._id === bookId)
    const [modalShow, setModalShow] = useState(false);
    const author = authors.find(j => j._id === singleBook.author_id)
    const handleDelete = (bookId)=>{
        confirmAlert({
            title: 'Подтвердите!!',
            message: `Вы уверены, что хотите удалить книгу ?`,
            buttons: [
                {
                    label: 'Да',
                    onClick: () => deleteBook(bookId)
                },
                {
                    label: 'Нет',
                }
            ]
        });
    }

    return(
        <>
            <Container className={'mt-3'}>
                <Row>
                    <Col className={'text-right'}>
                        <FontAwesomeIcon
                            className={'hovered cursor-pointer'}
                            icon={faEdit}
                            onClick={() => {
                                setModalShow(true);
                            }}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            className={'hovered color-red cursor-pointer ml-3'}
                            onClick={()=>handleDelete(singleBook._id)}
                        />
                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <Col md={4}>
                        <img src={singleBook.image} alt={singleBook.title} className={'img-fluid'}/>
                    </Col>
                    <Col md={8}>
                        <div className={'text-center'}>
                            <b>Автор: </b> <span>{author.first_name} {author.last_name}</span>
                        </div>
                        <h1 className={'text-center'}>{singleBook.title}</h1>
                        <h6 className={'text-center'}>{singleBook.year} </h6>
                    </Col>
                </Row>
            </Container>
            {
                modalShow &&
                <AddEditBook
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    editInfo={singleBook}
                />
            }
        </>

    )
}

const mapStateToProps = (state)=>{
    return{
        books: state.books,
        authors: state.authors
    }
}
const mapDispatchToProps = {
    deleteBook
}

export default connect(mapStateToProps, mapDispatchToProps)(BookSingle)