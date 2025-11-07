// components/NotificationWrapper.jsx
import React from 'react';
import { notification } from 'antd';

let notificationApi = null;

const NotificationWrapper = () => {
  const [api, contextHolder] = notification.useNotification();
  
  // Guardar la referencia al api
  notificationApi = api;
  
  return contextHolder;
};

// Exportar función para usar las notificaciones
// eslint-disable-next-line react-refresh/only-export-components
export const openNotification = (type, titleNoti, messageNoti, options = {}) => {
  if (notificationApi) {
    notificationApi[type]({
      message: titleNoti,
      description: messageNoti,
      placement: 'topRight',
      duration: 4.5,
      ...options
    });
  } else {
    // Fallback a notification estática si el wrapper no está montado
    notification[type]({
      message: titleNoti,
      description: messageNoti,
      ...options
    });
  }
};

export default NotificationWrapper;