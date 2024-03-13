import { FC } from 'react';
import { Button } from 'src/shared/ui/button';
import { useAppDispatch } from 'src/shared/lib';
import { attackParamsActions } from '../../model/reducers/attack-fields';
import { attackTypeActions } from '../../model/reducers/attack-type-select';
import { damageActions } from '../../model/reducers/damage-fields';
import { specialPropertiesActions } from '../../model/reducers/special-properties';
import { throwListActions } from '../../model/reducers/throw-list';

import styles from './styles.module.scss';

interface IProps {
   id: string;
}

export const RemoveThrow: FC<IProps> = ({ id }) => {
   const dispatch = useAppDispatch();
   const { removeAttackParams } = attackParamsActions;
   const { removeThrowType } = attackTypeActions;
   const { removeThrow } = damageActions;
   const { removeSpecialProperties } = specialPropertiesActions;
   const { removeThrow: deleteThrow } = throwListActions;

   const onClick = () => {
      dispatch(deleteThrow(id));
      dispatch(removeAttackParams(id));
      dispatch(removeThrowType(id));
      dispatch(removeThrow(id));
      dispatch(removeSpecialProperties(id));
   };

   return (
      <Button
         type="primary"
         size="small"
         shape="circle"
         onClick={onClick}
         className={styles.button}>
         +
      </Button>
   );
};
