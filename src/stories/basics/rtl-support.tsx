import React, { useState } from 'react'
import { SortableTree } from '../../../src'

const data = [
  {
    title: 'Chicken',
    expanded: true,
    children: [
      { title: 'Egg' },
      { title: 'Egg' },
      { title: 'Egg' },
      { title: 'Egg' },
      { title: 'Egg' },
      { title: 'Egg' },
    ],
  },
];

const RTLSupport: React.FC = () => {
  const [treeData, setTreeData] = useState(data);

  return (
    <div style={{ height: 300, width: 700 }}>
      <SortableTree
        rowDirection="rtl"
        treeData={treeData}
        onChange={setTreeData}
      />
    </div>
  )
}

export default RTLSupport;
