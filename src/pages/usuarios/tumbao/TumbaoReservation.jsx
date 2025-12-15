import React, { Component } from 'react';
import Title from './TitleTumbao';
import { Box, Container, Paper } from '@mui/material';
/* eslint-disable */
import { motion } from 'framer-motion';
/* eslint-enable */
import TumFormCase0 from './TumFormCase0';
import CustomModal from '../../../components/Modales';
import TumFormCase1 from './TumFormCase1';
import TumFormCase2 from './TumFormCase2';
import TumFormCase3 from './TumFormCase3';
import config from '../../../ENV/env';
import NotificationWrapper, { openNotification } from '../../../components/NotificationWrapper';
import { ConfigProvider, Spin, theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

class TumbaoReservation extends Component {

  state = {
    nameReservation: '',
    id_reservation: null,
    id_typeReservation: 1,
    numAsistentes: '',
    idsUsers: [],
    asistente: {
      name: '',
      lastname: '',
      email: '',
      id_event: 1,
    },
    asistentes: [],
    id_payMethod: '',
    payMethod: '',
    estado: 0,
    contador: 1,
    error: [],
    errorMensaje: '',
    idQrs: [],
    QRs: [],
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
    // urlReserv: 'http://localhost:50947/reservation', 
    // urlReserv: 'http://192.168.100.202:50947/reservation',
    // urlAsis: 'http://192.168.100.202:50947/user',
    url: config.urlBack,
    isDarkMode: true,
  }

  updateIdReservation = (value) => {
    this.setState({ id_reservation: value });
  }

  updateEstado = (value) => {
    this.setState({ estado: value });
  }

  updateContador = (value) => {
    this.setState({ contador: value });
  }

  updateError = (value) => {
    this.setState({ error: value });
  }

  updateErrorMensaje = (value) => {
    this.setState({ errorMensaje: value });
  }

  updateIdsUsers = (value) => {
    this.setState({
      idsUsers: [...this.state.idsUsers, value]
    });
    console.log('IDs guardados: ', this.state.idsUsers);
  }

  updateQrs = (value) => {
    this.setState({
      idQrs: value
    });
    console.log('QRs guardados: ', this.state.idQrs)
  }

  updatePayMethod = (value) => {
    if (value == 1) {
      this.setState({ payMethod: 'Pagar online' });
    } else {
      this.setState({ payMethod: 'Pagar al llegar al evento' });
    }
  }

  handleFormReservChange = (name, value) => {
    this.setState({ [name]: value });
  }

  handleFormAsisChange = (e) => {
    this.setState({
      asistente: {
        ...this.state.asistente,
        [e.name]: e.value
      }
    });
  }

  handlePayChange = (value) => {
    this.setState({ id_payMethod: value });
  }

  getAsis = async () => {
    const { idsUsers, url } = this.state
    console.log(idsUsers, JSON.stringify(idsUsers))
    try {
      const response = await fetch(`${url}/usuario/usersID`, {
        method: 'POST',
        body: JSON.stringify(idsUsers),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const users = await response.json();
      console.log(users, users.result)
      this.setState({ asistentes: users.result });
    } catch (e) {
      this.openNotificationWithIcon('error', 'Error al consultar asistentes', e.message);
      console.log('Error al consultar los usuarios recien generados. ', e.message);
    }
    this.OnOffLoader(false, '');
    this.updateEstado(2);
    this.closeModal();
  }

  getQRs = async () => {
    const { idQrs, url } = this.state
    console.log(idQrs, JSON.stringify(idQrs))
    try {
      const response = await fetch(`${url}/usuario/qrsID`, {
        method: 'POST',
        body: JSON.stringify(idQrs),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const qrs = await response.json();
      console.log(qrs, qrs.result);
      this.setState({ QRs: qrs.result });
    } catch (e) {
      this.openNotificationWithIcon('error', 'Error al consultar reservación', e.message);
      console.log('Error al consultar los QR recien generados. ', e.message);
    }
    this.OnOffLoader(false, '');
    this.updateEstado(3);
    this.closeModal();
  }

  clearFormAsis = () => {
    this.setState({
      asistente: {
        name: '',
        lastname: '',
        email: '',
        id_event: 1,
      }
    });
    console.log('Form Asistente limpiado')
  };

  clearForm0 = () => {
    this.setState({
      nameReservation: '',
      numAsistentes: '',
    });
  };

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

  openNotificationWithIcon = (type, titleNoti, messageNoti) => {
    openNotification(type, titleNoti, messageNoti);
  };

  OnOffLoader = (loader, message) => {
    this.setState({
      isLoader: loader,
      messageLoader: message
    });
  };

  handleSubmitReservation = async (e) => {
    e.preventDefault();
    this.OnOffLoader(true, 'Creando Reservación...');
    const data = {
      nameReservation: this.state.nameReservation,
      id_event: 1,
      id_typeReservation: this.state.id_typeReservation
    }

    // Aquí puedes enviar los datos al backend
    console.log('Enviando datos:', data);
    console.log(`${this.state.url}/usuario/reservation`);

    try {
      const response = await fetch(`${this.state.url}/usuario/reservation`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.OnOffLoader(false, '');
      const resp = await response.json()
      if (response.status === 422) {
        this.updateError(resp.error)
        resp.error.forEach(e => {
          console.error(e)
        });
        const mensajes = resp.error.map((err) => err.message);
        const resultado = mensajes.join('\n');
        this.openNotificationWithIcon('error', 'Verifica los datos', resultado);
        return;

      } else if (response.ok) {
        console.log(response.status)
        console.log('ID de la reservación creada: ' + resp.result.insertId)
        this.updateEstado(1);
        this.updateIdReservation(resp.result.insertId);
        this.openNotificationWithIcon('success', `Reservación creada a nombre de ${this.state.nameReservation}`, 'Por favor ingresa nombre, apellido y correo de los asistentes.');
        return;

      } else if (response.status === 409) {
        console.error(resp.error);
        this.updateErrorMensaje(resp.error);
        this.openNotificationWithIcon('error', 'Error con el asistente', resp.error);
        return;
      }

    } catch (e) {
      this.OnOffLoader(false, '');
      console.error(e, e.message);
      this.openNotificationWithIcon('error', 'Error con el servidor', e.message);
    }

  };

  handleSubmitUser = async (e) => {
    const { asistente, url, contador, numAsistentes, idsUsers } = this.state;
    e.preventDefault();
    this.OnOffLoader(true, 'Guardando Usuario...');
    this.setState({ errorMensaje: '' });
    this.setState({ error: [] });
    const data = {
      name: asistente.name,
      lastname: asistente.lastname,
      email: asistente.email,
      id_event: asistente.id_event,
      idsUsers: idsUsers
    }
    console.log('Datos a enviar: ', data);

    try {
      const response = await fetch(`${url}/usuario/user`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.OnOffLoader(false, '');
      const resp = await response.json()
      if (response.status === 422) {
        this.updateError(resp.error)
        resp.error.forEach(e => {
          console.error(e)
        });
        const mensajes = resp.error.map((err) => err.message);
        const resultado = mensajes.join('\n');
        this.openNotificationWithIcon('error', 'Verifique los datos', resultado);
        return;
      } else if (response.status === 409) {
        console.error(resp.error);
        this.updateErrorMensaje(resp.error);
        this.openNotificationWithIcon('error', 'Error con el asistente', resp.error);
        return;

      } else if (response.ok) {
        if (contador == numAsistentes) {
          console.log('Iteración num: ', contador, ' Asistentes Totales: ', numAsistentes);
          console.log(response.status);
          console.log('ID del Asistente creado: ' + resp.result.insertId);
          this.updateIdsUsers(resp.result.insertId);
          this.openModal({
            typeModal: 'success',
            titleModal: `Asistente ${contador} creado`,
            bodyModal: 'Todos los asistentes han sido regitrados con éxito',
            okText: 'Continuar',
            cancelText: '',
            onOk: () => {
              this.clearFormAsis();
              this.OnOffLoader(true, 'Obteniendo información de los asistentes...');
              this.getAsis();
            },
            onCancel: () => {
              this.closeModal();
            }
          });

        } else {
          console.log(response.status);
          console.log('ID del Asistente creado: ' + resp.result.insertId);
          this.updateIdsUsers(resp.result.insertId);
          this.clearFormAsis();
          this.updateContador(contador + 1);
          this.openNotificationWithIcon(
            'success',
            `Asistente ${contador} creado`,
            'Por favor ingresa nombre, apellido y correo de los asistentes restantes');
        }
      }

    } catch (e) {
      this.OnOffLoader(false, '');
      this.setState({ "error": [{ "message": "Error de conexión con el servidor" + e.message, }] });
      this.openNotificationWithIcon('error', 'Error con el servidor', e.message);
    }
  }

  omitirUsuario = () => {
    const { contador, numAsistentes } = this.state;
    if (contador === 1) {
      console.log('No se puede omitir este usuario porque es el primer usuario a registrar');
      this.openNotificationWithIcon(
        'error',
        `Asistente ${contador}`,
        'No se puede omitir este usuario porque es el primer usuario a registrar');
    } else {
      console.log('Se omitió el registro de un usuario');
      this.clearFormAsis();
      if (contador == numAsistentes) {
        console.log('Iteración num: ', contador, ' Asistentes Totales: ', contador -1);
        this.openModal({
          typeModal: 'success',
          titleModal: `Asistente ${contador} omitido`,
          bodyModal: 'Todos los asistentes han sido regitrados con éxito',
          okText: 'Continuar',
          cancelText: '',
          onOk: () => {
            this.clearFormAsis();
            this.OnOffLoader(true, 'Obteniendo información de los asistentes...');
            this.getAsis();
          },
        });
      } else {
        this.openNotificationWithIcon(
        'success',
        `Asistente ${contador} omitido`,
        `Se omitió el registro del usuario ${contador} `);
        this.updateContador(contador + 1);
      }
    }
  }

  createQrClick = async (e) => {
    e.preventDefault();
    this.OnOffLoader(true, 'Generando Códigos QR...');
    const { id_reservation, id_payMethod, idsUsers, url, nameReservation, idQrs } = this.state;
    console.log('id_payMethod', id_payMethod);
    const datas = [];
    for (const id of idsUsers) {
      const data = {
        id_user: id,
        id_reservation: id_reservation,
        id_payMethod: id_payMethod,
        id_payStatus: 2,
      }
      datas.push(data)
      console.log('Data: ', data)
    }

    if (id_payMethod == 0 || id_payMethod == 'Selecciona una opción') {
      this.OnOffLoader(false, '');
      this.openNotificationWithIcon(
        'error',
        'Error',
        'Por favor selecciona un método de pago válido');

    } else {
      this.updatePayMethod(id_payMethod);
      console.log('Data final a enviar: ', datas);
      try {
        const response = await fetch(`${url}/usuario/qr`, {
          method: 'POST',
          body: JSON.stringify(datas),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.OnOffLoader(false, '');
        console.log('response', response);
        const resp = await response.json();
        console.log('resp', resp);
        console.log('QRs', resp.qrIDs)

        if (response.status == 500) {
          console.error(resp.error);
          throw new Error(resp.mensaje, resp.error || 'Error del servidor');
        } else {
          this.updateQrs(resp.qrIDs);
          console.log(idQrs);
          this.openModal({
            typeModal: 'success',
            titleModal: '¡¡Felicidades!!',
            bodyModal: `Reservación a nombre de ${nameReservation} creada exitosamente`,
            okText: 'Finalizar',
            cancelText: '',
            onOk: () => {
              this.OnOffLoader(true, 'Obteniendo información de la reservación...');
              this.getQRs();
              this.clearFormAsis();
            },
            onCancel: () => {
              this.closeModal();
            }
          });

        }

      } catch (error) {
        this.OnOffLoader(false, '');
        console.log(error);
        this.setState({ "error": [{ "message": "Error de conexión con el servidor" + error }] });
        this.openNotificationWithIcon('error', 'Error con el servidor', error.message);
      }
    }
  }

  render() {
    const { estado, isDarkMode } = this.state
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

                  {(() => {
                    switch (estado) {
                      case 0:
                        return (
                          <TumFormCase0
                            // error={this.state.error}
                            nameReservation={this.state.nameReservation}
                            numAsistentes={this.state.numAsistentes}
                            // errorMensaje={this.state.errorMensaje}
                            handleFormReservChange={(name, e) => this.handleFormReservChange(name, e)}
                            handleSubmitReservation={(e) => this.handleSubmitReservation(e)}
                          />
                        )

                      case 1:
                        return (
                          <TumFormCase1
                            nameReservation={this.state.nameReservation}
                            numAsistentes={this.state.numAsistentes}
                            asistente={this.state.asistente}
                            error={this.state.error}
                            errorMensaje={this.state.errorMensaje}
                            contador={this.state.contador}
                            handleSubmitUser={(e) => this.handleSubmitUser(e)}
                            handleFormAsisChange={(name, e) => this.handleFormAsisChange(name, e)}
                            omitirUsuario={this.omitirUsuario}
                          />
                        )

                      case 2:
                        return (
                          <TumFormCase2
                            nameReservation={this.state.nameReservation}
                            asistentes={this.state.asistentes}
                            id_payMethod={this.state.id_payMethod}
                            handlePayChange={(e) => this.handlePayChange(e)}
                            createQrClick={(e) => this.createQrClick(e)}
                          />
                        )
                      case 3:
                        return (
                          <TumFormCase3
                            nameReservation={this.state.nameReservation}
                            payMethod={this.state.payMethod}
                            QRs={this.state.QRs}
                          />
                        )
                      default:
                        return <AsistantDefault></AsistantDefault>
                    }
                  })()}
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
export default TumbaoReservation
