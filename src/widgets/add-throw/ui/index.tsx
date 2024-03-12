import { FC } from 'react';
import { attackParamsActions } from 'src/features/attack-fields';
import { attackTypeActions } from 'src/features/attack-type-select';
import { damageActions } from 'src/features/damage-fields';
import { specialPropertiesActions } from 'src/features/special-properties';
import { useAppDispatch } from 'src/shared/lib';
import { Button } from 'src/shared/ui/button';
import { throwListActions } from '../model/reducers';
import styles from './styles.module.scss';

export const AddThrow: FC = () => {
   const dispatch = useAppDispatch();
   const id = String(Date.now());
   const { addAttackParams } = attackParamsActions;
   const { addThrowType } = attackTypeActions;
   const { addThrow } = damageActions;
   const { addSpecialProperties } = specialPropertiesActions;
   const { addThrow: createThrow } = throwListActions;

   const onClick = () => {
      dispatch(addAttackParams(id));
      dispatch(addThrowType(id));
      dispatch(addThrow(id));
      dispatch(addSpecialProperties(id));
      dispatch(createThrow(id));
   };

   return (
      <Button type="primary" onClick={onClick} className={styles.button}>
         Добавить бросок
      </Button>
   );
};
