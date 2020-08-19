import React, { useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";

const styles = {
    root: {
      background: "black",
      width: "100%",
      height: "100%",
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black"
      }
    },
    input: {
      color: "white"
    }
  };

// import { Container } from './styles';

const Editor = props =>  {

    const { classes, content } = props;
    return <TextField
          multiline
          className={classes.root}
          InputProps={{
            className: classes.input
          }}
          onChange={e => {
            props.onSetContent(e.target.value)
          }}
          variant="outlined"
          value={content} />;
}

Editor.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(Editor);