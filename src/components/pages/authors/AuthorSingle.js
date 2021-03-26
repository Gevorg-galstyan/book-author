import React, {useState} from "react";
import {connect} from "react-redux";
import {Col, Container, Row, CardGroup, Card} from "react-bootstrap";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteAuthor, editAuthor} from "../../../store/actions";
import {confirmAlert} from "react-confirm-alert";
import {Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import AddEditAuthor from "../../modals/authorModals/AddEditAuthor";

function AuthorsSingle({match, authors, books}) {
    const authorId = match.params.id;
    const singleAuthor = authors.find(e=>e._id === authorId)
    const [modalShow, setModalShow] = useState(false);
    const authorBooks = books.filter(e=>e.author_id === authorId)


    const handleDelete = (authorId)=>{
        confirmAlert({
            title: 'Подтвердите!!',
            message: `Вы уверены, что хотите удалить автора ?`,
            buttons: [
                {
                    label: 'Да',
                    onClick: () => deleteAuthor(authorId)
                },
                {
                    label: 'Нет',
                }
            ]
        });
    }

    const authorBooksTag = authorBooks.map(e=>(
        <Link to={`/book/${e._id}`} key={uuidv4()} className={'col-md-4'}>
            <Card >
                {e.image && <Card.Img variant="top" width={50}     src={e.image}/>}
                <Card.Body>
                    <Card.Title>{e.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{e.year}</small>
                </Card.Footer>
            </Card>
        </Link>
    ))

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
                            onClick={()=>handleDelete(singleAuthor._id)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className={'text-center'}>{singleAuthor.last_name}  {singleAuthor.first_name}</h1>
                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <CardGroup className={'w-100'}>
                        {authorBooksTag}
                    </CardGroup>
                </Row>
            </Container>
            {
                modalShow &&
                <AddEditAuthor
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    editInfo={singleAuthor}
                />
            }
        </>

    )
}

const mapStateToProps = (state)=>{
    return{
        authors: state.authors,
        books: state.books
    }
}
const mapDispatchToProps = {
    deleteAuthor,
    editAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsSingle)