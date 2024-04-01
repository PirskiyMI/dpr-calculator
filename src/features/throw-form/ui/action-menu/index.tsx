import { FC, useCallback, useState } from 'react';

import { Button } from 'src/shared/ui/button';

import styles from './styles.module.scss';
import { useAppDispatch } from 'src/shared/lib';
import {
   attackParamsActions,
   attackTypeActions,
   damageActions,
   specialPropertiesActions,
   throwListActions,
} from 'src/entities/throw';

interface IProps {
   id: string;
}

export const ThrowActionsMenu: FC<IProps> = ({ id }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { removeAttackParams, copyAttackParams } = attackParamsActions;
   const { removeThrowType, copyThrowType } = attackTypeActions;
   const { removeThrow, copyThrow } = damageActions;
   const { removeSpecialProperties, copySpecialProperties } = specialPropertiesActions;
   const { removeThrow: deleteThrow, addThrow } = throwListActions;
   const dispatch = useAppDispatch();

   const handleDelete = () => {
      dispatch(deleteThrow(id));
      dispatch(removeAttackParams(id));
      dispatch(removeThrowType(id));
      dispatch(removeThrow(id));
      dispatch(removeSpecialProperties(id));
   };

   const handleCopy = useCallback(() => {
      const newId = String(Date.now());

      const params = { id: newId, paramId: id };

      dispatch(copyAttackParams(params));
      dispatch(copyThrowType(params));
      dispatch(copyThrow(params));
      dispatch(copySpecialProperties(params));
      dispatch(addThrow(newId));
   }, [id]);

   const toggleOpen = () => setIsOpen(!isOpen);

   return (
      <div className={styles.menu}>
         <Button type="primary" shape="circle" onClick={toggleOpen} className={styles.menu__button}>
            <span className={styles.menu__dot}>.</span>
         </Button>
         {isOpen && (
            <div className={styles.menu__dropdown}>
               <div onClick={handleCopy}>Копировать</div>
               <div onClick={handleDelete}>Удалить</div>
            </div>
         )}
      </div>
   );
};
