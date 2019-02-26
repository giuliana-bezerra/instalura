import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {
  constructor() {
    super();
    this.pesquisaTexto = React.createRef();
  }

  render(){
      return (
        <div className="centered">
          <header className="header container">
            <h1 className="header-logo">
              Instalura
            </h1>

            <form>
              <a href="/logout">Logout</a>
            </form>
          </header>            
          <form className="header-busca" onSubmit={this.pesquisar}>
            <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={this.pesquisaTexto}/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>
        </div>
      );
  }
  
  pesquisar = event => {
    event.preventDefault();

    fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${this.pesquisaTexto.current.value}`)
    .then(res => {
      if (res.ok) return res.json();
      else throw res;
    }).then(fotos => PubSub.publish('timeline', fotos));
  }
}