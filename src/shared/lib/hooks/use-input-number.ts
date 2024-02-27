import { useState, ChangeEvent, useCallback } from 'react';

export const useInputNumber = () => {
   const [value, setValue] = useState<string>('');

   const increment = useCallback(
      () =>
         setValue((prev) => {
            if (prev.length <= 2) {
               let res = Number(prev);
               res += 1;
               return String(res);
            }
            return prev;
         }),
      [],
   );

   const decrement = useCallback(
      () =>
         setValue((prev) => {
            let res = Number(prev);
            return res > 0 ? String(--res) : String(res);
         }),
      [],
   );

   const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const numbersOnly = e.target.value.replace(/[^1-9]/g, '');
      setValue(numbersOnly);
   }, []);

   return { value, onChange, increment, decrement };
};