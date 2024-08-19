import React, { Component, useState } from 'react'
import { DndProvider, DragSource } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { SortableTreeWithoutDndContext as SortableTree } from '../../../src'

// -------------------------
// Create an drag source component that can be dragged into the tree
// https://react-dnd.github.io/react-dnd/docs-drag-source.html
// -------------------------
// This type must be assigned to the tree via the `dndType` prop as well
const externalNodeType = 'yourNodeType'
const externalNodeSpec = {
  // This needs to return an object with a property `node` in it.
  // Object rest spread is recommended to avoid side effects of
  // referencing the same object in different trees.
  beginDrag: (componentProps: any) => ({ node: { ...componentProps.node } }),
}
const externalNodeCollect = (connect: any /* , monitor */) => ({
  connectDragSource: connect.dragSource(),
  // Add props via react-dnd APIs to enable more visual
  // customization of your component
  // isDragging: monitor.isDragging(),
  // didDrop: monitor.didDrop(),
})
class externalNodeBaseComponent extends Component {
  render() {
    const { connectDragSource, node }: any = this.props

    return connectDragSource(
      <div
        style={{
          display: 'inline-block',
          padding: '3px 5px',
          background: 'blue',
          color: 'white',
        }}>
        {node.title}
      </div>,
      { dropEffect: 'copy' }
    )
  }
}

const YourExternalNodeComponent = DragSource(
  externalNodeType,
  externalNodeSpec,
  externalNodeCollect
)(externalNodeBaseComponent)

const ExternalNode: React.FC = () => {
  const [treeData, setTreeData] = useState([{ title: 'Mama Rabbit' }, { title: 'Papa Rabbit' }]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ height: 300, width: 700 }}>
          <SortableTree
            treeData={treeData}
            onChange={setTreeData}
            dndType={externalNodeType}
          />
        </div>
        <YourExternalNodeComponent node={{ title: 'Baby Rabbit' }} />← drag
        this
      </div>
    </DndProvider>
  )
}

export default ExternalNode;
