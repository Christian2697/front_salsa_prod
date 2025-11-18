import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/routes';
import '@ant-design/v5-patch-for-react-19';
import { AuthProvider } from './context/AuthContext';
import { withAuth } from './context/withAuth';

class App extends Component {

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    )
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(App);

