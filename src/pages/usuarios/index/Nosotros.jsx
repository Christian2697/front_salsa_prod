/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

class Nosotros extends Component {

    render() {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
            >
                <Typography variant="h4">Familia Tumbao Cubano</Typography>
                <p>Un espacio para hablar acerca de nosotros, de quienes somos, 
                    de dónde contactarnos, nuestra ubicación e incluso un mapa 
                    de dónde se realizan todos los eventos que se organizan...</p>
            </motion.div>
        )
    }
}

export default Nosotros