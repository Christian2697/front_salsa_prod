// context/AuthContext.jsx
import React from 'react';
import apiAuth from '../services/api';

const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  state = {
    user: null,
    authChecked: false,
    status: null,
    mensaje: '',
    error: '',
    contador: 0,
    // Bandera para evitar bucles
    isChecking: false
  };

  checkAuthentication = async () => {
    // Evitar múltiples llamadas simultáneas
    if (this.state.isChecking) {
      return this.state;
    }

    this.setState({ 
      isChecking: true,
      status: null,
      mensaje: '',
      error: ''
    });

    try {
      const result = await apiAuth.checkAuthentication();

      console.log('contador: ', this.state.contador + 1);

      this.setState({
        ...result,
        contador: this.state.contador + 1,
        isChecking: false
      });

      return result;
    } catch (error) {
      console.error('Error en checkAuthentication:', error);
      this.setState({
        isChecking: false,
        error: error.message
      });
      return {
        user: null,
        authChecked: false,
        error: error.message
      };
    }
  };

  updateAuthentication = (authenticated, user = null) => {
    this.setState({
      authChecked: authenticated,
      user: user,
      isChecking: false
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          // Estado
          user: this.state.user,
          authChecked: this.state.authChecked,
          status: this.state.status,
          mensaje: this.state.mensaje,
          error: this.state.error,
          isChecking: this.state.isChecking,

          // Funciones
          checkAuthentication: this.checkAuthentication,
          updateAuthentication: this.updateAuthentication
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;