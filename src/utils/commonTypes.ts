import { Dispatch, SetStateAction } from 'react';

export type Category = {
  id: string;
  name: string;
  counter: number;
  status: 'on' | 'off';
  newCategory?: boolean;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;
