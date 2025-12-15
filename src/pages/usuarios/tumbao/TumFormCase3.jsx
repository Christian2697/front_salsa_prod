/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { motion } from 'framer-motion';
import { Typography, Paper, Stack, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Button, QRCode } from 'antd';
import { withRouter } from '../../../components/withRouter';

class TumFormCase3 extends Component {
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

        const { nameReservation, payMethod, QRs } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.7 }}
                >
                    <Typography sx={{
                        fontFamily: 'Oswald',
                        m: 3,
                        textAlign: 'center',
                        fontSize: { xs: '1.5rem', md: '2rem' }
                    }} variant="h4">
                        Reservación creada exitosamente
                    </Typography>

                    {/* Información básica compacta y centrada */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center', // ✅ Centrar en lugar de space-between
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        mb: 3,
                        gap: 4, // ✅ Más espacio entre los elementos
                        textAlign: { xs: 'left', sm: 'center' } // ✅ Centrar texto en desktop
                    }}>
                        <Box>
                            <Typography sx={{ fontFamily: 'Oswald' }} variant="h6">
                                Reservación a nombre de:
                            </Typography>
                            <Typography sx={{ fontFamily: 'Georgia' }} variant="body1">
                                {nameReservation}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily: 'Oswald' }} variant="h6">
                                Método de pago:
                            </Typography>
                            <Typography sx={{ fontFamily: 'Georgia' }} variant="body1">
                                {payMethod}
                            </Typography>
                        </Box>
                    </Box>

                    {QRs.map((qr, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                backgroundColor: 'rgba(32, 31, 31, 0.3)',
                                padding: { xs: 2, md: 3 },
                                borderRadius: 3,
                                margin: 2,
                            }}
                        >
                            {/* Grid container */}
                            <Grid
                                container
                                spacing={{ xs: 1, md: 2 }}
                                alignItems="flex-start"
                            >
                                {/* Columna 1 - Información izquierda */}
                                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                                            <Typography sx={{
                                                fontFamily: 'Oswald',
                                                mb: 0.5,
                                                fontSize: '0.9rem',
                                                color: '#19d2c3ff'
                                            }}>
                                                ID de la reservación:
                                            </Typography>
                                            <Typography sx={{
                                                fontFamily: 'Quicksand',
                                                fontSize: '0.95rem'
                                            }}>
                                                {qr.id_reservation}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                                            <Typography sx={{
                                                fontFamily: 'Oswald',
                                                mb: 0.5,
                                                fontSize: '0.9rem',
                                                color: '#19d2c3ff'
                                            }}>
                                                Evento:
                                            </Typography>
                                            <Typography sx={{
                                                fontFamily: 'Quicksand',
                                                fontSize: '0.95rem'
                                            }}>
                                                {qr.event_name}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>

                                {/* Columna 2 - Información derecha */}
                                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                                            <Typography sx={{
                                                fontFamily: 'Oswald',
                                                mb: 0.5,
                                                fontSize: '0.9rem',
                                                color: '#19d2c3ff'
                                            }}>
                                                Nombre:
                                            </Typography>
                                            <Typography sx={{
                                                fontFamily: 'Quicksand',
                                                fontSize: '0.95rem'
                                            }}>
                                                {qr.name} {qr.lastname}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                                            <Typography sx={{
                                                fontFamily: 'Oswald',
                                                mb: 0.5,
                                                fontSize: '0.9rem',
                                                color: '#19d2c3ff'
                                            }}>
                                                Mesa asignada:
                                            </Typography>
                                            <Typography sx={{
                                                fontFamily: 'Quicksand',
                                                fontSize: '0.95rem'
                                            }}>
                                                {qr.numMesa}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>

                                {/* Columna 3 - QR a la derecha */}
                                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        mt: { xs: 2, md: 0 },
                                        pt: { xs: 2, md: 0 },
                                        borderTop: {
                                            xs: '1px solid rgba(255,255,255,0.1)',
                                            md: 'none'
                                        }
                                    }}>
                                        <Typography sx={{
                                            fontFamily: 'Oswald',
                                            mb: 2,
                                            color: '#19d2c3ff'
                                        }}>
                                            Código QR:
                                        </Typography>

                                        <QRCode
                                            value={qr.qr_reservation}
                                            size={200}
                                            errorLevel={'H'}
                                            bgColor="#000000ff"
                                            style={{
                                                margin: '0 auto',
                                                borderRadius: '8px',
                                                padding: '8px',
                                               
                                            }}
                                        />

                                        <Typography sx={{
                                            fontFamily: 'Quicksand',
                                            mt: 1,
                                            fontSize: '0.7rem',
                                            color: 'rgba(255,255,255,0.7)',
                                            wordBreak: 'break-all'
                                        }}>
                                            {qr.qr_reservation}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}

                    <Button onClick={() => this.props.navigate('/tumbao')} color='cyan' variant="solid" id="exitBtn" sx={{ mt: 2, display: 'block', mx: 'auto' }}>
                        Salir
                    </Button>
                </motion.div>
            </ThemeProvider>

        );
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(TumFormCase3);