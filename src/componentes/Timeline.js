import React, { Component } from 'react';
import FotoItem from './Foto';
import TimelineController from '../controller/TimelineController';
import { store } from '../store';
import { connect } from 'react-redux';

const controller = new TimelineController();

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.login = this.props.login;
  }

  componentDidMount() {
    this.props.lista(this.login);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.login) {
      this.login = nextProps.login;
      this.props.lista(this.login);
    }
  }

  render() {
    console.log('Render');
    return (
      <div className="fotos container">
          {
            this.props.fotos.map(foto => 
              <FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta} />
            )
          }
      </div>
    );
  }
}

// Todos os objetos do estado.
const mapStateToProps = state => {
  return {
    fotos: state.timeline.fotos
  };
};

// Todos os comportamentos que mudam o estado.
const mapDispatchToProps = dispatch => {
  return {
    like: fotoId => store.dispatch(controller.like(fotoId)),
    comenta: (fotoId, textoComentario) =>
      store.dispatch(
        controller.comenta(fotoId, textoComentario)
      ),
    lista: (login) => store.dispatch(controller.lista(login, store))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);