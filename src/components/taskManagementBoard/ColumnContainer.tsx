import React from 'react'
import { Column, Id, Task } from './TaskManagementBoard'
import { useSortable } from '@dnd-kit/sortable'
import { x } from '@xstyled/styled-components'
import { CSS } from '@dnd-kit/utilities'

type ColumnContainerProps = {
  column: Column
  deleteColumn: (id: Id) => void
  // tasks: Task[],
}

export const ColumnContainer = ({
  column, // tasks,
  deleteColumn,
}: ColumnContainerProps) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    // data を指定することで、DndContext の event 内に 指定した type と column の内容が反映される
    data: { type: 'Column', column },
  })
  if (isDragging) {
    return (
      <x.div
      ref={setNodeRef}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
      background="green"
      w="300px"
      h="500px"
      borderRadius="6px"
      opacity="0.7"
    >
    </x.div>

    )
  }
  return (
    <x.div
      ref={setNodeRef}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
      background="green"
      w="300px"
      h="500px"
      borderRadius="6px"
    >
      <x.div {...attributes} {...listeners} display="flex" justifyContent="space-between" background="gray">
        <x.div background="red" borderRadius="6px" fontWeight="bold">
          {column.columnTitle}
        </x.div>
        <x.button onClick={() => deleteColumn(column.id)}>Delete</x.button>
      </x.div>
      <x.div>Content</x.div>
      <x.div>Footer</x.div>
    </x.div>
  )
}
