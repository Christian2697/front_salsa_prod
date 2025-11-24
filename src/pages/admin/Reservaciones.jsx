/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Box, Container, Paper, } from '@mui/material';
import { motion } from 'framer-motion';
import { Input, ConfigProvider, theme, Button, Spin, Tooltip } from 'antd';
import NotificationWrapper, { openNotification } from '../../components/NotificationWrapper';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomModal from '../../components/Modales';
import Title from './TitleAdmin';
import config from '../../ENV/env';
import UsuariosForm from './UsuariosForm';
import ReservacionesList from './ReservacionesList';
// import modal from '../../components/ModalCustom'

const { Search } = Input;

const { defaultAlgorithm, darkAlgorithm } = theme;

class Reservaciones extends Component {

    state = {
        estado: 0,
        titleAdmin: 'Reservaciones',
        searchParams: '',
        reservation: {},
        url: config.urlBack,
        isDarkMode: true,
        isAdd: false,
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
        reservaciones: [],
        tableParams: {
            pagination: {
                current: 1,
                pageSize: 5,
            },
        },
        columns: [
            {
                title: 'id',
                dataIndex: 'id_reservation',
                // width: '10%',
            },
            {
                title: 'Fecha de creación',
                dataIndex: 'reservationDate',
                sorter: true,
                // width: '20%',
            },
            {
                title: 'Nombre de la Reservación',
                dataIndex: 'nameReservation',
                sorter: true,
                // width: '20%',
            },
            {
                title: 'Evento',
                dataIndex: 'event_name',
                filters: [
                    {
                        text: 'Tumbao',
                        value: 'Tumbao',
                    },
                    {
                        text: 'Xtreme',
                        value: 'Xtreme',
                    },
                    {
                        text: 'Rumba',
                        value: 'Rumba',
                    },
                    {
                        text: 'Salsa',
                        value: 'Salsa',
                    },

                ],
                // onFilter: (value, record) => record.event_name.indexOf(value) === 0,
            },
            {
                title: 'Tipo de Reservación',
                dataIndex: 'typeReservation',
                filters: [
                    {
                        text: 'Preventa',
                        value: 'Preventa',
                    },
                    {
                        text: 'Cortesía',
                        value: 'Cortesía',
                    },
                    {
                        text: 'Bailarines',
                        value: 'Bailarines',
                    },

                ],
            },
            {
                title: '# Mesa Asignada',
                dataIndex: 'numMesa',
            },
            {
                title: '# Asistentes',
                dataIndex: 'numAsistentes',
            },
            {
                title: 'Editar',
                dataIndex: '',
                key: 'x',
                render: (_, record) =>
                    <Tooltip title="Editar">
                        <Button shape="circle" icon={<EditOutlined />} onClick={() => this.editUser(record.id_reservation)} />
                    </Tooltip>
                ,
            },
            {
                title: 'Eliminar',
                dataIndex: '',
                key: 'x',
                render: (_, record) =>
                    <Tooltip title="Eliminar">
                        <Button shape="circle" icon={<DeleteOutlined />} onClick={() => this.isDeleteUser(record.id_reservation, record.nameReservation)} />
                    </Tooltip>,
            },
        ]
    }

    clearUser = () => {
        this.setState({ reservation: {} })
    }

    updateEstado = (value) => {
        this.setState({ estado: value });
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

    openNotificationWithIcon = (type, titleNoti, messageNoti) => {
        openNotification(type, titleNoti, messageNoti);
    };

    OnOffLoader = (loader, message) => {
        this.setState({
            isLoader: loader,
            messageLoader: message
        });
    };

    handleFormAsisChange = (e) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                [e.name]: e.value
            }
        });
    };

    handleSearchChange = (value) => {
        this.setState({ searchParams: value, clearedManually: value === '' });
    };

    onSearch = async () => {
        if (this.state.clearedManually) {
            this.setState({ clearedManually: false });
            return;
        }

        this.OnOffLoader(true, 'Buscando Reservaciones...');
        const { tableParams, url, searchParams } = this.state;
        const data = {
            search: searchParams,
            page: tableParams.pagination.current,
            limit: tableParams.pagination.pageSize,
        };

        // Si hay ordenamiento, lo agregamos directamente
        if (tableParams.sortField) {
            data.sortBy = tableParams.sortField;
            data.sortOrder = tableParams.sortOrder === 'ascend' ? 'asc' : 'desc';
        }

        // Si hay filtros
        if (tableParams.filters) {
            Object.keys(tableParams.filters).forEach(key => {
                if (tableParams.filters[key]) {
                    data[key] = tableParams.filters[key];
                }
            });
        }

        console.log('Datos a enviar al Back: ', data);
        try {
            const response = await fetch(`${url}/admin/search-users`, {
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
                if (resp.data.length === 0) {
                    this.openNotificationWithIcon('info', 'Sin resultados', 'No se encontraron reservaciones con los parámetros ingresados');
                }
                // Si response.ok es true (status 200-299)
                this.setState({
                    usuarios: Array.isArray(resp.data) ? resp.data : [],
                    tableParams: {
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: resp.pagination.total, // Esto debería venir de tu API
                        },
                    },
                });
                console.log('Reservaciones obtenidas correctamente');
            } else {
                // Si el servidor respondió con error pero envió JSON
                throw new Error(resp.mensaje, resp.error || 'Error del servidor');
            }

        } catch (e) {
            console.log('4. Error:', e);
            this.OnOffLoader(false, '');
            this.openNotificationWithIcon('error', 'Error al buscar reservaciones', e.message);
        }
    };

    fetchList = async () => {
        this.OnOffLoader(true, 'Obteniendo Reservaciones...');
        const { tableParams, url } = this.state;

        // Parámetros DIRECTOS sin transformación
        const data = {
            page: tableParams.pagination.current,
            limit: tableParams.pagination.pageSize,
        };

        // Si hay ordenamiento, lo agregamos directamente
        if (tableParams.sortField) {
            data.sortBy = tableParams.sortField;
            data.sortOrder = tableParams.sortOrder === 'ascend' ? 'asc' : 'desc';
        };

        // Si hay filtros, agregarlos
        if (tableParams.filters) {
            Object.keys(tableParams.filters).forEach(key => {
                if (tableParams.filters[key]) {
                    data[key] = tableParams.filters[key];
                }
            });
        };

        console.log('Datos a enviar al Back: ', data);
        try {
            const response = await fetch(`${url}/admin/get-reserv`, {
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
                    reservaciones: Array.isArray(resp.data) ? resp.data : [],
                    tableParams: {
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: resp.pagination.total, // Esto debería venir de tu API
                        },
                    },
                });
                console.log('Reservaciones obtenidas correctamente');
            } else {
                // Si el servidor respondió con error pero envió JSON
                throw new Error(resp.mensaje, resp.error || 'Error del servidor');
            }

        } catch (e) {
            console.log('4. Error:', e);
            this.OnOffLoader(false, '');
            this.openNotificationWithIcon('error', 'Error al obtener reservaciones', e.message);
        }
    };

    handleSubmitUser = async (e) => {
        e.preventDefault();
        const { user, url, isAdd } = this.state
        let id;
        let data = { ...user };
        if (isAdd) {
            this.OnOffLoader(true, 'Agregando Reservación Nueva...');
        } else {
            this.OnOffLoader(true, 'Actualizando Reservación...');
            id = user.id_user;
            delete data.id_user;
        }
        console.log('Datos a enviar para actualizar o agregar reservación: ', data);

        try {
            let response;
            if (isAdd) {
                response = await fetch(`${url}/admin/user`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await fetch(`${url}/admin/user/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            this.OnOffLoader(false, '');
            const resp = await response.json()
            if (response.status === 422) {
                // this.updateError(resp.error)
                resp.error.forEach(e => {
                    console.error(e)
                });
                const mensajes = resp.error.map((err) => err.message);
                const resultado = mensajes.join('\n');
                console.error(resp);
                this.openNotificationWithIcon('warning', 'Error en los datos', resultado);
                return;
            } else if (response.status === 409) {
                console.error(resp.error);
                this.openNotificationWithIcon('error', 'Error al actualizar reservación', resp.error);
                return;

            } else if (response.ok) {
                console.log('Éxito', resp)
                this.openNotificationWithIcon('success', resp.mensaje, isAdd ? 'Reservación almacenada exitosamente en la BD' : `Todo en orden con la reservación con id: ${id}`);
                this.updateEstado(0);
                this.clearUser();
                this.setState({ isAdd: false });
            } else {
                throw new Error(resp.error || 'Error del servidor');
            }

        } catch (e) {
            this.OnOffLoader(false, '');
            console.error(e, e.message);
            this.openNotificationWithIcon('error', 'Error', e.message);
        }
        this.setState({ isAdd: false });
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            tableParams: {
                pagination,
                filters,
                sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
                sortField: Array.isArray(sorter) ? undefined : sorter.field,
            },
        });

        if (pagination.pageSize !== this.state.tableParams.pagination?.pageSize) {
            this.setState({ reservaciones: [] });
        }
    };

    addUser = () => {
        console.log('Add');
        this.setState({ isAdd: true });
        this.updateEstado(1);
    };

    deleteUser = async (id) => {
        this.OnOffLoader(true, 'Eliminando Usuario...');
        try {
            const response = await fetch(`${this.state.url}/admin/user/${id}`, {
                method: 'DELETE',
                body: JSON.stringify([id]),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            this.OnOffLoader(false, '');
            const resp = await response.json();
            if (response.ok) {
                console.log(resp, resp.result);
                this.openNotificationWithIcon('success', 'Eliminado satisfactoriamente', resp.mensaje);
                this.fetchList();
            } else {
                this.openNotificationWithIcon('error', `Error del servidor: \n Status: ${response.status} \n Mensaje: ${resp.error}`);
                throw new Error(`Error del servidor: \n Status: ${response.status} \n Mensaje: ${resp.error}`);
            }

        } catch (e) {
            console.error('Error al eliminar el usuario seleecionado: \n', e.message);
            this.openNotificationWithIcon('error', 'Error al eliminar usuario \n', e.message);
        }
    };

    isDeleteUser = (id, name) => {
        console.log(id, name);
        this.openModal({
            typeModal: 'delete',
            titleModal: 'Eliminación en proceso',
            bodyModal: `¿Seguro que deseas eliminar la reservación ${name} ? `,
            okText: 'Aceptar',
            cancelText: 'Cancelar',
            onOk: () => {
                this.deleteUser(id);
                this.closeModal();
            },
            onCancel: () => {
                this.closeModal();
                console.log('Eliminación cancelada');
            },

        });
    };

    editUser = async (id) => {
        this.setState({ isAdd: false });
        this.OnOffLoader(true, 'Extrayendo info de Usuario...');
        console.log([id]);
        try {
            const response = await fetch(`${this.state.url}/admin/usersID`, {
                method: 'POST',
                body: JSON.stringify([id]),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resp = await response.json();
            if (response.ok) {
                console.log(resp, resp.result)
                const [user] = resp.result
                console.log(user)
                this.setState({ user: user });
                this.updateEstado(1);
            } else {
                this.openNotificationWithIcon('error', `Error del servidor: \n Status: ${response.status} \n Mensaje: ${resp.error}`);
                throw new Error(`Error del servidor: \n Status: ${response.status} \n Mensaje: ${resp.error}`);
            }

        } catch (e) {
            console.error('Error al consultar el usuario seleecionado: \n', e.message);
            this.openNotificationWithIcon('error', 'Error al extraer información del usuario \n', e.message);
        }
        this.OnOffLoader(false, '');
    };



    render() {
        const { reservaciones, isDarkMode, isLoader, messageLoader, columns, tableParams, estado, reservation, isAdd, searchParams } = this.state

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

                        <Title
                            titleAdmin={this.state.titleAdmin}
                        />

                        <NotificationWrapper />

                        {estado === 1
                            ?
                            null
                            :
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
                                        value={searchParams}
                                        onChange={(e) => this.handleSearchChange(e.target.value)}
                                        onSearch={this.onSearch}
                                        style={{ width: '100%', maxWidth: 400 }}
                                        size="large"
                                    />

                                </Box>
                            </Container>
                        }

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
                                    color: 'rgb(255, 255, 255)',
                                }}
                                    elevation={3}>

                                    {(() => {
                                        switch (estado) {
                                            case 0:
                                                return (
                                                    <ReservacionesList
                                                        columns={columns}
                                                        reservaciones={reservaciones}
                                                        tableParams={tableParams}
                                                        searchParams={searchParams}
                                                        isLoader={isLoader}
                                                        handleTableChange={this.handleTableChange}
                                                        fetchData={this.fetchList}
                                                        addUser={this.addUser}
                                                        onSearch={this.onSearch}
                                                    />
                                                )

                                            case 1:
                                                return (
                                                    <UsuariosForm
                                                        userEdit={reservation}
                                                        isAdd={isAdd}
                                                        clearUserEdit={this.clearUser}
                                                        updateEstado={this.updateEstado}
                                                        handleSubmitUser={this.handleSubmitUser}
                                                        handleFormAsisChange={this.handleFormAsisChange}

                                                    />
                                                )
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

                        <Spin spinning={isLoader} tip={messageLoader} fullscreen />

                    </motion.div >
                </Container >
            </ConfigProvider>
        )
    }
}

export default Reservaciones;