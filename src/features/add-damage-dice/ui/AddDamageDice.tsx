import { FC, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib';
import { MyButton } from 'shared/ui/controls/my-button';
import { damageActions, getDicesSelector } from 'entities/damage';

import styles from './AddDamageDice.module.scss';

interface IProps {
   id: string;
}

export const AddDamageDice: FC<IProps> = ({ id }) => {
   const fieldList = useAppSelector((state) => getDicesSelector(state, id));
   const { addDice } = damageActions;
   const dispatch = useAppDispatch();

   const createField = useCallback(() => {
      dispatch(addDice(id));
   }, [id, dispatch, addDice]);

   return (
      <MyButton
         onClick={createField}
         disabled={fieldList.length >= 3}
         className={styles.damageForm__button}>
         Добавить кость урона
      </MyButton>
   );
};
