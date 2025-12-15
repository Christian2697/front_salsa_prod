/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { motion } from 'framer-motion';
import { Typography, Box, TextField, FormControl, Input, FilledInput, InputLabel, FormHelperText, Paper } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Button } from 'antd';
import { withRouter } from '../../../components/withRouter';

class TumFormCase1 extends Component {

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

    const { handleFormAsisChange, handleSubmitUser, contador, nameReservation, omitirUsuario } = this.props
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
            <Typography sx={{ fontFamily: 'Georgia' }} variant="h6">{nameReservation}</Typography>
          </Paper>

          <Typography sx={{
            textAlign: 'rigth',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            Asistente {contador}
          </Typography>


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
                value={this.props.asistente.name}
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
                value={this.props.asistente.lastname}
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
                value={this.props.asistente.email}
                onChange={(e) => handleFormAsisChange(e.target)}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                  height: { xs: '36px', sm: '40px', md: '44px' }
                }}
              />
              <FormHelperText>Ingresa un correo válido</FormHelperText>
            </FormControl>

            <Button type="submit" color='cyan' variant="solid" id="nextBtn" htmlType="submit"
              style={{
                padding: '10px 20px',
                margin: '10px 20px'
              }}>
              Siguiente
            </Button>

            {contador === 1
              ?
              null
              :
              <Button onClick={omitirUsuario} color='danger' variant="filled" id="omitirBtn"
                style={{
                  padding: '10px 20px',
                  margin: '10px 20px'
                }}>
                Omitir el registro de este usuario
              </Button>
            }

          </Box>

        </motion.div>
      </ThemeProvider >




    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(TumFormCase1);
