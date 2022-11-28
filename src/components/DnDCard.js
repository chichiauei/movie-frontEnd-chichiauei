import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import Card from 'react-bootstrap/Card';
import { ItemTypes } from "./ItemTypes";

const style = {
  padding: "10px",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};

// method 2: without using findCard
export const DnDCard = ({ id, title, index, poster, moveCard }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
 
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top
   
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
     
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
   
      moveCard(dragIndex, hoverIndex)
    
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))


  return (

    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
    <Card className="favoritesCard">
      { index < 9 ?
      <div className="favoritesNumber favoritesNumberOneDigit">
        { index + 1 }
      </div>
      :
      <div className="favoritesNumber favoritesNumberTwoDigit">
         { index+1 }
      </div>
      }
    <div>
    <Card.Img
          className="favoritesPoster"
          src={poster+"/100px180"}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src="/images/missing.png";
          }}/>
    </div>
    <div className="favoritesTitle">
    { title }
    </div>
    </Card>
</div>
);
};


