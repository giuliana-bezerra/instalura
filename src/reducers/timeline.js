import { LISTAGEM, COMENTARIO, LIKE, PESQUISA } from '../constants/actionTypes';

export function timeline(state = {fotos: []}, action) {
    switch (action.type) {
        case LISTAGEM:
        case PESQUISA:
            return {...state, fotos: action.fotos};
        case COMENTARIO:
            return {
                ...state,
                fotos: state.fotos.map(foto => {
                    if (foto.id === action.fotoId) {
                        return  {
                            ...foto,
                            comentarios: foto.comentarios.concat(action.novoComentario)
                        };
                    } else return foto;
                })
            }
        case LIKE:
            return {
                ...state,
                fotos: state.fotos.map(foto => {
                    if (foto.id === action.fotoId) {
                        return {
                            ...foto,
                            likeada: !foto.likeada,
                            likers: updateLikers(foto, action.liker)
                        }
                    } else return foto;
                })
            }
        default:
            return {...state};
    }
}

function updateLikers(foto, liker) {
    const possivelLiker = foto.likers.find(likerAtual => likerAtual.login === liker.login);
    if (possivelLiker === undefined)
        return foto.likers.concat(liker);
    else
        return foto.likers.filter(likerAtual => likerAtual.login !== liker.login);
}