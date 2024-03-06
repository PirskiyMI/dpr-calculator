import { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { IOption, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { specialPropertiesActions } from '..';
import { specialPropertiesSelector } from '../model/selectors';
import { Checkbox } from 'src/shared/ui/controls/checkbox';
import { Dropdown } from 'src/shared/ui/controls/dropdown';
import { Cover, CoverOnRu } from '../types';

export const SpecialProperties: FC = memo(() => {
   const { setHasElvenAccuracy, setHasShield, setHasWeaponFeats, setCover } =
      specialPropertiesActions;
   const { hasElvenAccuracy, hasShield, hasWeaponFeats, cover } =
      useAppSelector(specialPropertiesSelector);
   const dispatch = useAppDispatch();

   const coverOptions = useMemo(() => {
      const options: IOption[] = [];
      for (const key in Cover) {
         options.push({ title: CoverOnRu[key as keyof typeof CoverOnRu], value: key });
      }
      return options;
   }, []);

   const setShield = useCallback(() => {
      dispatch(setHasShield(!hasShield));
   }, [dispatch, setHasShield, hasShield]);
   const setElvenAccuracy = useCallback(() => {
      dispatch(setHasElvenAccuracy(!hasElvenAccuracy));
   }, [dispatch, hasElvenAccuracy, setHasElvenAccuracy]);
   const setWeaponFeats = useCallback(() => {
      dispatch(setHasWeaponFeats(!hasWeaponFeats));
   }, [dispatch, setHasWeaponFeats, hasWeaponFeats]);

   const onCoverChange = (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setCover(e.target.value as keyof typeof Cover));
   };

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
                  disabled
                  label={'Мастер большого оружия / Меткий стрелок'}
               />
            </li>
            <li className={styles.properties__item}>
               Укрытие:
               <Dropdown
                  defaultValue={cover.toUpperCase()}
                  options={coverOptions}
                  onChange={onCoverChange}
               />
            </li>
         </ul>
      </div>
   );
});
