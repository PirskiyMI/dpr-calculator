import { useState, ChangeEvent, useCallback } from 'react';

export const useInputNumber = (defaultValue?: string) => {
   const [value, setValue] = useState<string>(defaultValue || '');

   const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const numbersOnly = e.target.value.replace(/[^0-9\\+-]+/g, '');
      setValue(numbersOnly);
   }, []);

   return { value, onChange };
};
