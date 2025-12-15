/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { motion } from 'framer-motion';
import { Typography, Box, FormControl, FilledInput, FormHelperText, Paper, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Button } from 'antd';
import { withRouter } from '../../../components/withRouter';

class TumFormCase2 extends Component {
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

        const { nameReservation, asistentes, id_payMethod, handlePayChange, createQrClick } = this.props;
        return (

            <ThemeProvider theme={theme}>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.7 }}
                >

                    <Button onClick={() => this.props.navigate('/tumbao')} color='danger' variant="solid" id="backBtn">
                        Cancelar
                    </Button>

                    <Paper sx={{
                        backgroundColor: 'rgba(32, 31, 31, 0.3)',
                        padding: 2,
                        borderRadius: 2,
                        margin: 2
                    }}
                        elevation={3}>
                        <Typography sx={{ fontFamily: 'Oswald' }} variant="h5">Reservación a nombre de: </Typography>
                        <Typography sx={{ fontFamily: 'Georgia' }} variant="body1">{nameReservation}</Typography>
                        {asistentes.map((user, index) =>
                            <div key={user.id_user}>
                                <Typography sx={{ fontFamily: 'Oswald' }} variant="h5">Asistente {index + 1}:</Typography>
                                <Typography sx={{ fontFamily: 'Georgia' }} variant="body1"> {user.name} {user.lastname}</Typography>
                            </div>
                        )}

                    </Paper>


                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            maxWidth: 600,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        // noValidate

                        id="reservation-form"
                        name="form0"
                        layout="vertical"
                        variant='outline'
                        onSubmit={(e) => createQrClick(e)}
                    // onFinish={(e) => this.props.handleSubmitReservation(e)}
                    // onFinishFailed={onFinishFailed}
                    >

                        <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                            <Typography sx={{
                                textAlign: 'left',
                                fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                            }}>
                                Método de Pago:
                            </Typography>
                            <Select
                                placeholder="Selecciona una opción"
                                name="payMethod"
                                required
                                variant="filled"
                                hiddenLabel
                                sx={{
                                    minWidth: '100%',
                                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                    padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                                    height: { xs: '36px', sm: '40px', md: '44px' }
                                }}
                                value={id_payMethod}
                                onChange={(e) => handlePayChange(e.target.value)}
                            >
                                <MenuItem value="1" disabled>Pagar en línea</MenuItem >
                                <MenuItem value="2">Pagar al llegar al evento</MenuItem >
                            </Select>
                            <FormHelperText>Selecciona un método de pago válido</FormHelperText>
                        </FormControl>



                        <Button type="submit" color='cyan' variant="solid" id="nextBtn" htmlType="submit">
                            Siguiente
                        </Button>

                    </Box>

                </motion.div>
            </ThemeProvider>
        );
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(TumFormCase2);