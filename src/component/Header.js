import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {
  constructor() {
    super();
    this.pesquisaTexto = React.createRef();
  }

  render(){
      return (
        <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>
          
          <form className="header-busca" onSubmit={this.pesquisar}>
            <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={this.pesquisaTexto}/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>

          <form>
            <a href="/logout">Logout</a>
          </form>
          
          <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="#curtidas"> 
                  ♡
                  {/*                 ♥ */}
                  {/* Quem deu like nas minhas fotos */}
                </a>
              </li>
            </ul>
          </nav>
        </header>            
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