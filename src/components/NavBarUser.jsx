import React, { Component } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Container, 
  Button, 
  Tooltip, 
  MenuItem 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';

const { Header, Content, Footer } = Layout;

const pages = ['Nosotros'];
const settings = ['Tumbao'];

class NavBarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null
    };
  }

  handleOpenNavMenu = (event) => {
    this.setState({ anchorElNav: event.currentTarget });
  };

  handleOpenEventMenu = (event) => {
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleCloseNavMenu = () => {
    this.setState({ anchorElNav: null });
  };

  handleCloseEventMenu = () => {
    this.setState({ anchorElUser: null });
  };

  normalizarTexto = (texto) => {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  render() {
    const { anchorElNav, anchorElUser } = this.state;
    
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#19d2c3ff',
        },
        background: {
          default: '#141414',
          paper: '#1f1f1f',
        },
      },
    });

    return (
      <ThemeProvider theme={darkTheme}>
        <div style={{ overflowX: 'hidden', width: '100%' }}>
          <Layout style={{ 
            minHeight: '100vh', 
            background: '#141414',
            overflowX: 'hidden',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                width: '100%',
                padding: 0,
                height: 'auto',
                lineHeight: 'normal',
                background: 'transparent',
                overflowX: 'hidden',
                flexShrink: 0 // Evita que el header se reduzca
              }}
            >
              <AppBar position="fixed" sx={{ 
                background: 'linear-gradient(45deg, #19d2c3 30%, #126b63 90%)',
                width: '100%'
              }}>
                <Container maxWidth="xl" sx={{ width: '100%', maxWidth: '100% !important' }}>
                  <Toolbar disableGutters sx={{ width: '100%' }}>
                    {/* Logo para desktop */}
                    <NightlifeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Tooltip title="Inicio">
                      <Typography
                        variant="h4"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'white'
                          }
                        }}
                      >
                        Salsa
                      </Typography>
                    </Tooltip>

                    {/* Menú hamburguesa para mobile */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={this.handleOpenNavMenu}
                        color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={this.handleCloseNavMenu}
                        sx={{
                          display: { xs: 'block', md: 'none' },
                        }}
                      >
                        {pages.map((page) => (
                          <MenuItem key={page} onClick={this.handleCloseNavMenu}>
                            <Link
                              to={`/${this.normalizarTexto(page)}`}
                              style={{ 
                                textDecoration: 'none', 
                                color: 'inherit', 
                                width: '100%',
                                display: 'block'
                              }}
                            >
                              <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>

                    {/* Logo para mobile */}
                    <NightlifeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                      variant="h5"
                      noWrap
                      component={Link}
                      to="/"
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'white'
                        }
                      }}
                    >
                      Salsa
                    </Typography>

                    {/* Menú principal para desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      {pages.map((page) => (
                        <Button
                          key={page}
                          component={Link}
                          to={`/${this.normalizarTexto(page)}`}
                          onClick={this.handleCloseNavMenu}
                          sx={{ 
                            m: 1, 
                            color: 'white', 
                            display: 'block',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                        >
                          {page}
                        </Button>
                      ))}
                    </Box>

                    {/* Menú de eventos */}
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Desplegar eventos disponibles">
                        <Button
                          onClick={this.handleOpenEventMenu}
                          sx={{ 
                            my: 2, 
                            color: 'white', 
                            display: 'flex',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                          startIcon={<EventIcon />}
                        >
                          Eventos
                        </Button>
                      </Tooltip>
                      <Menu
                        sx={{ 
                          mt: '45px',
                          '& .MuiPaper-root': {
                            backgroundColor: '#1f1f1f',
                            color: 'white'
                          }
                        }}
                        id="menu-appbar-events"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={this.handleCloseEventMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem 
                            key={setting} 
                            onClick={this.handleCloseEventMenu}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                              }
                            }}
                          >
                            <Link
                              to={`/${this.normalizarTexto(setting)}`}
                              style={{ 
                                textDecoration: 'none', 
                                color: 'inherit', 
                                width: '100%',
                                display: 'block'
                              }}
                            >
                              <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Header>
            
            {/* Toolbar espaciador */}
            <Toolbar />
            
            <Content 
              style={{ 
                padding: '0 20px',
                background: '#141414',
                flex: 1, // Esto hace que el contenido ocupe el espacio disponible
                overflowX: 'hidden',
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box'
              }}
            >
              <Breadcrumb
                style={{ 
                  margin: '16px 0',
                  color: 'white'
                }}
                items={[]}
              />
              <div
                style={{
                  padding: 10,
                  minHeight: 'auto', // Reducido de 380px
                  background: '#1f1f1f',
                  borderRadius: 8,
                  color: 'white',
                  border: '1px solid #333',
                  width: '100%',
                  height: 'auto',
                  boxSizing: 'border-box',
                  overflowX: 'hidden'
                }}
              >
                <Outlet />
              </div>
            </Content>
            <div style={{ height: '8px', width: '100%' }} />
            <Footer 
              style={{ 
                textAlign: 'center', 
                background: '#1f1f1f',
                color: 'white',
                borderTop: '1px solid #333',
                width: '100%',
                overflowX: 'hidden',
                flexShrink: 0, // Evita que el footer se reduzca
                marginTop: 'auto' // Empuja el footer hacia abajo
              }}
            >
              Tumbao Cubano ©{new Date().getFullYear()} Created by ACCR
            </Footer>
          </Layout>
        </div>
      </ThemeProvider>
    );
  }
}

export default NavBarUser;