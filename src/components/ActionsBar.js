import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const ActionBar = props => {
    const hasFile = props.file && props.file.id;
    return <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
        <Box p={1}>
            <Button variant="outlined" color="secondary" disabled={!hasFile} onClick={props.file?()=>props.onDelete(props.file.id):null}>
            DELETE
            </Button>
        </Box>
        <Box p={1}>
            <Button variant="outlined" color="primary" disabled={!props.edited || !hasFile} onClick={props.file?()=>props.onSave(props.file.id):null}>
                SAVE
            </Button>
        </Box>
        <Box p={2} mr={3}>
        {props.file?props.file.name:null}
        </Box>
    </Box>;
}


export default ActionBar;