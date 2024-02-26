import { useState } from 'react';

export const useSelect = (initialValue: string) => {
   const [selectedValue, setSelectedValue] = useState<string>(initialValue);

   const onChange = (val: string) => setSelectedValue(val);

   return { selectedValue, onChange };
};
