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
         <Field value={String(attack)} maxLength={2} onChange={setAttack} />
         <Field value={String(protection)} maxLength={2} onChange={setProtection} />
      </div>
   );
};
