import { Component } from 'react';
import { Button, ConfigProvider, Modal, theme } from 'antd';
import { ExclamationCircleFilled, CheckCircleFilled, WarningOutlined, InfoCircleFilled, CloseCircleFilled, WarningTwoTone, CheckCircleTwoTone, CloseCircleTwoTone, InfoCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

class CustomModal extends Component {
    render() {
        const { visible, type, modalConfig } = this.props;

        let iconClose = false;
        let maskClosable = false;

        let newModalConfig = {
            ...modalConfig,
            okText: modalConfig?.okText || 'Aceptar',
        };

        const showCancelButton = modalConfig?.cancelText && modalConfig.cancelText.trim() !== '' && modalConfig.cancelText !== null;

        switch (type) {
            case 'delete':
                newModalConfig = {
                    ...newModalConfig,
                    icon: <WarningOutlinedIcon sx={{ color: '#a00202ff' }} style={{ fontSize: '30px' }}/>,
                    okType: 'danger',
                };
                break;
            case 'success':
                newModalConfig = {
                    ...newModalConfig,
                    icon: <CheckCircleIcon sx={{ color: '#1f8102ff' }} style={{ fontSize: '30px' }} />,
                    okType: 'primary',
                };
                break;
            case 'error':
                newModalConfig = {
                    ...newModalConfig,
                    icon: <CancelIcon sx={{ color: '#a00202ff' }} style={{ fontSize: '30px' }} />,
                    okType: 'danger',
                };
                break;
            case 'info':
                newModalConfig = {
                    ...newModalConfig,
                    icon: <InfoIcon sx={{ color: '#016796ff' }} style={{ fontSize: '30px' }} />,
                    okType: 'primary',
                };
                break;
            case 'warning':
                newModalConfig = {
                    ...newModalConfig,
                    icon: <ErrorOutlinedIcon sx={{ color: '#ceaf00ff' }} style={{ fontSize: '30px' }} />,
                    okType: 'default',
                };
                break;
            default:
                newModalConfig = {
                    ...newModalConfig,
                    icon: <CheckCircleFilled />,
                    okType: 'primary',
                };
            }

        const footerButtons = [
            <Button key="ok" type={newModalConfig.okType} onClick={newModalConfig.onOk}>
                {newModalConfig.okText}
            </Button>
        ];

        if (showCancelButton) {
            footerButtons.unshift(
                <Button key="cancel" onClick={newModalConfig.onCancel}>
                    {newModalConfig.cancelText}
                </Button>
            );
            iconClose = true;
            maskClosable = true;
        }


        return (
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Modal
                    open={visible}
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {newModalConfig.icon}
                            <span>{newModalConfig.titleModal}</span>
                        </div>
                    }
                    footer={footerButtons}
                    closable={iconClose}
                    maskClosable={maskClosable}
                    // Estilos para asegurar el tema oscuro
                    style={{ top: '20%' }}
                    styles={{
                        body: {
                            padding: '16px 0',
                        },
                        content: {
                            borderRadius: '8px',
                        }
                    }}
                >
                    {newModalConfig.bodyModal}
                </Modal>

                {/* <Modal
                    open={visible}
                    title={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {modalConfig.icon}
                            {title}
                        </span>
                    }
                    closable={iconClose}
                    footer={footerButtons}
                >
                    {content}
                </Modal> */}
            </ConfigProvider>
        );
    }
}

export default CustomModal;
