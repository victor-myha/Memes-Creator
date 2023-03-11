export type Category = {
  id: string;
  name: string;
  counter: number;
  status: 'on' | 'off';
  newCategory?: boolean;
};
