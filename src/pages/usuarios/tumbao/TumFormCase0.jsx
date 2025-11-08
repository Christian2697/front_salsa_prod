/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, TextField, FormControl, Input, FilledInput, InputLabel, FormHelperText } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Button } from 'antd';

class TumFormCase0 extends Component {

  handleChangeNumAsistentes = (e) => {
    const value = e.target.value;

    // Permitir solo números entre 1 y 8
    if (/^\d*$/.test(value) && (value === '' || (Number(value) >= 1 && Number(value) <= 8))) {
      this.props.handleFormReservChange('numAsistentes', value);
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

    return (
      <ThemeProvider theme={theme}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.7 }}
        >

          <Box
            component="form"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            // noValidate

            id="reservation-form"
            name="form0"
            layout="vertical"
            variant='outline'
            onSubmit={(e) => this.props.handleSubmitReservation(e)}
          // onFinish={(e) => this.props.handleSubmitReservation(e)}
          // onFinishFailed={onFinishFailed}
          >

            <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
              <Typography sx={{
                textAlign: 'rigth',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)'
              }}>
                A nombre de quién se hará la reservación:
              </Typography>
              <FilledInput
                required
                id="nameReservation"
                name="nameReservation"
                hiddenLabel
                value={this.props.nameReservation}
                onChange={(e) => this.props.handleFormReservChange('nameReservation', e.target.value)}
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
                Número de Asistentes:
              </Typography>
              <FilledInput
                required
                id="numAsistentes"
                name="numAsistentes"
                hiddenLabel
                value={this.props.numAsistentes}
                onChange={this.handleChangeNumAsistentes}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                  height: { xs: '36px', sm: '40px', md: '44px' }
                }}
                inputProps={{
                  min: 1,
                  max: 8,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  'aria-label': 'Teléfono'
                }}
              />
              <FormHelperText>Sólo se admiten entre 1 y 8 asistentes por reservación</FormHelperText>
            </FormControl>

            <Button type="submit" color='cyan' variant="solid" id="nextBtn" htmlType="submit">
              Siguiente
            </Button>

          </Box>

        </motion.div>
      </ThemeProvider>
    )
  }
}
export default TumFormCase0
