import { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib';
import { MyButton } from 'shared/ui/controls/my-button';
import {
   throwListActions,
   attackParamsActions,
   attackTypeActions,
   damageActions,
   specialPropertiesActions,
   getThrowListLength,
} from 'entities/throw';

import styles from './AddThrow.module.scss';

export const AddThrow: FC = () => {
   const throwListLength = useAppSelector(getThrowListLength);
   const dispatch = useAppDispatch();
   const { addAttackParams } = attackParamsActions;
   const { addThrowType } = attackTypeActions;
   const { addThrow } = damageActions;
   const { addSpecialProperties } = specialPropertiesActions;
   const { addThrow: createThrow } = throwListActions;

   const onClick = () => {
      if (throwListLength >= 6) {
         alert('Максимальное количество бросков равно 6');
         return;
      }
      const id = String(Date.now());
      dispatch(addAttackParams(id));
      dispatch(addThrowType(id));
      dispatch(addThrow(id));
      dispatch(addSpecialProperties(id));
      dispatch(createThrow(id));
   };

   return (
      <MyButton onClick={onClick} className={styles.button}>
         Добавить бросок
      </MyButton>
   );
};
