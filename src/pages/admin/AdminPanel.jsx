/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

class Home extends Component {

    render() {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
            >
                <Typography variant="h4">Bienvenido a Admin</Typography>
                <p>Hola Admin</p>
            </motion.div>
        )
    }
}

export default Home