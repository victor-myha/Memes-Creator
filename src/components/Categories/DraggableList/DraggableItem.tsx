import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Category } from '../../../utils/commonTypes';
import CategoryItem from '../CategoryItem/CategoryItem';

type CategoryItemProps = {
  category: Category;
  setCategoriesArr: (value: Category[]) => void;
  index: number;
  setIdToDelete: (value: string) => void;
  setOpenDeleteModal: (value: boolean) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

const DraggableItem = (props: CategoryItemProps) => {
  const { category, setCategoriesArr, setIdToDelete, setOpenDeleteModal, moveCard, index } = props;

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id: category.id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        ...{
          cursor: 'grab',
        },
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <CategoryItem
        category={category}
        setOpenDeleteModal={setOpenDeleteModal}
        setIdToDelete={setIdToDelete}
        setCategoriesArr={setCategoriesArr}
      />
    </div>
  );
};

export default DraggableItem;
