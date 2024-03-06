import { ChangeEvent, FC, memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Field } from 'src/shared/ui/controls/field';

import styles from './styles.module.scss';
import { attackSelector } from '../model/selectors';
import { attackActions } from '..';
import { useInputNumber } from 'src/shared/lib/hooks/use-input-number';
import { useAttackModifierInput } from '../lib/hooks';
import { getAttackBonusSum, getAttackModifierSum } from '../lib/helpers';

export const AttackFields: FC = memo(() => {
   const { attack, protection } = useAppSelector(attackSelector);
   const { setAttackBonus, setTargetProtection } = attackActions;
   const attackInput = useInputNumber(attack === 0 ? '' : String(attack));
   const attackModifierInput = useAttackModifierInput();
   const dispatch = useAppDispatch();

   useEffect(() => {
      const timerId = setTimeout(() => {
         const modifierSum = isNaN(getAttackBonusSum(attackModifierInput.value))
            ? 0
            : getAttackBonusSum(attackModifierInput.value);
         const result = getAttackModifierSum(attackInput.value) + modifierSum;
         dispatch(setAttackBonus(result));
      }, 700);
      return () => clearTimeout(timerId);
   }, [dispatch, setAttackBonus, attackInput.value, attackModifierInput.value]);

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
               <Field {...attackInput} placeholder="Бонус атаки" />
            </li>
            <li className={styles.fields__item}>
               <Field
                  value={String(protection)}
                  placeholder="Бонус защиты"
                  maxLength={2}
                  onChange={setProtection}
               />
            </li>
            <li className={styles.fields__item}>
               <Field {...attackModifierInput} placeholder="Ситуативные бонусы" />
            </li>
         </ul>
      </div>
   );
});
