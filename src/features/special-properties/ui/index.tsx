import { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { specialPropertiesActions } from '..';
import { specialPropertiesSelector } from '../model/selectors';
import { Checkbox } from 'src/shared/ui/controls/checkbox';

export const SpecialProperties: FC = () => {
   const { setHasElvenAccuracy, setHasShield, setHasWeaponFeats } = specialPropertiesActions;
   const { shield, elvenAccuracy, weaponFeats } = useAppSelector(specialPropertiesSelector);
   const dispatch = useAppDispatch();

   const setShield = useCallback(() => {
      dispatch(setHasShield(!shield));
   }, [dispatch, setHasShield, shield]);
   const setElvenAccuracy = useCallback(() => {
      dispatch(setHasElvenAccuracy(!elvenAccuracy));
   }, [dispatch, elvenAccuracy, setHasElvenAccuracy]);
   const setWeaponFeats = useCallback(() => {
      dispatch(setHasWeaponFeats(!weaponFeats));
   }, [dispatch, setHasWeaponFeats, weaponFeats]);

   return (
      <div className={styles.properties}>
         <ul className={styles.properties__list}>
            <li className={styles.properties__item}>
               <Checkbox checked={shield} onChange={setShield} label={'Щит у цели'}/>
            </li>
            <li className={styles.properties__item}>
               <Checkbox checked={elvenAccuracy} onChange={setElvenAccuracy} label={'Эльфийская точность'}/>
            </li>
            <li className={styles.properties__item}>
               <Checkbox checked={weaponFeats} onChange={setWeaponFeats} label={'Мастер большого оружия / Меткий стрелок'}/>
            </li>
         </ul>
      </div>
   );
};
