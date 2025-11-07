// withRouter.js
import { useNavigate } from 'react-router-dom';
import React from 'react';

// eslint-disable-next-line no-unused-vars
export const withRouter = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};