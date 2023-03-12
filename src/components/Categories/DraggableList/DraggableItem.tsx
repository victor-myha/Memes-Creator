import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Category, SetState } from '../../../utils/commonTypes';
import CategoryItem from '../CategoryItem/CategoryItem';

type CategoryItemProps = {
  category: Category;
  setCategoriesArr: SetState<Category[]>;
  index: number;
  setIdToDelete: SetState<string>;
  setOpenDeleteModal: SetState<boolean>;
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

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
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
