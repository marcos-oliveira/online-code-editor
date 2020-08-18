import React, { useState } from 'react';
import Editor from '../components/Editor';
import FileTree from '../components/FileTree';
import ActionsBar from '../components/ActionsBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const OnlineEditor = props => {

  const { content, setContent } = useState("");
  const { fileName, setFileName } = useState("");


  return <Grid container height="100%" spacing={12}>
    <Grid height="100%" item xs={3}>
      <FileTree ></FileTree>
    </Grid>
    <Grid height="100%" item xs={9}>
      <Grid item xs={12}>
        <ActionsBar />
      </Grid>
      <Box bgcolor="text.primary" height="100%">
        <Editor />
      </Box>
    </Grid>
  </Grid>;
}


export default OnlineEditor;