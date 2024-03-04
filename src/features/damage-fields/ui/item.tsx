import { ChangeEvent, FC, useMemo } from 'react';
import { Dropdown } from 'src/shared/ui/controls/dropdown';
import { Field } from 'src/shared/ui/controls/field';
import { IDice, TDiceName, damageActions } from '..';
import { useAppDispatch } from 'src/shared/lib';

export const DamageField: FC<IDice> = ({ name, count, id, value }) => {
   const dispatch = useAppDispatch();
   const { setDices, setDiceType } = damageActions;
   const options = useMemo(() => ['d4', 'd6', 'd8', 'd10', 'd12'], []);
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const count = +e.target.value;
      dispatch(setDices({ count, id: e.target.id }));
   };

   const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.value as TDiceName;
      dispatch(setDiceType({ id, name, value }));
   };

   return (
      <>
         <Field
            id={id}
            name={name}
            placeholder={name}
            value={count ? String(count) : ''}
            maxLength={2}
            onChange={onChange}
         />
         <Dropdown defaultValue={name} options={options} onChange={onTypeChange} />
      </>
   );
};
