
import * as React from 'react';
import { Modal, Button, Header, Icon, StrictHeaderProps, ModalProps } from 'semantic-ui-react';

interface IDetailModalProps {
    children?: any
    open?: boolean,
    icon?: string,
    title?: string,
    yesText?: string,
    noText?: string,
    onClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void,
    onYesClick?: () => void,
    onNoClick?: () => void
}

export default function DetailModal(props: IDetailModalProps) {
    return (
        <Modal open={props.open} onClose={props.onClose} closeIcon>
            <Header icon={props.icon} content={props.title} />
            <Modal.Content>
                {props.children}
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={props.onNoClick}>
                    <Icon name='remove' /> {props.noText || 'Hủy'}
                </Button>
                <Button color='green' onClick={props.onYesClick}>
                    <Icon name='checkmark' /> {props.yesText || 'Đồng ý'}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
