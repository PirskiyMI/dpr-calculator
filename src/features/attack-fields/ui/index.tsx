import { ChangeEvent, FC, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Field } from 'src/shared/ui/controls/field';

import styles from './styles.module.scss';
import { attackSelector } from '../model/selectors';
import { attackActions } from '..';

export const AttackFields: FC = () => {
   const { attack, protection } = useAppSelector(attackSelector);
   const { setAttackBonus, setTargetProtection } = attackActions;
   const dispatch = useAppDispatch();

   const setAttack = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const value = Number(e.target.value);
         dispatch(setAttackBonus(value));
      },
      [dispatch, setAttackBonus],
   );

   const setProtection = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const value = Number(e.target.value);
         dispatch(setTargetProtection(value));
      },
      [dispatch, setTargetProtection],
   );

   return (
      <div className={styles.fields}>
         <ul className={styles.fields__list}>
            <li className={styles.fields__item}>
               <Field
                  value={String(attack)}
                  placeholder="Бонус атаки"
                  maxLength={2}
                  onChange={setAttack}
               />
            </li>
            <li className={styles.fields__item}>
               <Field
                  value={String(protection)}
                  placeholder="Бонус защиты"
                  maxLength={2}
                  onChange={setProtection}
               />
            </li>
         </ul>
      </div>
   );
};
