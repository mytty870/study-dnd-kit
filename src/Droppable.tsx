import { useDroppable } from '@dnd-kit/core';
import { x } from '@xstyled/styled-components';
import React from 'react'

export const Droppable = (props: any) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  // console.log(isOver)
  return (
    <x.div textAlign="center" w="100px" h="30px" p="10px" m="10px" background="#f0f8ff" border="1px solid" borderRadius="4px"  ref={setNodeRef} style={style}>
      {props.children}
    </x.div>
  )
}
