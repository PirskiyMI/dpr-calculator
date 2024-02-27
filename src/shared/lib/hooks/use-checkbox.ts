import { useCallback, useState } from 'react';

export const useCheckbox = () => {
   const [checked, setChecked] = useState<boolean>(false);

   const onChange = useCallback(() => setChecked((prev) => (prev = !prev)), []);

   return { checked, onChange };
};
