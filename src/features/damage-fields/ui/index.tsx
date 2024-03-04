import { ChangeEvent, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';

import styles from './styles.module.scss';
import { dicesSelector } from '../model/selectors';
import { DamageField } from './item';
import { TDiceName, damageActions } from '..';

export const DamageFields = () => {
   const dices = useAppSelector(dicesSelector);
   const dispatch = useAppDispatch();
   const { setDices, setDiceType } = damageActions;

   const options = useMemo(() => ['d4', 'd6', 'd8', 'd10', 'd12'], []);
   const onFieldChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const count = +e.target.value;
         dispatch(setDices({ count, id: e.target.id }));
      },
      [dispatch, setDices],
   );
   const onTypeChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const id = e.target.name;
         const name = e.target.value as TDiceName;
         dispatch(setDiceType({ id, name }));
      },
      [dispatch, setDiceType],
   );

   return (
      <div className={styles.fields}>
         {dices.map((el) => (
            <DamageField
               {...el}
               key={el.id}
               options={options}
               onFieldChange={onFieldChange}
               onTypeChange={onTypeChange}
            />
         ))}
      </div>
   );
};
