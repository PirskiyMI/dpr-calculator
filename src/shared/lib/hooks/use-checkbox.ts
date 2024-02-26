import { useState } from 'react';

export const useCheckbox = () => {
   const [checked, setChecked] = useState<boolean>(false);

   const onChange = () => setChecked((prev) => (prev = !prev));

   return { checked, onChange };
};
