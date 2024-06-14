import { FC, useCallback, useEffect, useState } from 'react';

import { MyButton } from 'shared/ui/controls/my-button';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { damageActions, getThrowListLength, throwListActions } from 'entities/throw';
import { attackParamsActions, attackTypeActions, specialPropertiesActions } from 'entities/attack';

import styles from './ActionMenu.module.scss';

interface IProps {
   id: string;
}

export const ThrowActionsMenu: FC<IProps> = ({ id }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const toggleIsOpen = (isOpen: boolean) => () => {
      return setIsOpen(isOpen);
   };

   return (
      <div className={styles.menu}>
         <MyButton
            uiType="secondary"
            onClick={toggleIsOpen(!isOpen)}
            onMouseDown={(e) => e.stopPropagation()}
            className={styles.menu__button}>
            <span className={styles.menu__dot}>.</span>
         </MyButton>
         {isOpen && <ActionBody id={id} closeDropdown={toggleIsOpen(false)} />}
      </div>
   );
};

interface IActionBodyProps extends IProps {
   closeDropdown: () => void;
}

const ActionBody: FC<IActionBodyProps> = ({ id, closeDropdown }) => {
   const throwListLength = useAppSelector(getThrowListLength);
   const { removeAttackParams, copyAttackParams } = attackParamsActions;
   const { removeThrowType, copyThrowType } = attackTypeActions;
   const { removeThrow, copyThrow } = damageActions;
   const { removeSpecialProperties, copySpecialProperties } = specialPropertiesActions;
   const { removeThrow: deleteThrow, addThrow } = throwListActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      document.addEventListener('mousedown', closeDropdown);
      return () => document.removeEventListener('mousedown', closeDropdown);
   }, [closeDropdown]);

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

      closeDropdown();
   }, [id]);

   return (
      <div onMouseDown={(e) => e.stopPropagation()} className={styles.menu__dropdown}>
         <button onClick={handleCopy} disabled={throwListLength >= 6}>
            Копировать
         </button>
         <button onClick={handleDelete} disabled={throwListLength <= 1}>
            Удалить
         </button>
      </div>
   );
};
