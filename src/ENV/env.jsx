// config.js
const config = {
  isAuth: import.meta.env.VITE_IS_AUTH || false,
  userRole: import.meta.env.VITE_ROLE || 'user',
  urlBack: import.meta.env.VITE_BACK_URL
};

export default config;