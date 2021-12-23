import React from 'react';

import { Typography } from '@mui/material';
import { Link } from '@mui/material';

export default function Copyrigth(){
    return(
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyrigth © '}
            <Link color="inherit" href="javascript:;">
                Sistema MERN 
            </Link>
            {' ' + new Date().getFullYear()}
        </Typography>
    );
}