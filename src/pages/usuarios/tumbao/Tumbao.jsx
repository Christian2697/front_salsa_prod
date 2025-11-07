/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Container, Paper } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Button, Carousel } from 'antd';

const styles = {
    imagenes: {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'cover',
        display: 'block'
    }
}

class Tumbao extends Component {

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

        return (
            <ThemeProvider theme={theme}>
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


                        <Container sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            my: 2
                        }}>
                            <Box sx={{
                                width: '80%'
                            }}>
                                <Paper sx={{
                                    backgroundColor: 'rgba(32, 31, 31, 0.3)',
                                    padding: 2,
                                    borderRadius: 2
                                }}
                                    elevation={3}>
                                    <Typography sx={{ fontFamily: 'Oswald' }} variant="h2">Bienvenido a Tumbao</Typography>
                                    <Typography sx={{ fontFamily: 'Georgia' }} variant="h6">Donde suena la música más Tumbada xD</Typography>
                                </Paper>
                            </Box>
                        </Container>

                        <Container sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            my: 2
                        }}>
                            <Box sx={{
                                width: '80%'
                            }}>
                                <Paper sx={{
                                    backgroundColor: 'rgba(32, 31, 31, 0.0)',
                                    padding: 2,
                                    borderRadius: 2,
                                    width: '100%'
                                }}
                                    elevation={0}>
                                    <Button
                                        color="cyan"
                                        variant="solid"
                                        href={`/tumbao/reservation`}
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
                                            Realiza una reservación
                                        </Typography>
                                    </Button>
                                </Paper>
                            </Box>
                        </Container>

                        <Container sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            my: 4,
                            px: 0
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: { xs: '100%', sm: '80%', md: '60%' },
                                height: 'auto'
                            }}>
                                <Paper sx={{
                                    backgroundColor: 'rgba(31, 29, 29, 0.3)',
                                    padding: 2,
                                    borderRadius: 2,
                                }}
                                    elevation={3}
                                >
                                    <Carousel arrows infinite={true} autoplay autoplaySpeed={5000}>
                                        <div>
                                            <img
                                                src="https://res.cloudinary.com/dpmcitz8q/image/upload/w_700,h_500,c_fill/ai-generated-8768083_gokpzz.jpg"
                                                alt="Imagen 1"
                                                style={styles.imagenes}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="https://res.cloudinary.com/dpmcitz8q/image/upload/w_700,h_500,c_fill/ai-generated-8825996_ngkrcw.png"
                                                alt="Imagen 2"
                                                style={styles.imagenes}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="https://res.cloudinary.com/dpmcitz8q/image/upload/w_700,h_500,c_fill/woman-8827982_kyvtkd.png"
                                                alt="Imagen 3"
                                                style={styles.imagenes}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="https://res.cloudinary.com/dpmcitz8q/image/upload/v1759947583/ai-generated-9086107_ih1era.png"
                                                alt="Imagen 4"
                                                style={styles.imagenes}
                                            />
                                        </div>
                                    </Carousel>
                                </Paper>
                            </Box>
                        </Container>

                    </motion.div>
                </Container>
            </ThemeProvider>
        )
    }
}

export default Tumbao