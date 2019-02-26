import HttpService from "./HttpService";

export default class FotoService extends HttpService {
    comentar(idFoto, comentario) {
        return this.post(`https://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`, comentario)
            .then(res => res);
    }

    curtir(idFoto) {
        return this.post(`https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`)
            .then(res => res);
    }

    pesquisar(login) {
        return this.get(`https://instalura-api.herokuapp.com/api/public/fotos/${login}`)
            .then(res => res);

    }
}