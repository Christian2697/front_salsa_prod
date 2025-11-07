/* eslint-disable no-unused-vars */
import { Component } from "react";
import { motion } from 'framer-motion';
import { Typography, Box, TextField, FormControl, Input, FilledInput, InputLabel, FormHelperText, Paper } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Button } from 'antd';

class UsuariosForm extends Component {

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

        const { handleFormAsisChange, handleSubmitUser, updateEstado, clearUserEdit, userEdit, isAdd } = this.props
        return (
            <ThemeProvider theme={theme}>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.7 }}
                >
                    <Box sx={{
                        // maxWidth: '600px',
                        width: '100%',
                    }} >
                        <Button color='danger' variant="solid" id="backBtn" onClick={() => {
                            updateEstado(0);
                            clearUserEdit();
                        }} >
                            Cancelar
                        </Button>

                        <Box sx={{
                            '& .MuiTextField-root': { mt: 8, m: 1, width: '100%' },
                            maxWidth: '100%',
                        }}>
                            {!isAdd
                                ?
                                <Box>
                                    <Typography sx={{ fontFamily: 'Oswald', textAlign: 'center', }} variant="h5">Editar datos de: </Typography>
                                    <Typography sx={{ fontFamily: 'Georgia', textAlign: 'center', }} variant="h6">{userEdit.name} {userEdit.lastname}</Typography>
                                </Box>
                                :
                                <Box>
                                    <Typography sx={{ fontFamily: 'Oswald', textAlign: 'center', }} variant="h5">Usuario Nuevo</Typography>
                                </Box>
                            }
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                maxWidth: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                            }}
                            // noValidate

                            id="reservation-form"
                            name="form0"
                            layout="vertical"
                            variant='outline'
                            onSubmit={(e) => handleSubmitUser(e)}
                        // onFinish={(e) => this.props.handleSubmitReservation(e)}
                        // onFinishFailed={onFinishFailed}
                        >

                            <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                                <Typography sx={{
                                    textAlign: 'rigth',
                                    fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                                }}>
                                    Nombre:
                                </Typography>
                                <FilledInput
                                    required
                                    id="name"
                                    name="name"
                                    hiddenLabel
                                    value={userEdit.name}
                                    onChange={(e) => handleFormAsisChange(e.target)}
                                    sx={{
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                        padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                                        height: { xs: '36px', sm: '40px', md: '44px' }
                                    }}
                                />
                                <FormHelperText>Sólo se admiten letras y espacios</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                                <Typography sx={{
                                    textAlign: 'rigth',
                                    fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                                }}>
                                    Apellido
                                </Typography>
                                <FilledInput
                                    required
                                    id="lastname"
                                    name="lastname"
                                    hiddenLabel
                                    value={userEdit.lastname}
                                    onChange={(e) => handleFormAsisChange(e.target)}
                                    sx={{
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                        padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                                        height: { xs: '36px', sm: '40px', md: '44px' }
                                    }}
                                />
                                <FormHelperText>Sólo se admiten letras y espacios</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                                <Typography sx={{
                                    textAlign: 'rigth',
                                    fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                                }}>
                                    Correo
                                </Typography>
                                <FilledInput
                                    required
                                    id="email"
                                    name="email"
                                    hiddenLabel
                                    value={userEdit.email}
                                    onChange={(e) => handleFormAsisChange(e.target)}
                                    sx={{
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                        padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                                        height: { xs: '36px', sm: '40px', md: '44px' }
                                    }}
                                />
                                <FormHelperText>Ingresa un correo válido</FormHelperText>
                            </FormControl>

                            <Button type="submit" color='cyan' variant="solid" id="nextBtn" htmlType="submit">
                                Guardar
                            </Button>

                        </Box>
                    </Box>
                </motion.div>
            </ThemeProvider>




        );
    }
}

export default UsuariosForm;