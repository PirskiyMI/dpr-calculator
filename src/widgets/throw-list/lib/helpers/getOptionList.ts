import { IOption } from 'shared/lib';

export const getOptionList = (iterableObject: object, objTwo: object) => {
   const list: IOption[] = [];
   for (const key in iterableObject) {
      const title = objTwo[key as keyof typeof objTwo];
      list.push({ title, value: key });
   }
   return list;
};
