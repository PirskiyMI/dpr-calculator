import { ChangeEvent, FC, memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Field } from 'src/shared/ui/controls/field';

import styles from './styles.module.scss';
import { getAttackParamsSelector } from '../model/selectors';
import { attackParamsActions } from '..';
import { useInputNumber } from 'src/shared/lib/hooks/use-input-number';
import { useAttackModifierInput } from '../lib/hooks';
import { getAttackBonusSum, getAttackModifierSum } from '../lib/helpers';

interface IProps {
   id: string;
}

export const AttackFields: FC<IProps> = memo(({ id }) => {
   const { attackBonus, targetProtection } = useAppSelector((state) =>
      getAttackParamsSelector(state, id),
   );
   const { setAttackParams } = attackParamsActions;
   const attackInput = useInputNumber(attackBonus === 0 ? '' : String(attackBonus));
   const attackModifierInput = useAttackModifierInput();
   const dispatch = useAppDispatch();

   useEffect(() => {
      const timerId = setTimeout(() => {
         const modifierSum = isNaN(getAttackBonusSum(attackModifierInput.value))
            ? 0
            : getAttackBonusSum(attackModifierInput.value);
         const result = getAttackModifierSum(attackInput.value) + modifierSum;
         dispatch(setAttackParams({ id, params: { attackBonus: result } }));
      }, 700);
      return () => clearTimeout(timerId);
   }, [attackInput.value, attackModifierInput.value, dispatch, id, setAttackParams]);

   const setProtection = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const value = Number(e.target.value);
         dispatch(setAttackParams({ id, params: { targetProtection: value } }));
      },
      [dispatch, id, setAttackParams],
   );

   return (
      <div className={styles.fields}>
         <ul className={styles.fields__list}>
            <li className={styles.fields__item}>
               <Field {...attackInput} placeholder="Бонус атаки" />
            </li>
            <li className={styles.fields__item}>
               <Field
                  value={String(targetProtection)}
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
