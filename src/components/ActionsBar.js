import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const ActionBar = props => 
<Box display="flex" flexDirection="row-reverse" p={1} m={1}>
    <Box p={1}>
        <Button variant="outlined" color="secondary">
        DELETE
        </Button>
    </Box>
    <Box p={1}>
        <Button variant="outlined" color="primary">
            SAVE
        </Button>
    </Box>
</Box>


export default ActionBar;