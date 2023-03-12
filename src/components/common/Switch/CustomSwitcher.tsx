import { ChangeEventHandler, useCallback } from 'react';

import { Category, SetState } from '../../../utils/commonTypes';
import './CustomSwitcher.scss';

type CustomSwitcherProps = {
  category: Category;
  setCategoriesArr: SetState<Category[]>;
};

const CustomSwitcher = (props: CustomSwitcherProps) => {
  const { category, setCategoriesArr } = props;

  const handleSwitch: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      setCategoriesArr((prev: Category[]) => {
        const index = prev.findIndex(cat => cat.id === category.id);
        prev.splice(index, 1, { ...category, status: category.status === 'on' ? 'off' : 'on' });
        return [...prev];
      });
    },
    [category, setCategoriesArr]
  );

  return (
    <label className='switch'>
      {category.status === 'on' && <span className={'on'}>On</span>}
      <input type='checkbox' checked={category.status === 'on'} onChange={handleSwitch} />
      <span className='slider round'></span>
      {category.status === 'off' && <span className={'off'}>Off</span>}
    </label>
  );
};

export default CustomSwitcher;
