import { FC, useCallback, useEffect } from 'react';

import { IPropsId, useAppDispatch, useAppSelector } from 'shared/lib';
import { attackParamsActions, attackTypeActions, specialPropertiesActions } from 'entities/attack';
import { damageActions } from 'entities/damage';
import { getThrowListLength, throwListActions } from 'entities/throw';

import styles from './ActionMenuBody.module.scss';

interface IProps extends IPropsId {
   closeDropdown: () => void;
}

export const ActionMenuBody: FC<IProps> = ({ id, closeDropdown }) => {
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
      <div onMouseDown={(e) => e.stopPropagation()} className={styles.actionMenuBody}>
         <button
            onClick={handleCopy}
            disabled={throwListLength >= 6}
            className={styles.actionMenuBody__button}>
            Копировать
         </button>
         <button
            onClick={handleDelete}
            disabled={throwListLength <= 1}
            className={styles.actionMenuBody__button}>
            Удалить
         </button>
      </div>
   );
};
