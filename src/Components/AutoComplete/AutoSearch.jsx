import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AutoCompleteComponent from '.';


export default function AutoSearch() {
  return (
    <Grid container mt={2}>
      <Grid item xs={12} mt={2} textAlign={'center'}>
        <Typography variant="h4">
          Google Map Location Auto Search
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        m={'2rem'}
      >
        <Box display={'flex'} textAlign={'center'}>
          <AutoCompleteComponent />
        </Box>
      </Grid>
    </Grid>
  )
}
