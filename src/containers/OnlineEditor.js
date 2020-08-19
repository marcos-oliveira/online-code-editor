import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import FileTree from '../components/FileTree';
import ActionsBar from '../components/ActionsBar';
import { CircularProgress, Grid, Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const OnlineEditor = props => {

  const [ edited, setEdited ] = useState(false);
  const [ file, setFile ] = useState();
  const [ msg, setMsg ] = useState();
  const [ error, setError ] = useState();
  const [ running, setRunning ] = useState(false);
  const [ filetree, setFiletree ] = useState();
  const classes = useStyles();

  const fetchTree = useCallback(() => {
    setRunning(true);
    setError(null);
    fetch('https://my-json-server.typicode.com/open-veezoo/editor/filetree')
      .then( response => {
        if (!response.ok) { throw response };
        return response.json();
      })
      .then( dados => {
        setRunning(false);
        setFiletree(dados);
      } )
      .catch( error => {
        setRunning(false);
        setError("Sorry, an unexpected error occurred");
      } );
  }, [setRunning, setFiletree, setError]);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  const onSetContent = useCallback((content) => {
    setEdited(true);
    setFile(oldFile => {return {...oldFile, content: content}});
  }, [setFile, setEdited]);

  const loadFile = useCallback(fileId => {
    setError(null);
    fetch('https://my-json-server.typicode.com/open-veezoo/editor/files/'+fileId)
      .then( response => {
        if (!response.ok) { throw response };
        return response.json();
      })
      .then( dados => {
        setEdited(false);
        setFile({id: dados.id, name: dados.name, content: dados.content});
      } )
      .catch( error => {
        setError("Sorry, an unexpected error occurred");
      } );
  }, [setEdited, setFile, setError]);

  const deleteFile = useCallback(fileId => {
    setError(null);
    setMsg(null);
    fetch('https://my-json-server.typicode.com/open-veezoo/editor/files/'+fileId, {
      method: 'DELETE'
    })
      .then( response => {
        if (!response.ok) { throw response };
        return response.json();
      })
      .then( dados => {
        setEdited(false);
        setFile(null)
        setMsg("Success on delete");
      } )
      .catch( error => {
        setError(error);
      } );
  }, [setEdited, setFile, setError]);

  const saveFile = useCallback(fileId => {
    setError(null);
    setMsg(null);
    const formData = new FormData();
    formData.append('id', fileId);
    formData.append('name', file.name);
    formData.append('content', file.content);
    fetch('https://my-json-server.typicode.com/open-veezoo/editor/files/'+fileId, {
      method: 'PUT',
      body: formData
    })
      .then( response => {
        if (!response.ok) { throw response };
        return response.json();
      })
      .then( dados => {
        setEdited(false);
        setFile(null)
        setMsg("Success on save");
      } )
      .catch( error => {
        setError("Sorry, an unexpected error occurred");
      } );
  }, [file, setEdited, setFile, setError]);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
    setMsg(null);
  }, [setError, setMsg]);

  if(running){
    return <Box height="100%" display="flex" width="100%" bgcolor="grey.100"><Box m="auto"><CircularProgress/></Box></Box>;
  }

  let alert = null;
  if(error){
    alert = <div className={classes.root}>
    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      </div>
  }else{
    if(msg){
      alert = <div className={classes.root}>
      <Snackbar open={msg} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {msg}
          </Alert>
        </Snackbar>
        </div>
    }
  }

  return <React.Fragment>
      <Grid container height="100%" spacing={5}>
          <Grid height="100%" item xs={12} sm={4}>
            <FileTree filetree={filetree} onLoadFile={loadFile}></FileTree>
          </Grid>
          <Grid height="100%" item xs={12} sm={8}>
            <Grid item xs={12}>
              <ActionsBar edited={edited} file={file} onDelete={deleteFile} onSave={saveFile} />
            </Grid>
            <Box m={1} height="100%" xs={12}>
              <Editor file={file} onSetContent={onSetContent} />
            </Box>
          </Grid>
        </Grid>
      {alert}
    </React.Fragment>;
}


export default OnlineEditor;