import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(this.props.location.search);
        this.state = {msg: params.get('msg')};
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.logar}>
                    <input type="text" ref={input => this.login = input} autoComplete="username"/>
                    <input type="password" ref={input => this.senha = input} autoComplete="current-password"/>
                    <input type="submit" value="Entrar"/>
                </form>
            </div>
        );
    }

    logar = event => {
        event.preventDefault();
        
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({login: this.login.value, senha: this.senha.value}),
            headers: new Headers({'Content-type': 'application/json'})
        };

        fetch('https://instalura-api.herokuapp.com/api/public/login',
            requestInfo
        ).then(res => {
            if (res.ok) return res.text();
            else throw res;
        }).then(token => {
            localStorage.setItem('auth-token', token);
            this.props.history.push('/timeline');
        }).catch(res => {
            this.setState({msg: 'Credenciais inválidas!'});
            console.log(res);
        });
    }
}