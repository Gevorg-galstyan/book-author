import React, {useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import {Router, Switch, Route, Redirect} from "react-router";
import {ToastContainer, toast} from 'react-toastify';
import {connect} from "react-redux";
import {history} from './helpers/history';
import Header from "./components/includes/header/Header";
import Home from "./components/pages/home/Home";
import Books from "./components/pages/books/Books";
import BookSingle from "./components/pages/books/BookSingle";
import Authors from "./components/pages/authors/Authors";
import AuthorSingle from "./components/pages/authors/AuthorSingle";
import NotFound from "./components/pages/notFound/NotFound";

function App({successAlert}) {
    useEffect(() => {
        if(successAlert){
            toast.success(successAlert, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [successAlert])


    return (
        <div className="App">
            <Router history={history}>
                <Header/>
                <Switch>
                    {/*Home  and / */}
                    <Route
                        path={'/'}
                        component={Home}
                        exact
                    />
                    <Route
                        path={'/home'}
                        component={Home}
                        exact
                    />

                    {/*Books*/}
                    <Route
                        path={'/books'}
                        component={Books}
                        exact
                    />

                    {/*Books Single*/}
                    <Route
                        path={'/book/:id'}
                        component={BookSingle}
                        exact
                    />

                    {/*Authors*/}
                    <Route
                        path={'/authors'}
                        component={Authors}
                        exact
                    />

                    {/*Author Single*/}
                    <Route
                        path={'/author/:id'}
                        component={AuthorSingle}
                        exact
                    />

                    {/*404*/}
                    <Route
                        path={'/404'}
                        component={NotFound}
                        exact
                    />
                    <Redirect to={'/404'}/>

                </Switch>
            </Router>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {
        successAlert: state.successAlert,
    }
}

export default connect(mapStateToProps)(App);
