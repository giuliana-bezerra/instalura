import { MENSAGEM } from "../constants/actionTypes";

export function mensagem(state='', action)  {
    switch (action.type) {
        case MENSAGEM:
            return action.msg;
        default:
            return state;
    }
}