import { LISTAGEM, COMENTARIO, LIKE, PESQUISA, MENSAGEM } from '../constants/actionTypes';

export function listagem(fotos) {
    return { type: LISTAGEM, fotos };
}

export function comenta(fotoId, novoComentario) {
    return { type: COMENTARIO, fotoId, novoComentario };
}

export function like(fotoId, liker) {
    return { type: LIKE, fotoId, liker };
}

export function pesquisa(fotos) {
    return { type: PESQUISA, fotos };
}

export function mensagem(msg) {
    return { type: MENSAGEM, msg };
}