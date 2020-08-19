import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';

const Tree = props => {

    console.log(props);
    const clickHandler = (event, id) => {
        event.preventDefault();
        props.onLoadFile(id);
    }
    return props.tree.children.map((element)=>{
        if(element.isDirectory){
            return <TreeItem key={element.id} nodeId={element.id.toString()} label={element.name}>
                        <Tree onLoadFile={props.onLoadFile} tree={element} />
                    </TreeItem>;
        }else{
            return <TreeItem key={element.id} nodeId={element.id.toString()} label={element.name} onLabelClick={e => clickHandler(e, element.id)} />;
        }
    });
}

export default Tree;