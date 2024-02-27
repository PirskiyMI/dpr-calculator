import { useCallback, useState } from 'react';

export const useSelect = (initialValue: string) => {
   const [selectedValue, setSelectedValue] = useState<string>(initialValue);

   const onChange = useCallback((val: string) => setSelectedValue(val), []);

   return { selectedValue, onChange };
};
