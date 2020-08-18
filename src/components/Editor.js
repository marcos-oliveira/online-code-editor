import React, { useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";

const styles = {
    root: {
      background: "black",
      width: "100%",
      height: "100%"
    },
    input: {
      color: "white"
    }
  };

// import { Container } from './styles';

const Editor = props =>  {

    const { classes, fileName } = props;
    return <TextField
          label={fileName}
          multiline
          className={classes.root}
          InputProps={{
            className: classes.input
          }}
          rows="50" />;
}

Editor.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(Editor);