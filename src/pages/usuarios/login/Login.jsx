/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Paper, Typography } from '@mui/material';
import { ConfigProvider, Spin, theme } from 'antd';
import NotificationWrapper, { openNotification } from '../../../components/NotificationWrapper';
import config from '../../../ENV/env';
import Title from './TitleLogin';
import LoginForm from './LoginForm';
import CustomModal from '../../../components/Modales';
import { Navigate } from 'react-router-dom';
import { withRouter } from '../../../components/withRouter.jsx';


const { defaultAlgorithm, darkAlgorithm } = theme;

class Login extends Component {

    state = {
        title: 'Login',
        idUser: [],
        userLog: {
            username: '',
            password: '',
            repeat_password: '',
        },
        isRegister: false,
        showPassword: false,
        isLoader: false,
        messageLoader: '',
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
        url: config.urlBack,
        isDarkMode: true,
    }

    handleClickShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    handleFormAsisChange = (e) => {
        this.setState({
            userLog: {
                ...this.state.userLog,
                [e.name]: e.value
            }
        });
    };

    clearForm = () => {
        this.setState({
            userLog: {
                username: '',
                password: '',
                repeat_password: '',
            }
        });
    }

    openNotificationWithIcon = (type, titleNoti, messageNoti) => {
        openNotification(type, titleNoti, messageNoti);
    };

    OnOffLoader = (loader, message) => {
        this.setState({
            isLoader: loader,
            messageLoader: message
        });
    };

    registerClick = () => {
        const { isRegister } = this.state;
        this.setState({ isRegister: !isRegister });
        this.setState({ title: isRegister ? 'Login' : 'Register' });
    }

    handleSubmitLogin = async (e) => {
        const { url, isRegister, userLog } = this.state;
        e.preventDefault();
        if (isRegister === true) {
            this.OnOffLoader(true, 'Guardando Usuario...');
        } else {
            this.OnOffLoader(true, 'Iniciando sesión, espere...');
        }


        console.log('Datos a enviar: ', userLog);
        try {
            let response;
            let username = userLog.username.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
            let password = userLog.password.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
            let data;
            if (isRegister === true) {
                data = {
                    username: username,
                    password: password,
                    repeat_password: userLog.repeat_password.trim().replace(/[\u200B-\u200D\uFEFF]/g, '')
                };
                response = await fetch(`${url}/auth/register`, {
                    method: 'POST',
                    body: JSON.stringify(userLog),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                data = {
                    username: username,
                    password: password,
                };
                response = await fetch(`${url}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            this.OnOffLoader(false, '');
            const resp = await response.json()
            if (response.status === 422) {
                resp.error.forEach(e => {
                    console.error(e)
                });
                const mensajes = resp.error.map((err) => err.message);
                const resultado = mensajes.join('\n');
                this.openNotificationWithIcon('error', 'Verifique los datos', resultado);
                return;
            } else if (response.status === 409) {
                console.error(resp.error);
                this.openNotificationWithIcon('error', 'Error al registrar', resp.error);
                return;

            } else if (response.status === 401) {
                console.error(resp.error);
                this.openNotificationWithIcon('error', 'Error al iniciar sesión', resp.error);
                return;

            } else if (response.ok) {
                if (isRegister === true) {
                    console.log(response.status);
                    console.log('ID del Userlog creado: ' + resp.result.insertId, resp.result.token);
                    this.openNotificationWithIcon(
                        'success',
                        `Registro exitoso`,
                        resp.mensaje);
                    this.clearForm();
                    this.setState({ isRegister: false });

                } else {
                    console.log(response.status);
                    console.log('Inicio de sesión exitoso: ', resp.result.token);
                    this.openNotificationWithIcon(
                        'success',
                        `Inicio de sesión exitoso`,
                        resp.mensaje);
                    this.clearForm();
                    this.props.updateAuthentication(resp.authenticated, resp.user);
                    this.props.navigate('/admin/adminpanel', { replace: true });
                }
            } else {
                throw new Error(resp.error || 'Error del servidor');
            }

        } catch (e) {
            this.OnOffLoader(false, '');
            this.openNotificationWithIcon('error', 'Error con el servidor', e.message);
        }
    }

    render() {
        const { isDarkMode, title } = this.state;
        const { isAuth } = this.props;
        if (isAuth) {
            return <Navigate to={'/admin/adminpanel'} replace={true} />;
        }
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

                        <Title title={title} />

                        <NotificationWrapper />

                        <Container sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '70%' }, // ✅ Más ancho en desktop
                            my: 2,
                            color: 'rgb(255, 255, 255)',
                        }}>
                            <Box sx={{
                                width: { xs: '90%', md: '100%' }, // ✅ En desktop ocupa todo el ancho disponible
                                margin: '0 auto',
                            }}>
                                <Paper sx={{
                                    backgroundColor: 'rgba(32, 31, 31, 0.3)',
                                    padding: 2,
                                    borderRadius: 4,
                                    color: 'rgb(255, 255, 255)'
                                }}
                                    elevation={3}>

                                    <LoginForm
                                        userLog={this.state.userLog}
                                        isRegister={this.state.isRegister}
                                        showPassword={this.state.showPassword}
                                        registerClick={this.registerClick}
                                        handleSubmitLogin={(e) => this.handleSubmitLogin(e)}
                                        handleFormAsisChange={(name, e) => this.handleFormAsisChange(name, e)}
                                        handleClickShowPassword={this.handleClickShowPassword}
                                        handleMouseDownPassword={(event) => this.handleMouseDownPassword(event)}
                                        handleMouseUpPassword={(event) => this.handleMouseUpPassword(event)}
                                    />

                                </Paper>
                            </Box>
                        </Container>

                        <CustomModal
                            visible={this.state.showModal}
                            type={this.state.typeModal}
                            modalConfig={this.state.modalConfig}
                        />

                        <Spin spinning={this.state.isLoader} tip={this.state.messageLoader} fullscreen />

                    </motion.div >
                </Container >

            </ConfigProvider>
        )
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(Login);