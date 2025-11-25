/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { motion } from 'framer-motion';
import { Box, } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Button, Empty, Table, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';


class ReservacionesList extends Component {

    componentDidMount() {
        this.props.fetchData();
    };

    componentDidUpdate(prevProps, prevState) {
        const { searchParams: currentSearchParams } = this.props;
        const { searchParams: prevSearchParams } = prevProps;
        const { tableParams: currentTableParams } = this.props;
        const { tableParams: prevTableParams } = prevProps;

        if (
            currentTableParams.pagination?.current !== prevTableParams.pagination?.current ||
            currentTableParams.pagination?.pageSize !== prevTableParams.pagination?.pageSize ||
            currentTableParams?.sortOrder !== prevTableParams?.sortOrder ||
            currentTableParams?.sortField !== prevTableParams?.sortField ||
            JSON.stringify(currentTableParams.filters) !== JSON.stringify(prevTableParams.filters) // ← Nueva condición
        ) {
            if (!currentSearchParams || currentSearchParams.trim() === '') {
                this.props.fetchData();
            } else {
                this.props.onSearch();
            }
        } else if (currentSearchParams !== prevSearchParams) {
            if (!currentSearchParams || currentSearchParams.trim() === '') {
                this.props.fetchData();
            }
        }
    };

    render() {
        let theme = createTheme({
            palette: {
                mode: 'dark',
                primary: {
                    main: '#19d2c3ff',
                },
            },
        });
        theme = responsiveFontSizes(theme);

        const { columns, reservaciones, tableParams, isLoader, handleTableChange, addUser } = this.props;
        return (

            <ThemeProvider theme={theme}>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.7 }}
                >

                    <Box>
                        {reservaciones.length === 0
                            ?
                            <Empty />
                            :
                            <Box>
                                <Tooltip title="Crear nuevo">
                                    <Button shape="circle" icon={<UserAddOutlined />} onClick={addUser} />
                                </Tooltip>
                                <Table
                                    columns={columns}
                                    rowKey={(record) => record.id_reservation}
                                    dataSource={reservaciones}
                                    pagination={tableParams.pagination}
                                    loading={isLoader}
                                    onChange={handleTableChange}
                                    scroll={{
                                        x: 'max-content', // Scroll horizontal cuando sea necesario
                                        // y: 'calc(100vh - 300px)', // Altura fija para scroll vertical (ajusta según necesites)
                                    }}
                                    size="middle" // Tamaño de la tabla
                                    bordered={true} // Bordes para mejor visualización
                                    style={{
                                        width: '100%', // Ocupa todo el ancho disponible
                                    }}
                                />

                            </Box>
                        }
                    </Box>

                </motion.div>
            </ThemeProvider>
        );
    }
}

export default ReservacionesList;