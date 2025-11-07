import { Component } from 'react';
import { Alert, ConfigProvider, theme } from 'antd';

class CustomAlert extends Component {
    render() {
        const { typeAlert, titleAlert, contentAlert } = this.props;

        let alertType = '';

        switch (typeAlert) {
            case 'warning':
                alertType = 'warning';
                break;
            case 'success':
                alertType = 'success';
                break;
            case 'error':
                alertType = 'error';
                break;
            case 'info':
                alertType = 'info';
                break;
            default:
                alertType = 'info';
        }


        return (
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Alert
                    message={titleAlert}
                    description={contentAlert}
                    type={alertType} 
                    showIcon
                    banner
                />
            </ConfigProvider>
        );
    }
}

export default CustomAlert;