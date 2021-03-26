import React, {useState, useEffect, useRef} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {addAuthor, editAuthor} from "../../../store/actions";
import {v4 as uuidv4} from 'uuid';

function AddEditAuthor(props) {
    const [values, setValues] = useState({
        _id: props.editInfo ? props.editInfo._id : uuidv4(),
        first_name: props.editInfo ? props.editInfo.first_name : '',
        last_name: props.editInfo ? props.editInfo.last_name : '',
    });
    const [errors, setErrors] = useState({
        first_name: null,
        last_name: null
    });

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleChange = ({target: {value, name}}) => {
        if (value.trim() === '') {
            setErrors({
                ...errors,
                [name]: 'Пожалуйста заполните поле'
            })
        }else {
            setErrors({
                ...errors,
                [name]: null
            })
        }


        setValues({
            ...values,
            [name]: value
        })


    }
    const handleSave = () => {

        const val = Object.values(values),
            hasVal = !val.some(e => e === '');
        if (!hasVal) {
            setErrors({
                first_name: values.first_name ? null : 'Пожалуйста заполните поле',
                last_name: values.last_name ? null : 'Пожалуйста заполните поле',
            })
            return false;
        }

        props.editInfo ? props.editAuthor(values) : props.addAuthor(values);
        props.onHide(true)
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Заполните все поля
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Имя Автора</Form.Label>
                    <Form.Control
                        type="text"
                        name={'first_name'}
                        placeholder="пр: Александр"
                        value={values.first_name}
                        onInput={handleChange}
                        ref={inputRef}
                    />
                    <Form.Text className="text-muted">
                        {errors.first_name}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Фамилия Автора</Form.Label>
                    <Form.Control
                        type="text"
                        name={'last_name'}
                        value={values.last_name}
                        placeholder="пр: Пушкин"
                        onInput={handleChange}
                    />
                    <Form.Text className="text-muted">
                        {errors.last_name}
                    </Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Отмена</Button>
                <Button
                    variant={'success'}
                    onClick={handleSave}
                >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapDispatchToProps = {
    addAuthor,
    editAuthor
}


export default connect(null, mapDispatchToProps)(AddEditAuthor)