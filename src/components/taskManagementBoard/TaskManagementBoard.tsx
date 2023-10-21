import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { x } from '@xstyled/styled-components'
import React, { useState } from 'react'
import { ColumnContainer } from './ColumnContainer'
import { createPortal } from 'react-dom'

export type Id = string | number

export type Column = {
  id: Id
  columnTitle: string
}

export type Task = {
  id: Id
  boardColumnId: Id
  taskTitle: string
}

const defaultColumns: Column[] = [
  {
    id: 'not_started',
    columnTitle: '未着手',
  },
  {
    id: 'doing',
    columnTitle: '取り組み中',
  },
  {
    id: 'completed',
    columnTitle: '完了済み',
  },
]

const defaultTasks: Task[] = [
  {
    id: '1',
    boardColumnId: 'not_started',
    taskTitle: 'dnd-kitの勉強',
  },
  {
    id: '2',
    boardColumnId: 'not_started',
    taskTitle: 'Next.jsの勉強',
  },
  {
    id: '3',
    boardColumnId: 'not_started',
    taskTitle: 'dnd-kitの勉強',
  },
  {
    id: '4',
    boardColumnId: 'doing',
    taskTitle: 'githubActionsの勉強',
  },
  {
    id: '5',
    boardColumnId: 'doing',
    taskTitle: 'remixの勉強',
  },
  {
    id: '6',
    boardColumnId: 'completed',
    taskTitle: 'Goの勉強',
  },
  {
    id: '7',
    boardColumnId: 'completed',
    taskTitle: 'Cssの勉強',
  },
]

export const TaskManagementBoard = () => {
  const [columns, setColumns] = useState(defaultColumns)

  const [tasks, setTasks] = useState(defaultTasks)

  const [activeColumn, setActiveColumn] = useState<null | Column>(null)

  const generateId = () => Math.floor(Math.random() * 10001)

  const handleCreateNewColumn = () => {
    const newColumn = {
      id: generateId().toString(),
      columnTitle: `Column ${columns.length + 1}`,
    }
    setColumns([...columns, newColumn])
  }

  const handleDeleteColumn = (id: Id) => {
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns)
  }

  // onDragStart は DragOverlay を使用する際のみ指定する
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    // active は現在ドラッグ中の対象, over はドラッグ中の対象がどこを超えたか
    const {active, over} = event
    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id
    console.log('active',activeColumnId)
    console.log('over', overColumnId)

    if (activeColumnId !== overColumnId) {
      const activeColumnIndex = columns.findIndex(column => column.id === activeColumnId)
      const overColumnIndex = columns.findIndex(column => column.id === overColumnId)
      const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)
      setColumns(newColumns)
    }

  }
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3}})
  )

  return (
    <x.div>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
      <x.div m="auto" display="flex" gap="20px">
        <x.div display="flex" gap="30px">
          {/* SortableContext には items を渡す必要がある */}
          <SortableContext items={columns}>
          {columns.map(column => (
            <ColumnContainer key={column.id} column={column} deleteColumn={handleDeleteColumn}/>
          ))}
          </SortableContext>
        </x.div>
        <x.button
          onClick={() => handleCreateNewColumn()}
          h="50px"
          w="250px"
          p="4px"
          borderRadius="6px"
          color={{ _: 'white', hover: 'black' }}
          background={{ _: 'black', hover: 'gray' }}
        >
          セクションを追加
        </x.button>
      </x.div>
      {/* createPortalとは */}
      {createPortal(

      <DragOverlay>
        {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={handleDeleteColumn} />}
      </DragOverlay>
      ,
      document.body
      )}
      </DndContext>
    </x.div>
  )
}
