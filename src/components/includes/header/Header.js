import React from "react";
import logo from '../../../logo.svg'
import style from './headerStyle.module.css'
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavLink
                    to="/"
                    exact
                >
                    <img src={logo} className={'img-fluid'} width={100} alt={'logo'} />
                </NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink
                            to="/"
                            activeClassName={style.active}
                            className={`${style.headerNav} nav-link`}
                            exact
                        >
                            Главная страница
                        </NavLink>
                        <NavLink
                            to="/books"
                            activeClassName={style.active}
                            className={`${style.headerNav} nav-link`}
                            exact
                        >
                            Книги
                        </NavLink>
                        <NavLink
                            to="/authors"
                            activeClassName={style.active}
                            className={`${style.headerNav} nav-link`}
                            exact
                        >
                            Авторы
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}