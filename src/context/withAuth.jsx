// context/withAuth.js
import React from 'react';
import AuthContext from './AuthContext';

export const withAuth = (Component) => {
  const WithAuth = (props) => {
    return (
      <AuthContext.Consumer>
        {(authContext) => (
          <Component {...props} auth={authContext} />
        )}
      </AuthContext.Consumer>
    );
  };
  
  // Mantener displayName para debugging
  const componentName = Component.displayName || Component.name || 'Component';
  WithAuth.displayName = `WithAuth(${componentName})`;
  
  return WithAuth;
};