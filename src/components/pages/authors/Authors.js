import React, {useState} from "react";
import {Container, Row, Col, Table, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {faEdit, faTrash, faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {deleteAuthor} from "../../../store/actions";
import AddEditAuthor from "../../modals/authorModals/AddEditAuthor";
import {confirmAlert} from "react-confirm-alert";


function Authors({authors, deleteAuthor}) {
    const [modalShow, setModalShow] = useState(false);
    const [editInfo, setEdit] = useState(null);

    const handleDelete = (id)=>{
        confirmAlert({
            title: 'Подтвердите!!',
            message: `Вы уверены, что хотите удалить автора ?`,
            buttons: [
                {
                    label: 'Да',
                    onClick: () => deleteAuthor(id)
                },
                {
                    label: 'Нет',
                }
            ]
        });
    }
    const authorsTr = authors.map((e, i)=>{
        return(
            <tr key={uuidv4()}>
                <td>{i+1}</td>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
                <td className={'p-0 text-center align-middle'}>
                    <FontAwesomeIcon
                        className={'hovered cursor-pointer'}
                        icon={faEdit}
                        onClick={() => {
                            setModalShow(true);
                            setEdit({
                                _id: e._id,
                                first_name: e.first_name,
                                last_name: e.last_name
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
                    <Link to={`/author/${e._id}`}>
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
                        <Button variant="light" onClick={() => {
                            setModalShow(true)
                            setEdit(null)
                        }}>Добвить автора</Button>
                    </Col>
                </Row>

                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя автора</th>
                            <th>Фамилия автора</th>
                        </tr>
                        </thead>
                        <tbody>
                            {authorsTr}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            {
                modalShow &&
                <AddEditAuthor
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    editInfo={editInfo}
                />
            }

        </>

    )
}

const mapStateToProps = (state)=>{
     return{
         authors: state.authors
     }
}

const mapDispatchToProps = {
   deleteAuthor
}

export default connect(mapStateToProps,mapDispatchToProps)(Authors)