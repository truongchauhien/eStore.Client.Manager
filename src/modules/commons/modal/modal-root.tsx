import * as React from 'react';
import { connect } from "react-redux";
import { ModalTypes, CONFIRM_MODAL, MESSAGE_MODAL, IConfirmModalProps, IModalState } from "./types";
import { Modal, Button, Header } from 'semantic-ui-react';
import ConfirmModal from './confirm-modal/confirm-modal';
import { AppState } from '../../../rootReducer';

const ModalRoot = ({ modalType, modalProps }: IModalState): JSX.Element => {
    if (!modalType) {
        return null;
    }

    switch (modalType) {
        case CONFIRM_MODAL:
            return (
                <ConfirmModal {...modalProps} />
            );
        case MESSAGE_MODAL:
            return (<div></div>);
        default:
            return null;
    }
}

const mapStateToProps = (state: AppState) => state.modal

export default connect(mapStateToProps, null)(ModalRoot);
