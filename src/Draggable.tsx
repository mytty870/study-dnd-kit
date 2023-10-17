import { useDraggable } from '@dnd-kit/core';
import { x } from '@xstyled/styled-components';

export const Draggable = (props: any) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  // console.log(style)
  return (
    <x.button display="block" textAlign="center" verticalAlign="middle" textDecoration="none" w="100px" margin="auto" p="3px 5px"  fontWeight="bold" border="2px solid #27acd9" background={{_:"#27acd9", hover: "#fff" }} color={{_: "#fff", hover: "#27acd9"}} borderRadius="100vh"   ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </x.button>
  );
}
