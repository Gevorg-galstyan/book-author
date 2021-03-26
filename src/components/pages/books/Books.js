import React, {useState} from "react";
import {Container, Row, Col, Button, Table} from "react-bootstrap";
import {deleteBook} from "../../../store/actions";
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faLongArrowAltRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import AddEditBook from "../../modals/bookModals/AddEditBook";
import {confirmAlert} from "react-confirm-alert";

function Books({books, authors, deleteBook}) {

    const [modalShow, setModalShow] = useState(false);
    const [editInfo, setEdit] = useState(null);

    const handleDelete = (id)=>{
        confirmAlert({
            title: 'Подтвердите!!',
            message: `Вы уверены, что хотите удалить книгу ?`,
            buttons: [
                {
                    label: 'Да',
                    onClick: () => deleteBook(id)
                },
                {
                    label: 'Нет',
                }
            ]
        });
    }

    const booksTr = books.map((e, i) => {
        const author = authors.find(j => j._id === e.author_id)
        return (
            <tr key={uuidv4()}>
                <td className={'align-middle'}>{i + 1}</td>
                <td className={'align-middle'}>{e.image? <img src={e.image} alt="" width={"50"}/>:''}</td>
                <td className={'align-middle'}>{e.title}</td>
                <td className={'align-middle'}>{author.first_name} {author.last_name}</td>
                <td className={'align-middle'}>{e.year}</td>
                <td className={'align-middle'}>{e.created_at}</td>
                <td className={'p-0 text-center align-middle'}>
                    <FontAwesomeIcon
                        className={'hovered cursor-pointer'}
                        icon={faEdit}
                        onClick={() => {
                            setModalShow(true);
                            setEdit({
                                _id: e._id,
                                title: e.title,
                                year: e.year,
                                created_at: e.created_at,
                                author_id: e.author_id,
                                image: e.image?e.image:''

                            })
                        }}
                    />
                </td>
                <td className={'p-0 text-center align-middle'}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className={'hovered color-red cursor-pointer'}
                        onClick={()=>handleDelete(e._id)}
                    />
                </td>
                <td className={'p-0 text-center align-middle'}>
                    <Link to={`/book/${e._id}`}>
                        <FontAwesomeIcon
                            icon={faLongArrowAltRight}
                            className={'hovered color-blue cursor-pointer'}
                        />
                    </Link>

                </td>
            </tr>
        )
    })

    return (
        <>
            <Container className={'mt-4'}>
                <Row className={'mb-4'}>
                    <Col className={'text-center mt-4'} xs={12}>
                        <Button
                            variant="light"
                            onClick={() => {
                                setModalShow(true)
                                setEdit(null)
                            }}

                        >Добвить книгу</Button>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Обложка</th>
                            <th>Название</th>
                            <th>Автор</th>
                            <th>Первая публикация</th>
                            <th>Создан</th>
                        </tr>
                        </thead>
                        <tbody>
                        {booksTr}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            {
                modalShow &&
                <AddEditBook
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    editInfo={editInfo}
                />
            }

        </>

    )
}


const mapStateToProps = (state) => {
    return {
        books: state.books,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    deleteBook
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)