import { FC, memo, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib';
import { MyCheckbox } from 'shared/ui/controls/my-checkbox';
import {
   TSpecialProperty,
   getSpecialPropertiesSelector,
   specialPropertiesActions,
} from 'entities/attack';

import styles from './AttackModifiers.module.scss';

interface IProps {
   id: string;
}

export const AttackModifiers: FC<IProps> = memo(({ id }) => {
   const { setSpecialProperty } = specialPropertiesActions;
   const { hasElvenAccuracy, hasShield, hasWeaponFeats, extendedCritChance } = useAppSelector(
      (state) => getSpecialPropertiesSelector(state, id),
   );
   const dispatch = useAppDispatch();

   const setProperty = useCallback(
      (property: TSpecialProperty) => () => dispatch(setSpecialProperty({ id, property })),
      [dispatch, id, setSpecialProperty],
   );

   return (
      <div className={styles.properties}>
         <ul className={styles.properties__list}>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={hasShield}
                  onChange={setProperty('hasShield')}
                  label={'Щит у цели'}
               />
            </li>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={hasElvenAccuracy}
                  onChange={setProperty('hasElvenAccuracy')}
                  label={'Эльфийская точность'}
               />
            </li>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={extendedCritChance}
                  onChange={setProperty('extendedCritChance')}
                  label={'Увиличенный шанс крит. попадания'}
               />
            </li>
            <li className={styles.properties__item}>
               <MyCheckbox
                  name={id}
                  checked={hasWeaponFeats}
                  onChange={setProperty('hasWeaponFeats')}
                  disabled
                  label={'Мастер большого оружия / Меткий стрелок'}
               />
            </li>
         </ul>
      </div>
   );
});
