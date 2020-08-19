import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../components/Editor';
import FileTree from '../components/FileTree';
import ActionsBar from '../components/ActionsBar';
import { CircularProgress, Grid, Box } from '@material-ui/core';


const OnlineEditor = props => {

  const [ content, setContent ] = useState("");
  const [ edited, setEdited ] = useState(false);
  const [ fileName, setFileName ] = useState("");
  const [ error, setError ] = useState("");
  const [ running, setRunning ] = useState(false);
  const [ filetree, setFiletree ] = useState();

  useEffect(() => {
    console.log('useeffect');
    fetchTree();
  }, []);

  const fetchTree = useCallback(() => {
    setRunning(true);
    fetch('https://my-json-server.typicode.com/open-veezoo/editor/filetree')
      .then( response => response.json())
      .then( dados => {
        setRunning(false);
        setFiletree(dados);
      } )
      .catch( error => {
        setRunning(false);
        console.log(error);
        setError(error);
      } );
  }, [setRunning, setFiletree, setError]);

  const onSetContent = useCallback((content) => {
    setContent(content);
    setEdited(true);
  }, [setContent, setEdited]);

  const loadFile = useCallback(fileId => {
    console.log('loadfile');
    setRunning(true);
    fetch('https://my-json-server.typicode.com/open-veezoo/editor/files/'+fileId)
      .then( response => response.json())
      .then( dados => {
        setRunning(false);
        setEdited(false);
        setFileName(dados.name)
        setContent(dados.content);
      } )
      .catch( error => {
        setRunning(false);
        console.log(error);
        setError(error);
      } );
  }, [setRunning, setEdited, setContent, setFileName, setError]);

  if(running){
    return <Box height="100%" display="flex" width="100%" bgcolor="grey.100"><Box m="auto"><CircularProgress/></Box></Box>;
  }

  return <Grid container height="100%" spacing={10}>
    <Grid height="100%" item xs={3}>
      <FileTree filetree={filetree} onLoadFile={loadFile}></FileTree>
    </Grid>
    <Grid height="100%" item xs={9}>
      <Grid item xs={12}>
        <ActionsBar edited={edited} fileName={fileName} />
      </Grid>
      <Box bgcolor="text.primary" height="100%">
        <Editor content={content} onSetContent={onSetContent} />
      </Box>
    </Grid>
  </Grid>;
}


export default OnlineEditor;