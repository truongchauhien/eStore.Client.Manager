import * as React from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { IConfirmModalProps } from "../types";
import { bindActionCreators } from "redux";
import { hideModalAction } from "../modal-actions";

const ConfirmModal = (modalProps: IConfirmModalProps) => {
    const { header, content, confirmButton, cancelButton, onConfirm, onCancel, hideModalAction } = modalProps;

    const confirmModalHeader = () => {
        if (!header) {
            return null;
        }

        if (typeof header === 'string') {
            return (<Header icon='question' content={header} />)
        } else {
            return (<Header {...header} />)
        }
    }

    const confirmModalConfirmButton = () => {
        if (!confirmButton) {
            return (
                <Button color='green' onClick={() => { hideModalAction && hideModalAction(); onConfirm && onConfirm() }}>
                    <Icon name='checkmark' /> Đồng ý
                </Button>
            );
        }

        if (typeof confirmButton === 'string') {
            return (
                <Button color='green' onClick={() => { hideModalAction && hideModalAction(); onConfirm && onConfirm() }}>
                    <Icon name='checkmark' /> {confirmButton}
                </Button>
            );
        } else {
            return (
                <Button {...confirmButton} onClick={() => { hideModalAction && hideModalAction(); onConfirm && onConfirm() }} />
            );
        }
    }

    const confirmModalCancelButton = () => {
        if (!cancelButton) {
            return (
                <Button color='red' onClick={() => { hideModalAction && hideModalAction(); onCancel && onCancel() }}>
                    <Icon name='remove' /> Hủy
                </Button>
            );
        }

        if (typeof cancelButton === 'string') {
            return (
                <Button color='red' onClick={() => { hideModalAction && hideModalAction(); onCancel && onCancel() }}>
                    <Icon name='remove' /> {cancelButton}
                </Button>
            );
        } else {
            return (
                <Button {...cancelButton} onClick={() => { hideModalAction && hideModalAction(); onCancel && onCancel() }} />
            );
        }
    }

    return (
        <Modal open={true} onClose={() => { hideModalAction && hideModalAction() }} closeIcon>
            {confirmModalHeader()}
            <Modal.Content >
                {content}
            </Modal.Content>
            <Modal.Actions>
                {confirmModalCancelButton()}
                {confirmModalConfirmButton()}
            </Modal.Actions>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    hideModalAction: bindActionCreators(hideModalAction, dispatch)
})

export default connect(null, mapDispatchToProps)(ConfirmModal);
