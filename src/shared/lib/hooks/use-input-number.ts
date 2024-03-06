import { useState, ChangeEvent, useCallback } from 'react';

export const useInputNumber = (defaultValue?: string) => {
   const [value, setValue] = useState<string>(defaultValue || '');

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
      const numbersOnly = e.target.value.replace(/[^0-9\\+-]+/g, '');
      setValue(numbersOnly);
   }, []);

   return { value, onChange, increment, decrement };
};
