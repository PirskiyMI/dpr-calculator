import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Field } from 'src/shared/ui/controls/field';

import styles from './styles.module.scss';
import { dicesSelector } from '../model/selectors';
import { TDiceName, damageActions } from '..';

export const DamageFields = () => {
   const dices = useAppSelector(dicesSelector);
   const dispatch = useAppDispatch();
   const { setDices } = damageActions;

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const count = +e.target.value;
      const name = e.target.name as TDiceName;
      dispatch(setDices({ count, name }));
   };

   return (
      <div className={styles.fields}>
         {dices.map((el) => (
            <Field
               key={el.name}
               name={el.name}
               placeholder={el.name}
               value={el.count ? String(el.count) : ''}
               maxLength={2}
               onChange={onChange}
            />
         ))}
      </div>
   );
};
