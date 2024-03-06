import { ChangeEvent, useState } from 'react';

export const useAttackModifierInput = () => {
   const [value, setValue] = useState('');

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9+-d]+/g, '');
      setValue(value);
   };
   const onBlur = () => {
      const regex = /(?:[+\\-])?\b[1-9]\d*d(?:4|6|8|10|12)\b/g;
      let validatedValue = value.match(regex)?.join('');
      if (validatedValue) {
         validatedValue[0] === '+' ? (validatedValue = validatedValue.slice(1)) : null;
      }
      validatedValue ? setValue(validatedValue) : setValue('');
   };

   return { value, onChange, onBlur };
};
