import { ChangeEvent, FC, memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib';
import { Field } from 'shared/ui/controls/field';
import { useInputNumber } from 'shared/lib/hooks/use-input-number';
import { getAttackParamsSelector, attackParamsActions } from 'entities/attack';

import { useAttackModifierInput } from '../../lib/hooks';
import { getAttackBonusSum } from '../../lib/helpers/get-attack-bonus-sum';
import { getAttackModifierSum } from '../../lib/helpers/get-attack-modifier-sum';

import styles from './ThrowFields.module.scss';

interface IProps {
   id: string;
}

export const ThrowFields: FC<IProps> = memo(({ id }) => {
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
      [id],
   );

   return (
      <div className={styles.fields}>
         <ul className={styles.fields__list}>
            <li className={styles.fields__item}>
               <Field name={id} {...attackInput} placeholder="Бонус атаки" />
            </li>
            <li className={styles.fields__item}>
               <Field
                  name={id}
                  value={String(targetProtection)}
                  placeholder="Бонус защиты"
                  maxLength={2}
                  onChange={setProtection}
               />
            </li>
            <li className={styles.fields__item}>
               <Field name={id} {...attackModifierInput} placeholder="Ситуативные бонусы" />
            </li>
         </ul>
      </div>
   );
});
