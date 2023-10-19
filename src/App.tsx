import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { x } from '@xstyled/styled-components'
import {
  restrictToVerticalAxis, restrictToWindowEdges,
} from '@dnd-kit/modifiers'

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
  )

  return (
    <DndContext
      sensors={sensors}
      // colllisionDetection は基本 closestCenter を設定(defaultとして推奨)
      collisionDetection={closestCenter}
      // modifiers の設定
      // restrictToVerticalAxis : 垂直方向のみの移動制限
      // restrictToHorizontalAxis : 水平方向のみの移動制限
      // restrictToWindowEdges : ウィンドウ内の移動のみに制限(ウインドウの中ならどこでも移動できる)
      // restrictToParentElement : 親要素の内部の移動のみに制限
      // restrictToFirstScrollableAncestor : 初回のスクロール可能な部分のみの移動に制限(試していないので、どのような挙動になるか不明)
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <x.div
          background="#3b3b3b"
          w="30%"
          color="#fff"
          fontSize="0.8rem"
          textAlign="center"
          borderRadius="6px"
          p="10px 0 10px 0"
        >
          <x.h1>打順</x.h1>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id} title={item.title} />
          ))}
        </x.div>
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)
    }
  }
}

export default App
