import { Component } from 'react';
/* eslint-disable */
import { motion } from 'framer-motion';
/* eslint-enable */
import { Typography, Box, Container, Paper } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

class Home extends Component {

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
                <Container sx={{ position: 'relative', width: '100%', px: 0, py: 8 }}>
                    {/* <Box sx={{ position: 'relative', width: '100%', height: '100%' }}> */}

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            position: 'absolute',
                            top: -10,
                            left: 0,
                            width: '100%',
                            height: '99%',
                            objectFit: 'auto',
                            zIndex: 0
                        }}
                    >
                        <source src="https://res.cloudinary.com/dpmcitz8q/video/upload/w_700,h_500,c_fill/Bienvenido_a_Tumbao_nplbty.mp4" type="video/mp4" />
                        
                    </video>

                    {/* </Box> */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 1.6 }}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '90vh', // o 100vh si quieres pantalla completa
                                position: 'relative',
                                px: 2
                            }}
                        >



                            <Box sx={{
                                display: 'inline-block',
                                position: 'relative',
                                zIndex: 1,
                                color: 'white',
                                textAlign: 'center',
                                pt: 2,
                                px: 4,
                                py: 3,
                                height: 'auto',
                                width: 'auto'
                            }}
                            >
                                <Paper sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // negro con 50% de opacidad
                                    padding: 2,
                                    borderRadius: 2
                                }}
                                    elevation={3}>
                                    <Typography sx={{ fontFamily: 'Oswald' }} variant="h1">Bienvenido</Typography>
                                    <Typography sx={{ fontFamily: 'Georgia' }} variant="h6">Un lugar para bailar sin parar</Typography>
                                    <Typography sx={{ fontFamily: 'Playfair Display' }} variant="h6">Aquí nadie se queda sentado</Typography>
                                </Paper>
                            </Box>

                            {/* Aquí va tu contenedor con el texto */}
                        </Container>

                    </motion.div>
                </Container>
            </ThemeProvider>

        )
    }
}

export default Home