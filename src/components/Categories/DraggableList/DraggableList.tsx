import update from 'immutability-helper';
import { useCallback } from 'react';

import { Category, SetState } from '../../../utils/commonTypes';
import DraggableItem from './DraggableItem';

type DraggableListProps = {
  categories: Category[];
  setCategoriesArr: SetState<Category[]>;
  setIdToDelete: SetState<string>;
  setOpenDeleteModal: SetState<boolean>;
};

const DraggableList = (props: DraggableListProps) => {
  const { categories, setCategoriesArr, setIdToDelete, setOpenDeleteModal } = props;

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCategoriesArr(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((card: Category, index: number) => {
    return (
      <DraggableItem
        key={card.id}
        category={card}
        index={index}
        moveCard={moveCard}
        setOpenDeleteModal={setOpenDeleteModal}
        setIdToDelete={setIdToDelete}
        setCategoriesArr={setCategoriesArr}
      />
    );
  }, []);

  return (
    <>
      <div style={{ width: '100%', maxWidth: '638px' }}>
        {categories.map((category, i) => renderCard(category, i))}
      </div>
    </>
  );
};

export default DraggableList;
