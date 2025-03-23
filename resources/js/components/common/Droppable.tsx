import {useDroppable} from '@dnd-kit/core';


export default function Droppable({id,children,...props}) {
  const {setNodeRef} = useDroppable({
    id,
  });
  
  return (
    <div ref={setNodeRef} {...props}>
      {children}
    </div>
  );
}