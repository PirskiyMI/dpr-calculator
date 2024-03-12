import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib';
import { Button } from 'src/shared/ui/button';

import styles from './styles.module.scss';
import { throwListActions } from '../../model/reducers/throw-list';
import { attackParamsActions } from '../../model/reducers/attack-fields';
import { attackTypeActions } from '../../model/reducers/attack-type-select';
import { damageActions } from '../../model/reducers/damage-fields';
import { specialPropertiesActions } from '../../model/reducers/special-properties';

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
