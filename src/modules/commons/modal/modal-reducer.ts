import {
    IModalState,
    ModalActionTypes,
    SHOW_MODAL,
    HIDE_MODAL
} from "./types";

const initialState: IModalState = {
    modalType: null,
    modalProps: null
}

const modalReducer = (state: IModalState = initialState, action: ModalActionTypes): IModalState => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps
            };
        case HIDE_MODAL:
            return initialState;
        default:
            return state;
    }
};

export default modalReducer;
