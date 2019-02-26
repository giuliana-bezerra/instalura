import { Component } from 'react';

export default class Logout extends Component {
    // Antes do render ser invocado!
    componentWillMount(){
        localStorage.removeItem('auth-token');
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}