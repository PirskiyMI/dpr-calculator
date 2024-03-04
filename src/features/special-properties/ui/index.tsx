import { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { specialPropertiesActions } from '..';
import { specialPropertiesSelector } from '../model/selectors';
import { Checkbox } from 'src/shared/ui/controls/checkbox';

export const SpecialProperties: FC = () => {
   const { setHasElvenAccuracy, setHasShield, setHasWeaponFeats } = specialPropertiesActions;
   const { hasElvenAccuracy, hasShield, hasWeaponFeats } =
      useAppSelector(specialPropertiesSelector);
   const dispatch = useAppDispatch();

   const setShield = useCallback(() => {
      dispatch(setHasShield(!hasShield));
   }, [dispatch, setHasShield, hasShield]);
   const setElvenAccuracy = useCallback(() => {
      dispatch(setHasElvenAccuracy(!hasElvenAccuracy));
   }, [dispatch, hasElvenAccuracy, setHasElvenAccuracy]);
   const setWeaponFeats = useCallback(() => {
      dispatch(setHasWeaponFeats(!hasWeaponFeats));
   }, [dispatch, setHasWeaponFeats, hasWeaponFeats]);

   return (
      <div className={styles.properties}>
         <ul className={styles.properties__list}>
            <li className={styles.properties__item}>
               <Checkbox checked={hasShield} onChange={setShield} label={'Щит у цели'} />
            </li>
            <li className={styles.properties__item}>
               <Checkbox
                  checked={hasElvenAccuracy}
                  onChange={setElvenAccuracy}
                  label={'Эльфийская точность'}
               />
            </li>
            <li className={styles.properties__item}>
               <Checkbox
                  checked={hasWeaponFeats}
                  onChange={setWeaponFeats}
                  label={'Мастер большого оружия / Меткий стрелок'}
               />
            </li>
         </ul>
      </div>
   );
};
