/* eslint-disable no-unused-vars */
import { Component } from "react";
import { Box, Paper, Typography, Grid, Stack } from '@mui/material';
import { Button, QRCode, } from 'antd';
import { motion } from 'framer-motion';



class ReservacionEncontrada extends Component {
    render() {
        const { QRs, colorPay } = this.props
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.7 }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontFamily: 'Oswald',
                            m: 3,
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                        variant="h4"
                    >
                        Reservación Encontrada
                    </Typography>

                    {/* Información básica compacta y centrada */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'center',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            mb: 3,
                            gap: 4,
                            textAlign: { xs: 'left', sm: 'center' }
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontFamily: 'Oswald' }} variant="h6">
                                Reservación a nombre de:
                            </Typography>
                            <Typography sx={{ fontFamily: 'Georgia' }} variant="body1">
                                {QRs[0].nameReservation}
                            </Typography>
                        </Box>
                    </Box>

                    {QRs.map((qr) => (
                        <Paper
                            key={qr.id_reservation}
                            elevation={3}
                            sx={{
                                backgroundColor: colorPay,
                                padding: { xs: 2, md: 3 },
                                borderRadius: 3,
                                margin: 2,
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {/* Grid v2 */}
                            <Grid
                                container
                                spacing={{ xs: 1, md: 2 }}
                                sx={{
                                    maxWidth: { xs: '100%', md: '500px' },
                                    margin: '0 auto'
                                }}
                            >
                                {/* Columna 1 */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ textAlign: 'left' }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Oswald',
                                                    mb: 0.5,
                                                    fontSize: '0.9rem',
                                                    color: '#19d2c3ff'
                                                }}
                                            >
                                                ID de la reservación:
                                            </Typography>
                                            <Typography
                                                sx={{ fontFamily: 'Quicksand', fontSize: '0.95rem' }}
                                            >
                                                {qr.id_reservation}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ textAlign: 'left' }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Oswald',
                                                    mb: 0.5,
                                                    fontSize: '0.9rem',
                                                    color: '#19d2c3ff'
                                                }}
                                            >
                                                Evento:
                                            </Typography>
                                            <Typography
                                                sx={{ fontFamily: 'Quicksand', fontSize: '0.95rem' }}
                                            >
                                                {qr.event_name}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>

                                {/* Columna 2 */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ textAlign: 'left' }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Oswald',
                                                    mb: 0.5,
                                                    fontSize: '0.9rem',
                                                    color: '#19d2c3ff'
                                                }}
                                            >
                                                Nombre:
                                            </Typography>
                                            <Typography
                                                sx={{ fontFamily: 'Quicksand', fontSize: '0.95rem' }}
                                            >
                                                {qr.name} {qr.lastname}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ textAlign: 'left' }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Oswald',
                                                    mb: 0.5,
                                                    fontSize: '0.9rem',
                                                    color: '#19d2c3ff'
                                                }}
                                            >
                                                Mesa asignada:
                                            </Typography>
                                            <Typography
                                                sx={{ fontFamily: 'Quicksand', fontSize: '0.95rem' }}
                                            >
                                                {qr.numMesa}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>

                                {/* QR centrado */}
                                <Grid size={12}>
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                            mt: 2,
                                            pt: 2,
                                            borderTop: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: 'Oswald',
                                                mb: 2,
                                                color: '#19d2c3ff'
                                            }}
                                        >
                                            Código QR:
                                        </Typography>

                                        <QRCode
                                            value={qr.qr_reservation}
                                            size={160}
                                            bgColor="#000000ff"
                                            style={{
                                                margin: '0 auto',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                backgroundColor: '#ffffffff'
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontFamily: 'Quicksand',
                                                mt: 1,
                                                fontSize: '0.7rem',
                                                color: 'rgba(255,255,255,0.7)',
                                                wordBreak: 'break-all'
                                            }}
                                        >
                                            {qr.qr_reservation}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Box>
            </motion.div>

        )
    }
}

export default ReservacionEncontrada