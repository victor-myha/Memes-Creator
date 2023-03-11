import update from 'immutability-helper';
import { useCallback } from 'react';

import { Category } from '../../../utils/commonTypes';
import DraggableItem from './DraggableItem';

const style = {
  width: 400,
};

type DraggableListProps = {
  categories: Category[];
  setCategoriesArr: (value: any) => void;
  setIdToDelete: (value: string) => void;
  setOpenDeleteModal: (value: boolean) => void;
};
const DraggableList = (props: DraggableListProps) => {
  const { categories, setCategoriesArr, setIdToDelete, setOpenDeleteModal } = props;

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCategoriesArr((prevCards: Category[]) =>
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
      />
    );
  }, []);

  return (
    <>
      <div style={style}>{categories.map((category, i) => renderCard(category, i))}</div>
    </>
  );
};

export default DraggableList;