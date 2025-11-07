import { Component } from "react";
import { Box, Container, Paper, Typography } from '@mui/material';

class Title extends Component {
  render() {
    const {title} = this.props
    return (
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: { xs: '100%', sm: '80%', md: '60%' },
        my: 0
      }}>
        <Box sx={{
          width: '80%',
          backgroundColor: 'transparent',
          padding: 1,
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Oswald', textAlign: 'center'
            }}
          >
            {title}
          </Typography>

        </Box>
      </Container>
    )
  }
}

export default Title