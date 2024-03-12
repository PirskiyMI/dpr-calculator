import { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';

import { IOption, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Checkbox } from 'src/shared/ui/controls/checkbox';
import { Dropdown } from 'src/shared/ui/controls/dropdown';

import styles from './styles.module.scss';
import { specialPropertiesActions } from '../../model/reducers/special-properties';
import { getSpecialPropertiesSelector } from '../../model/selectors/special-properties';
import { Cover, CoverOnRu } from '../../constants/cover-consts';

interface IProps {
   id: string;
}

export const SpecialProperties: FC<IProps> = memo(({ id }) => {
   const { setSpecialProperties, setCover } = specialPropertiesActions;
   const { hasElvenAccuracy, hasShield, hasWeaponFeats, cover } = useAppSelector((state) =>
      getSpecialPropertiesSelector(state, id),
   );
   const dispatch = useAppDispatch();

   const coverOptions = useMemo(() => {
      const options: IOption[] = [];
      for (const key in Cover) {
         options.push({ title: CoverOnRu[key as keyof typeof CoverOnRu], value: key });
      }
      return options;
   }, []);

   const setShield = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasShield: !hasShield } }));
   }, [dispatch, setSpecialProperties, id, hasShield]);
   const setElvenAccuracy = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasElvenAccuracy: !hasElvenAccuracy } }));
   }, [dispatch, setSpecialProperties, id, hasElvenAccuracy]);
   const setWeaponFeats = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasWeaponFeats: !hasWeaponFeats } }));
   }, [dispatch, setSpecialProperties, id, hasWeaponFeats]);

   const onCoverChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const cover = e.target.value as keyof typeof Cover;
         dispatch(setCover({ id, cover }));
      },
      [dispatch, id, setCover],
   );

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
