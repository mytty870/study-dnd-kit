import {DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core';
import { useState } from 'react';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {SortableItem} from './SortableItem'
import { x } from '@xstyled/styled-components';

function App() {
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Chikamoto',
    },
    {
      id: '2',
      title: 'Nakano',
    },
    {
      id: '3',
      title: 'Morishita',
    },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <x.div background="#3b3b3b" w="30%" color="#fff" fontSize="0.8rem" textAlign="center" borderRadius="6px" p="10px 0 10px 0">
          <x.h1>打順</x.h1>
          {items.map(item => <SortableItem key={item.id} id={item.id} title={item.title} />)}
        </x.div>
      </SortableContext>

    </DndContext>
  )

  function handleDragEnd(event: any) {
    const {active, over} = event;
    console.log(active)
    
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          const newItems = arrayMove(items, oldIndex, newIndex)
          setItems(newItems)
    }
  }

}



export default App;
