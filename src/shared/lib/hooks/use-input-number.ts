import { useState, ChangeEvent } from 'react';

export const useInputNumber = () => {
   const [value, setValue] = useState<string>('');

   const increment = () =>
      setValue((prev) => {
         let res = Number(prev);
         res += 1;

         return String(res);
      });
   const decrement = () =>
      setValue((prev) => {
         let res = Number(prev);
         return res > 0 ? String(--res) : String(res);
      });

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const numbersOnly = e.target.value.replace(/[^1-9]/g, '');
      setValue(numbersOnly);
   };
   return { value, onChange, increment, decrement };
};
