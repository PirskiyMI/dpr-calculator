import { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Button } from 'src/shared/ui/controls/button';

import styles from './styles.module.scss';
import {
   throwListActions,
   attackParamsActions,
   attackTypeActions,
   damageActions,
   specialPropertiesActions,
   getThrowListLength,
} from 'src/entities/throw';

export const AddThrow: FC = () => {
   const throwListLength = useAppSelector(getThrowListLength);
   const dispatch = useAppDispatch();
   const { addAttackParams } = attackParamsActions;
   const { addThrowType } = attackTypeActions;
   const { addThrow } = damageActions;
   const { addSpecialProperties } = specialPropertiesActions;
   const { addThrow: createThrow } = throwListActions;

   const onClick = () => {
      if (throwListLength >= 5) {
         alert('Максимальное количество бросков равно 5');
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
      <Button onClick={onClick} className={styles.button}>
         Добавить бросок
      </Button>
   );
};
