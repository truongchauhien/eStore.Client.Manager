import { ButtonProps } from "semantic-ui-react";

//#region State types
export const CONFIRM_MODAL = 'CONFIRM_MODAL';
export const MESSAGE_MODAL = 'MESSAGE_MODAL';

export interface IConfirmModalProps {
    onConfirm?: () => void,
    onCancel?: () => void,
    header?: string | {
        content?: string,
        icon: string
    },
    content?: string
    confirmButton?: string | ButtonProps,
    cancelButton?: string | ButtonProps,
    [key: string]: any
}

export interface IMessageModalProps {
    onConfirm?: () => void
}

export type ModalTypes = {
    modalType: typeof CONFIRM_MODAL,
    modalProps: IConfirmModalProps
} | {
    modalType: typeof MESSAGE_MODAL,
    modalProps: IMessageModalProps
};

export interface IModalState {
    modalType: ModalTypes['modalType'],
    modalProps: ModalTypes['modalProps']
};

//#endregion

//#region Action types
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

interface IShowModalAction {
    type: typeof SHOW_MODAL,
    payload: ModalTypes
}

interface IHideModalAction {
    type: typeof HIDE_MODAL
}

export type ModalActionTypes = IShowModalAction | IHideModalAction;

//#endregion
