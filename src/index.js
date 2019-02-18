import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './component/Login';
import Logout from './component/Logout';

ReactDOM.render(
    (
        <Router>
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/timeline/:login?"
                    render={req => (
                        req.match.params.login || isAutorizado() ? (
                            <App login={req.match.params.login}/>
                        ) : (
                            <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!"/>
                        )
                    )}
                />
                <Route path="/logout" component={Logout}/>
            </div>
        </Router>
    ), 
    document.getElementById('root'));

function isAutorizado() {
    return (localStorage.getItem('auth-token') != null);
}