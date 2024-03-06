import { ChangeEvent, FC, memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Field } from 'src/shared/ui/controls/field';

import styles from './styles.module.scss';
import { attackSelector } from '../model/selectors';
import { attackActions } from '..';
import { useInputNumber } from 'src/shared/lib/hooks/use-input-number';

const getAttackSum = (value: string) => {
   const bonusList = value.split('+');
   let res = 0;

   for (const el of bonusList) {
      const bonusSubList = el.split('-');

      bonusSubList.length === 1
         ? (res += +bonusSubList[0])
         : (res += bonusSubList.reduce((acc, el) => (acc -= +el), +bonusSubList[0] * 2));
   }

   return res;
};

export const AttackFields: FC = memo(() => {
   const { attack, protection } = useAppSelector(attackSelector);
   const { setAttackBonus, setTargetProtection } = attackActions;
   const { value, onChange } = useInputNumber(String(attack));
   const dispatch = useAppDispatch();

   useEffect(() => {
      const timerId = setTimeout(() => {
         const result = getAttackSum(value);
         dispatch(setAttackBonus(result));
      }, 700);
      return () => clearTimeout(timerId);
   }, [dispatch, setAttackBonus, value]);

   /*    const setAttack = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const value = Number(e.target.value);
         dispatch(setAttackBonus(value));
      },
      [dispatch, setAttackBonus],
   ); */

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
               <Field value={value} onChange={onChange} placeholder="Бонус атаки" />
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
});
