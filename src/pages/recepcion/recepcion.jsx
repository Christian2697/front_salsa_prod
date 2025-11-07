import { Component } from 'react';
import Title from './TitleRecepcion';
import { Box, Container, Paper, } from '@mui/material';
/* eslint-disable */
import { motion } from 'framer-motion';
/* eslint-enable */
import { Input, ConfigProvider, theme, Empty, Button, Typography, Spin } from 'antd';
import NotificationWrapper, { openNotification } from '../../components/NotificationWrapper';
import CustomModal from '../../components/Modales';
import ReservacionEncontrada from './ReservacionEncontrada';
import config from '../../ENV/env';


const { Search } = Input;

const { defaultAlgorithm, darkAlgorithm } = theme;

class Recepcion extends Component {

    state = {
        qrHash: '',
        QRs: [],
        url: config.urlBack,
        isDarkMode: true,
        isLoader: false,
        messageLoader: '',
        searchValue: '',
        inputBuffer: '',
        bufferTimer: null,
        colorPay: 'rgba(32, 31, 31, 0.3)',
        txtButton: '',
        showModal: false,
        typeModal: '',
        modalConfig: {
            titleModal: '',
            bodyModal: '',
            okText: '',
            cancelText: '',
            onOk: () => { },
            onCancel: () => { },
        },
    }

    openNotificationWithIcon = (type, titleNoti, messageNoti) => {
        openNotification(type, titleNoti, messageNoti);
    };

    OnOffLoader = (loader, message) => {
        this.setState({
            isLoader: loader,
            messageLoader: message
        });
    }

    openModal = ({
        typeModal = '',
        titleModal = '',
        bodyModal = '',
        okText = 'Aceptar',
        cancelText = '',
        onOk = () => { },
        onCancel = () => this.closeModal()
    }) => {
        this.setState({
            showModal: true,
            typeModal,
            modalConfig: {
                titleModal,
                bodyModal,
                okText,
                cancelText,
                onOk,
                onCancel,
            }
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
            typeModal: '',
            modalConfig: {}
        });
    };

    isPay = () => {
        const { QRs } = this.state;

        // Si QRs está vacío, usar color por defecto
        if (!QRs || QRs.length === 0) {
            this.setState({ colorPay: 'rgba(32, 31, 31, 0.3)' });
            console.log('no hay QR');
            return;
        }

        const attendStatus = QRs[0]?.userAttend;
        console.log('Asistencia encontrada:', attendStatus);

        if (attendStatus == 1) {
            this.setState({ colorPay: 'rgba(110, 18, 18, 0.3)' });
            this.openNotificationWithIcon('warning', 'Usuario ya ingresado', 'Ya se ha confirmado la asistencia de este usuario.');
            return;
        }

        const payStatus = QRs[0]?.payStatus;
        console.log('PayStatus encontrado:', payStatus);

        if (payStatus === 'Completado') {
            this.setState({ colorPay: 'rgba(11, 85, 23, 0.3)' });
            this.setState({ txtButton: 'Confirmar asistencia' });
            console.log('payStatus completado');
        } else if (payStatus === 'Pendiente') {
            this.setState({ colorPay: 'rgba(184, 134, 11, 0.3)' }); // Amarillo-naranja tenue
            this.setState({ txtButton: 'Confirmar pago y asistencia' });
            console.log('payStatus pendiente');
        } else {
            this.setState({ colorPay: 'rgba(32, 31, 31, 0.3)' });
            console.log('payStatus indefinido');
        }
    }

    handleSearchChange = (value) => {
        this.setState({ qrHash: value });
    }

    handleScannerInput = (e) => {
        const value = e.target.value;

        // Limpiar timer anterior
        if (this.state.bufferTimer) {
            clearTimeout(this.state.bufferTimer);
        }

        this.setState({
            inputBuffer: value
        }, () => {
            // Esperar 100ms después de la última entrada
            const timer = setTimeout(() => {
                this.processCompleteInput(this.state.inputBuffer);
            }, 100);

            this.setState({ bufferTimer: timer });
        });
    };

    processCompleteInput = (completeValue) => {
        console.log('Valor completo recibido:', completeValue);
        this.setState({
            searchValue: completeValue
        });
        // Aquí tu lógica de búsqueda
        
    };

    consultQR = async (searchValue) => {
        const { url } = this.state;

        const data = {
            qrHash: searchValue
        };

        console.log('1. Iniciando búsqueda QR:', searchValue);

        try {
            const response = await fetch(`${url}/admin/recep-qr`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('2. Fetch completado. Status:', response.status);
            this.OnOffLoader(false, '');

            // Siempre esperar JSON
            const resp = await response.json();
            console.log('3. Respuesta JSON:', resp);

            if (response.ok) {
                // Si response.ok es true (status 200-299)

                this.setState({
                    QRs: resp.result || [],
                    qrHash: searchValue
                });

                if (resp.result.length === 0) {
                    this.openModal({
                        typeModal: 'error',
                        titleModal: 'Sin resultados',
                        bodyModal: 'No se encontraron reservaciones para este QR',
                        okText: 'Aceptar',
                        onOk: () => {
                            this.closeModal();
                            this.setState({ qrHash: '' });
                        }
                    });
                }
                console.log(this.state.QRs);
            } else {
                // Si el servidor respondió con error pero envió JSON
                throw new Error(resp.mensaje || 'Error del servidor');
            }

        } catch (e) {
            console.log('4. Error:', e);
            this.OnOffLoader(false, '');
            this.openModal({
                typeModal: 'error',
                titleModal: 'Error',
                bodyModal: e.message,
                okText: 'Aceptar',
                onOk: () => {
                    this.closeModal();
                    this.setState({ QRs: [], qrHash: '' });
                }
            });
        }
    }

    onSearch = async (value, _e, info) => {
        console.log('=== INICIANDO ONSEARCH ===');
        console.log('Valor de búsqueda:', value);
        console.log('Fuente:', info?.source);

        if (!value || value.trim() === '') {
            console.log('Valor vacío, limpiando resultados');
            this.setState({ QRs: [], qrHash: '' });
            return;
        }

        console.log('Llamando a consultQR...');
        this.OnOffLoader(true, 'Buscando QR...');
        await this.consultQR(value);
        console.log('=== FINALIZANDO ONSEARCH ===');
    }

    onClickConfirm = (e) => {
        e.preventDefault();
        const { QRs } = this.state
        const payStatus = QRs[0]?.payStatus;
        console.log('PayStatus encontrado:', payStatus);
        console.log(QRs[0].qr_reservation);

        if (payStatus === 'Completado') {
            this.openModal({
                typeModal: 'warning',
                titleModal: '¿Confirmar?',
                bodyModal: `¿Seguro que deseas confirmar la asistencia de ${QRs[0].name} ${QRs[0].lastname} para el evento ${QRs[0].event_name}?`,
                okText: 'Aceptar',
                cancelText: 'Cancelar',
                onOk: async () => {
                    this.OnOffLoader(true, 'Espere...');
                    this.closeModal();
                    await this.fetchConfirm();
                    this.setState({ qrHash: '' });
                },
                onCancel: () => {
                    this.closeModal();
                }
            });
            console.log('payStatus completado');
        } else if (payStatus === 'Pendiente') {
            this.openModal({
                typeModal: 'warning',
                titleModal: '¿Confirmar?',
                bodyModal: `¿Seguro que deseas confirmar la asistencia y el pago de ${QRs[0].name} ${QRs[0].lastname} para el evento ${QRs[0].event_name}?`,
                okText: 'Aceptar',
                cancelText: 'Cancelar',
                onOk: async () => {
                    this.closeModal();
                    await this.fetchConfirm();
                    this.setState({ qrHash: '' });
                },
                onCancel: () => {
                    this.closeModal();
                }
            });
            console.log('payStatus pendiente');
        } else {
            this.setState({ colorPay: 'rgba(32, 31, 31, 0.3)' });
            console.log('payStatus indefinido');
        }
    }

    fetchConfirm = async () => {
        const { QRs, url } = this.state
        const data = {
            statusPago: 1,
            asistencia: 1,
            qr: QRs[0].qr_reservation
        }

        try {
            const response = await fetch(`${url}/admin/update-recep`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('2. Fetch completado. Status:', response.status);
            this.OnOffLoader(false, '');

            // Siempre esperar JSON
            const resp = await response.json();
            console.log('3. Respuesta JSON:', resp);

            if (response.ok) {
                // Si response.ok es true (status 200-299)
                this.setState({
                    QRs: [],
                    qrHash: ''
                });
                this.openNotificationWithIcon('success', 'Actualización exitosa', 'Se ha confirmado correctamente la asistencia del usuario');
                console.log('Usuario actualizado correctamente');
            } else {
                // Si el servidor respondió con error pero envió JSON
                throw new Error(resp.mensaje || 'Error del servidor');
            }

        } catch (e) {
            console.log('4. Error:', e);
            this.OnOffLoader(false, '');
            this.openModal({
                typeModal: 'error',
                titleModal: 'Error',
                bodyModal: e.message,
                okText: 'Aceptar',
                onOk: () => {
                    this.closeModal();
                    this.setState({ QRs: [], qrHash: '' });
                }
            });
            this.openNotificationWithIcon('error', 'Error', e.message);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.QRs !== this.state.QRs) {
            console.log('El QR ha cambiado');
            this.isPay();
        }
    }

    render() {
        const { QRs, isDarkMode, txtButton, isLoader, messageLoader } = this.state

        return (
            <ConfigProvider theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}>
                <Container sx={{
                    position: 'relative',
                    width: '100%',
                    px: 0,
                    py: 4
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.7 }}
                    >

                        <Title />

                        <NotificationWrapper />

                        <Container sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                            my: 2,
                            color: 'rgb(255, 255, 255)',
                        }}>
                            <Box sx={{
                                width: { xs: '90%', md: '100%' },
                                margin: '0 auto',
                            }}>

                                <Search
                                    placeholder="Buscar reservación..."
                                    allowClear
                                    //value={this.state.qrHash}
                                    //onInput={(e) => this.handleSearchChange(e.target.value)}
                                    //onChange={(e) => this.handleSearchChange(e.target.value)}
                                    onSearch={this.onSearch}
                                    style={{ width: '100%', maxWidth: 400 }}
                                    size="large"
                                />

                            </Box>
                        </Container>

                        <Container sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                            my: 2,
                            color: 'rgb(255, 255, 255)',
                        }}>
                            <Box sx={{
                                width: { xs: '90%', md: '100%' },
                                margin: '0 auto',
                            }}>
                                <Paper sx={{
                                    backgroundColor: 'rgba(32, 31, 31, 0.3)',
                                    padding: 2,
                                    borderRadius: 4,
                                    color: 'rgb(255, 255, 255)'
                                }}
                                    elevation={3}>

                                    {QRs.length === 0
                                        ?
                                        <Empty />
                                        :
                                        <ReservacionEncontrada
                                            QRs={this.state.QRs}
                                            colorPay={this.state.colorPay}
                                        />
                                    }

                                    {QRs.length === 0
                                        ?
                                        null
                                        :
                                        <Box>
                                            {QRs[0].userAttend === 1
                                                ?
                                                <Box />
                                                :
                                                <Box>
                                                    <Button
                                                        color="cyan"
                                                        variant="solid"
                                                        onClick={(e) => this.onClickConfirm(e)}
                                                        sx={{
                                                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                                            padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
                                                            minWidth: { xs: '100px', sm: '120px', md: '140px' },
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        <Typography sx={{
                                                            textAlign: 'center',
                                                            fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                                                        }}>
                                                            {txtButton}
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                            }
                                        </Box>
                                    }


                                </Paper>
                            </Box>
                        </Container>

                        <CustomModal
                            visible={this.state.showModal}
                            type={this.state.typeModal}
                            modalConfig={this.state.modalConfig}
                        />

                        <Spin spinning={isLoader} tip={messageLoader} fullscreen />

                    </motion.div >
                </Container >
            </ConfigProvider>
        )
    }
}

export default Recepcion;