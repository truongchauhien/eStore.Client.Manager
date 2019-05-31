import { ModalTypes, ModalActionTypes, HIDE_MODAL, SHOW_MODAL } from "./types";

export const showModalAction = (payload: ModalTypes): ModalActionTypes => {
    return {
        type: SHOW_MODAL,
        payload: payload
    }
}

export const hideModalAction = (): ModalActionTypes => {
    return {
        type: HIDE_MODAL
    }
}
