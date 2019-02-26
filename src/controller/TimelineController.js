import FotoService from '../service/FotoService';
import TimelineService from '../service/TimelineService';
import { listagem, comenta, like, pesquisa, mensagem } from '../actions/actionCreator';

export default class TimelineController {
  constructor() {
    this._fotoService = new FotoService();
    this._timelineService = new TimelineService();
  }

  lista(login) {
    console.log('Listou!');
    let urlPerfil = 'https://instalura-api.herokuapp.com/api/fotos';
    if (login)
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${login}`;

    return dispatch => {
      this._timelineService.getTimeline(urlPerfil)
        .then(fotos => {
          dispatch(listagem(fotos));
          return fotos;
        });
    }
  }

  comenta(fotoId, textoComentario) {
    return dispatch => {
      this._fotoService.comentar(fotoId, { texto: textoComentario })
        .then(novoComentario => {
          dispatch(comenta(fotoId, novoComentario));
          return novoComentario;
        });
    };
  }

  like(fotoId) {
    return dispatch => {
      this._fotoService.curtir(fotoId)
        .then(liker => {
          dispatch(like(fotoId, liker));
          return liker;
        })
    };
  }

  pesquisa(login) {
    return dispatch => {
      this._fotoService.pesquisar(login)
        .then(fotos => {
          dispatch(pesquisa(fotos));
          if (fotos.length === 0)
            dispatch(mensagem('Usuário não encontrado!'));
          else
            dispatch(mensagem(''));
          return fotos;
        });
    };
  }
}