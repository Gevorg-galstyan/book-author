import React from "react";
import book from '../../../assets/img/book.jpg'
import author from '../../../assets/img/authors.jpg'
import style from './homeStyle.module.css'
import {Col, Container, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function Home() {

    return (
        <Container className={'mt-5'}>
            <Row>
                <Col md={6}>
                    <h2 className={style.homeTitles}>книги</h2>
                    <NavLink
                        to={'/books'}
                        exact
                    >
                        <div className={'mt-4'}>
                            <img src={book} alt="" className={'img-fluid'}/>
                        </div>
                    </NavLink>

                </Col>
                <Col md={6}>
                    <h2 className={style.homeTitles}>авторы</h2>
                    <NavLink
                        to={'/authors'}
                        exact
                    >
                        <div className={'mt-4'}>
                            <img src={author} alt="" className={'img-fluid'}/>
                        </div>
                    </NavLink>

                </Col>
            </Row>
        </Container>
    )
}