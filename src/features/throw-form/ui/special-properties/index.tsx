import { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';

import { IOption, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Checkbox } from 'src/shared/ui/controls/checkbox';
import { Dropdown } from 'src/shared/ui/controls/dropdown';

import styles from './styles.module.scss';
import {
   specialPropertiesActions,
   getSpecialPropertiesSelector,
   Cover,
   CoverOnRu,
} from 'src/entities/throw';

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
   }, [id, hasShield]);
   const setElvenAccuracy = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasElvenAccuracy: !hasElvenAccuracy } }));
   }, [id, hasElvenAccuracy]);
   const setWeaponFeats = useCallback(() => {
      dispatch(setSpecialProperties({ id, params: { hasWeaponFeats: !hasWeaponFeats } }));
   }, [id, hasWeaponFeats]);

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
               <Checkbox name={id} checked={hasShield} onChange={setShield} label={'Щит у цели'} />
            </li>
            <li className={styles.properties__item}>
               <Checkbox
                  name={id}
                  checked={hasElvenAccuracy}
                  onChange={setElvenAccuracy}
                  label={'Эльфийская точность'}
               />
            </li>
            <li className={styles.properties__item}>
               <Checkbox
                  name={id}
                  checked={hasWeaponFeats}
                  onChange={setWeaponFeats}
                  disabled
                  label={'Мастер большого оружия / Меткий стрелок'}
               />
            </li>
            <li className={styles.properties__item}>
               Укрытие:
               <Dropdown
                  name={id}
                  defaultValue={cover.toUpperCase()}
                  options={coverOptions}
                  onChange={onCoverChange}
               />
            </li>
         </ul>
      </div>
   );
});
