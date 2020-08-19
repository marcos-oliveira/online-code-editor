import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import FileTree from '../components/FileTree';
import ActionsBar from '../components/ActionsBar';
import { CircularProgress, Grid, Box } from '@material-ui/core';


const OnlineEditor = props => {

  const [ edited, setEdited ] = useState(false);
  const [ file, setFile ] = useState();
  const [ error, setError ] = useState("");
  const [ running, setRunning ] = useState(false);
  const [ filetree, setFiletree ] = useState();

  const fetchTree = useCallback(() => {
    setRunning(true);
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
        setError('An error ocurred');
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
        setError(error);
      } );
  }, [setEdited, setFile, setError]);

  const deleteFile = useCallback(fileId => {
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
        alert('success');
      } )
      .catch( error => {
        setError(error);
      } );
  }, [setEdited, setFile, setError]);

  const saveFile = useCallback(fileId => {
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
        alert('Success');
      } )
      .catch( error => {
        setError(error);
      } );
  }, [file, setEdited, setFile, setError]);

  if(running){
    return <Box height="100%" display="flex" width="100%" bgcolor="grey.100"><Box m="auto"><CircularProgress/></Box></Box>;
  }
  let msg = null;
  if(error){
    alert(error);
  }

  return <Grid container height="100%" spacing={10}>
  {msg}
    <Grid height="100%" item xs={3}>
      <FileTree filetree={filetree} onLoadFile={loadFile}></FileTree>
    </Grid>
    <Grid height="100%" item xs={9}>
      <Grid item xs={12}>
        <ActionsBar edited={edited} file={file} onDelete={deleteFile} onSave={saveFile} />
      </Grid>
      <Box m={3} height="100%">
        <Editor file={file} onSetContent={onSetContent} />
      </Box>
    </Grid>
  </Grid>;
}


export default OnlineEditor;