// api.jsx (versión simplificada)
// context/api.js
import config from '../ENV/env';

const apiAuth = {
  checkAuthentication: async () => {
    const url = config.urlBack;
    try {
      const response = await fetch(`${url}/auth/verify`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(response.status, data.error);
        return {
          user: null,
          authChecked: data.authenticated || false,
          status: response.status,
          error: data.error
        };
      }

      console.log(data.authenticated, data.mensaje, data.user.role);
      return {
        user: data.user,
        authChecked: data.authenticated,
        mensaje: data.mensaje
      };
    } catch (error) {
      console.log(error);
      return {
        user: null,
        authChecked: false,
        error: error
      };
    }
  }
};

export default apiAuth;