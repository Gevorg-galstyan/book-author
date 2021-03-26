import React, {useState, useEffect, useRef} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {addBook, editBook} from "../../../store/actions";
import {v4 as uuidv4} from 'uuid';

function AddEditBook(props) {
    const [values, setValues] = useState({
        _id: props.editInfo ? props.editInfo._id : uuidv4(),
        title: props.editInfo ? props.editInfo.title : '',
        year: props.editInfo ? props.editInfo.year : '',
        created_at: props.editInfo ? props.editInfo.created_at : new Date().toLocaleDateString(),
        author_id: props.editInfo ? props.editInfo.author_id : '',
        image: props.editInfo ? props.editInfo.image : ''
    });
    const [errors, setErrors] = useState({
        title: null,
        year: null,
        author_id: null
    });

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleChange = ({target}) => {

        if (target.name === "image") {
            let file = target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    setValues({
                        ...values,
                        [target.name]: reader.result,
                    });
                };
            }
        }


        if (target.value.trim() === '') {
            setErrors({
                ...errors,
                [target.name]: 'Пожалуйста заполните поле'
            })
        } else {
            setErrors({
                ...errors,
                [target.name]: null
            })
        }


        setValues({
            ...values,
            [target.name]: target.value
        })
    }
    const handleSave = () => {

        const val = Object.values(values),
            hasVal = !val.some(e => e === '');
        if (!hasVal) {
            setErrors({
                title: values.title ? null : 'Пожалуйста заполните поле',
                year: values.year ? null : 'Пожалуйста заполните поле',
                author_id: values.author_id ? null : 'Пожалуйста заполните поле',
            })
            return false;
        }

        props.editInfo ? props.editBook(values) : props.addBook(values);
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
                    <Form.Label>Имя Книги</Form.Label>
                    <Form.Control
                        type="text"
                        name={'title'}
                        placeholder="пр: Мастер и Маргарита"
                        value={values.title}
                        onInput={handleChange}
                        ref={inputRef}
                    />
                    <Form.Text className="text-muted">
                        {errors.title}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Автор</Form.Label>
                    <Form.Control
                        as="select"
                        onInput={handleChange}
                        name={'author_id'}
                        value={values.author_id}
                    >
                        <option value={''}>Выберите Автора</option>
                        {props.authors.map(e => (<option key={uuidv4()} value={e._id}>{e.first_name} {e.last_name}</option>))}
                    </Form.Control>
                    <Form.Text className="text-muted">
                        {errors.author_id}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="firsPublication">
                    <Form.Label>Первая Публикация</Form.Label>
                    <Form.Control
                        type="date"
                        name={'year'}
                        placeholder="пр: 20/02/2021"
                        value={values.year}
                        onInput={handleChange}
                    />
                    <Form.Text className="text-muted">
                        {errors.year}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="img">
                    <Form.Label>Обложка</Form.Label>
                    <div className={'d-flex align-items-center'}>
                        <Form.Control
                            type="file"
                            name={'image'}
                            onInput={handleChange}
                            accept={'.jpeg, .jpg, .png'}
                            className={'col-5'}
                        />
                        {
                            values.image !== '' &&
                            <img src={values.image} alt="" width={50}/>
                        }
                    </div>


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
    addBook,
    editBook,
}

const mapStateToProps = (state) => {
    return {
        authors: state.authors,
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(AddEditBook)