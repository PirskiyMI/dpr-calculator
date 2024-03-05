import { ChangeEvent, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';

import styles from './styles.module.scss';
import { dicesSelector } from '../model/selectors';
import { DamageField } from './item';
import { TDiceName, damageActions } from '..';
import { Button } from 'src/shared/ui/button';

export const DamageFields = () => {
   const dices = useAppSelector(dicesSelector);
   const dispatch = useAppDispatch();
   const { setDices, setDiceType, addDice } = damageActions;

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
   const handleCreateField = useCallback(() => dispatch(addDice()), [dispatch, addDice]);

   return (
      <div className={styles.fields}>
         <Button type="default" shape="round" onClick={handleCreateField}>
            Add Dice
         </Button>
         <ul className={styles.list}>
            {dices.map((el) => (
               <li className={styles.list__item}>
                  <DamageField
                     {...el}
                     key={el.id}
                     options={options}
                     onFieldChange={onFieldChange}
                     onTypeChange={onTypeChange}
                  />
               </li>
            ))}
         </ul>
      </div>
   );
};
