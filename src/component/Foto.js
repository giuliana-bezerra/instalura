import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

class FotoAtualizacoes extends Component {
  constructor(props) {
    super(props);
    this.comentarioInput = React.createRef();
    this.state = {fotoLike: props.foto.likeada};
  }

  render(){
    return (
        <section className="fotoAtualizacoes">
          <button onClick={this.curtir} className={this.getClassLike()}>Likar</button>
          <form className="fotoAtualizacoes-form" onSubmit={this.comentar}>
            <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={this.comentarioInput}/>
            <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
          </form>
        </section>            
    );
  }

  comentar = event => {
    event.preventDefault();
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({texto: this.comentarioInput.current.value}),
      headers: new Headers({'Content-type': 'application/json'})
    };

    fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
      requestInfo
    ).then(res => {
      if (res.ok) return res.json();
      else throw res;
    }).then(comentario => {
      PubSub.publish('updateComentario', 
      {fotoId: this.props.foto.id, comentario});
    });
  }

  curtir = event => {
    event.preventDefault();

    const requestInfo = {
      method: 'POST',
      headers: new Headers({'Content-type': 'application/json'})
    };

    fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
      requestInfo
    ).then(res => {
      if (res.ok) return res.json();
      else throw res;
    }).then(liker => {
      this.carregarLike();
      PubSub.publish('updateLiker', {fotoId: this.props.foto.id, liker});
    });
  }

  getClassLike() {
    if (this.state.fotoLike)
      return 'fotoAtualizacoes-like-ativo';
    else
      return 'fotoAtualizacoes-like';
  }
  carregarLike() {
    this.setState({fotoLike: !this.state.fotoLike});
  }
}

class FotoInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {curtidas: this.props.curtidas, comentarios: this.props.comentarios};
    }

    componentWillMount() {
      PubSub.subscribe('updateLiker', (topico, infoLiker) => {
        if (this.props.foto.id === infoLiker.fotoId) {
          let novasCurtidas = this.state.curtidas;
          if (novasCurtidas.find(liker => 
            liker.login === infoLiker.liker.login))
            novasCurtidas = novasCurtidas.filter(liker =>
              liker.login !== infoLiker.liker.login
            );
          else
            novasCurtidas.push(infoLiker.liker);
          this.setState({curtidas: novasCurtidas});
        }
      });
      PubSub.subscribe('updateComentario', (topico, infoLiker) => {
        if (this.props.foto.id === infoLiker.fotoId) {
          let novosComentarios = this.state.comentarios;
          novosComentarios.push(infoLiker.comentario);
          this.setState({comentarios: novosComentarios});
        }
      });
    }

    componentWillUnmount() {
      PubSub.unsubscribe('updateLiker');
      PubSub.unsubscribe('updateComentario');
    }

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">
                {
                  this.state.curtidas.map(liker => 
                    <Link key={liker.login} to={`/timeline/${liker.login}`}>
                      {liker.login}&nbsp;
                    </Link>
                  )
                }
                {this.state.curtidas.length > 0 && "curtiram"}
                  
              </div>

              <p className="foto-info-legenda">
                <Link className="foto-info-autor" to={`/timeline/${this.props.loginUsuario}`}>
                  {this.props.loginUsuario}
                </Link>&nbsp;
                {this.props.comentario}
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.state.comentarios.map(comentario => 
                    <li key={comentario.id} className="comentario">
                      <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">
                        {comentario.login}
                      </Link>&nbsp;
                      {comentario.texto}
                    </li>
                  )
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${this.props.loginUsuario}`}>
                    {this.props.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.horario}</time>
            </header>            
        );
    }
}

export default class Foto extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader urlPerfil={this.props.foto.urlPerfil} 
              loginUsuario={this.props.foto.loginUsuario}
              horario={this.props.foto.horario}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo comentario={this.props.foto.comentario}
              foto={this.props.foto}
              curtidas={this.props.foto.likers} 
              comentarios={this.props.foto.comentarios}
              loginUsuario={this.props.foto.loginUsuario}/>
            <FotoAtualizacoes foto={this.props.foto}/>
          </div>            
        );
    }
}