import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import { useState } from 'react';

function App() {
  const containers = ['A', 'B', 'C']
  const [parent ,setParent] = useState(null)
  // const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      { parent === null ? draggableMarkup : null}
      {containers.map((id) => (
      <Droppable key="id" id={id}>
        {parent===id ? draggableMarkup : 'Drop here'}
      </Droppable>
      ))}
    </DndContext>
  )

  function handleDragEnd(event: any) {
    const {over} = event
    setParent(over ? over.id : null)
  }

}



export default App;
