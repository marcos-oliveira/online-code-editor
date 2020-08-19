import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Box from '@material-ui/core/Box';
import Tree from './Tree';

const FileTree = props => {
    if(props.filetree){
        return <Box p={2} m={1} overflow="auto" bgcolor="background.paper">
                  <TreeView 
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  >
                      {props.filetree.map(element=>{
                          return <Tree key={element.id} tree={element} onLoadFile={props.onLoadFile} />
                      })}
                </TreeView>
          </Box>
    }
    return null;
}

export default FileTree;