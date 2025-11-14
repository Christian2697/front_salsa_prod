/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { motion } from 'framer-motion';
import { Typography, Box, TextField, FormControl, Input, FilledInput, InputLabel, FormHelperText, Paper, InputAdornment, IconButton } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Button } from 'antd';
import { Visibility, VisibilityOff } from "@mui/icons-material";

class LoginForm extends Component {

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

    const { handleFormAsisChange, handleSubmitLogin, userLog, isRegister, handleClickShowPassword, handleMouseDownPassword, handleMouseUpPassword, showPassword, registerClick } = this.props
    return (
      <ThemeProvider theme={theme}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.7 }}
        >

          <Button onClick={registerClick} color='primary' variant="solid" id="backBtn">
            { isRegister ? 'Iniciar sesión' : 'Registrarse' }
          </Button>

          <Typography sx={{ fontFamily: 'Oswald', p: 3 }} variant="h5">Ingresa los datos solicitados </Typography>

          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              display: 'flex',
              flexDirection: 'column',
            }}
            // noValidate

            id="reservation-form"
            name="form0"
            layout="vertical"
            variant='outline'
            onSubmit={(e) => handleSubmitLogin(e)}
          // onFinish={(e) => this.props.handleSubmitReservation(e)}
          // onFinishFailed={onFinishFailed}
          >

            <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
              <Typography sx={{
                textAlign: 'rigth',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)'
              }}>
                Nombre de usuario:
              </Typography>
              <FilledInput
                required
                id="username"
                name="username"
                hiddenLabel
                value={userLog.username}
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
                Contraseña:
              </Typography>
              <FilledInput
                id="filled-adornment-password"
                required
                hiddenLabel
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={userLog.password}
                onChange={(e) => handleFormAsisChange(e.target)}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                  height: { xs: '36px', sm: '40px', md: '44px' }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>Sólo se admiten letras y espacios</FormHelperText>
            </FormControl>

            {isRegister
              ?
              <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                <Typography sx={{
                  textAlign: 'rigth',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)'
                }}>
                  Confirme contraseña:
                </Typography>
                <FilledInput
                  id="filled-adornment-password"
                  required
                  hiddenLabel
                  name="repeat_password"
                  type={showPassword ? 'text' : 'password'}
                  value={userLog.repeat_password}
                  onChange={(e) => handleFormAsisChange(e.target)}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 14px' },
                    height: { xs: '36px', sm: '40px', md: '44px' }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>Las contraseñas deben coincidir</FormHelperText>
              </FormControl>
              :
              null
            }

            <Button type="submit" color='cyan' variant="solid" id="nextBtn" htmlType="submit">
              { isRegister ? 'Registrarse' : 'Iniciar sesión' }
            </Button>

          </Box>

        </motion.div>
      </ThemeProvider>




    );
  }
}

export default LoginForm;
