import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { x } from '@xstyled/styled-components'

type SortableItemProps = {
  id: number | string,
  title: string,
}

export const SortableItem = ({id, title}: SortableItemProps) => {
  const {attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({id: id})

  return (
    <x.div m="10px 0" p="16px 0" background="#2a2b2d" color="#fff" fontWeight="bold" opacity="0.8" w="100%" textAlign="center" borderRadius="6px" alignItems="center" verticalAlign="middle" transform={CSS.Transform.toString(transform)} transition={transition} ref={setNodeRef} >
      <x.div ref={setActivatorNodeRef} {...attributes} {...listeners}>
      {title}
      </x.div>
    </x.div>
  )
}
