import React, { Component } from 'react';
import Foto from './Foto';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Timeline extends Component {
    constructor(props) {
      super(props);
      this.state = {fotos: []};
      this._login = this.props.login;
    }

    carregaTimeline() {
      let url = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
      if (this._login)
        url = `https://instalura-api.herokuapp.com/api/public/fotos/${this._login}`;

      fetch(url)
      .then(res => res.json())
      .then(fotos => this.setState({fotos: fotos}));
    }

    componentWillMount() {
      PubSub.subscribe('timeline', (topico, fotos) =>
        this.setState({fotos})
      );
    }

    componentWillUnmount() {
      PubSub.unsubscribe('timeline');
    }

    // Invocado após a chamada do render.
    componentDidMount() {
      this.carregaTimeline();
    }

    // Uma forma de recarregar o componente com novas propriedades
    componentWillReceiveProps(nextProps) {
      this._login = nextProps.login;
      this.carregaTimeline();
    }

    render(){
        return (
        <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.fotos.map(foto => <Foto key={foto.id} foto={foto}/>)
          }
        </ReactCSSTransitionGroup>
        </div>         
        );
    }
}