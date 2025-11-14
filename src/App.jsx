import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/routes';
import '@ant-design/v5-patch-for-react-19';
import config from './ENV/env';
import { Spin } from 'antd';
import NotificationWrapper, { openNotification } from './components/NotificationWrapper';

class App extends Component {

  state = {
    user: null,
    isLoader: true,
    messageLoader: '',
    authChecked: false,
    url: config.urlBack,
    roleUser: 'user'
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  OnOffLoader = (loader, message) => {
    this.setState({
      isLoader: loader,
      messageLoader: message
    });
  };

  openNotificationWithIcon = (type, titleNoti, messageNoti) => {
    openNotification(type, titleNoti, messageNoti);
  };

  updateAuthentication = (authenticated, user = null) => {
    this.setState({
      authChecked: authenticated,
      user: user,
      roleUser: user ? user.role : 'user'
    });
  };

  checkAuthentication = async () => {
    this.OnOffLoader(true, 'Verificando permisos');
    const { url } = this.state;
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
        this.openNotificationWithIcon('warning', 'Se validaron permisos y autorización', data.error);
        console.log(response.status, data.error);
        this.setState({
          isLoader: false,
          messageLoader: '',
          user: null,
          authChecked: data.authenticated
        });
        return
      }
      console.log(data.authenticated, data.mensaje, data.user.role);
      this.setState({
        isLoader: false,
        messageLoader: '',
        user: data.user,
        authChecked: data.authenticated,
        roleUser: data.user.role
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoader: false,
        messageLoader: '',
        user: null,
        authChecked: false
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <NotificationWrapper />
        <AppRoutes isAuth={this.state.authChecked} userRole={this.state.roleUser} updateAuthentication={this.updateAuthentication} />
        <Spin spinning={this.state.isLoader} tip={this.state.messageLoader} fullscreen />
      </BrowserRouter>
    )
  }
}

export default App

