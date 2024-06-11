import { FC, memo, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib';
import { MyCheckbox } from 'shared/ui/controls/my-checkbox';
import { specialPropertiesActions, getSpecialPropertiesSelector } from 'entities/throw';

import styles from './SpecialPropertiesCheckboxes.module.scss';

interface IProps {
   id: string;
}

export const SpecialPropertiesCheckboxes: FC<IProps> = memo(({ id }) => {
   const { setSpecialProperties } = specialPropertiesActions;
   const { hasElvenAccuracy, hasShield, hasWeaponFeats } = useAppSelector((state) =>
      getSpecialPropertiesSelector(state, id),
   );
   const dispatch = useAppDispatch();

   const setShield = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasShield: !hasShield } }));
   }, [id, hasShield]);
   const setElvenAccuracy = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasElvenAccuracy: !hasElvenAccuracy } }));
   }, [id, hasElvenAccuracy]);
   const setWeaponFeats = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasWeaponFeats: !hasWeaponFeats } }));
   }, [id, hasWeaponFeats]);

   return (
      <div className={styles.properties}>
         <ul className={styles.properties__list}>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={hasShield}
                  onChange={setShield}
                  label={'Щит у цели'}
               />
            </li>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={hasElvenAccuracy}
                  onChange={setElvenAccuracy}
                  label={'Эльфийская точность'}
               />
            </li>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={hasWeaponFeats}
                  onChange={setWeaponFeats}
                  disabled
                  label={'Мастер большого оружия / Меткий стрелок'}
               />
            </li>
         </ul>
      </div>
   );
});
