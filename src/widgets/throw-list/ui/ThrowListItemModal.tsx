import { FC } from 'react';

import { IPropsId, useAppSelector } from 'shared/lib';
import {
   DamageEfficiency,
   DamageEfficiencyOnRu,
   DamageType,
   DamageTypeOnRu,
   DiceName,
   getDicesSelector,
} from 'entities/damage';
import { DamageForm } from 'features/damage-form';

import { getOptionList } from '../lib/helpers/getOptionList';
import styles from './ThrowListItemModal.module.scss';

export const ThrowListItemModal: FC<IPropsId> = ({ id }) => {
   const fieldList = useAppSelector((state) => getDicesSelector(state, id));

   const options = {
      typeOptions: getOptionList(DiceName, DiceName),
      damageTypeOptions: getOptionList(DamageType, DamageTypeOnRu),
      damageEfficiencyOptions: getOptionList(DamageEfficiency, DamageEfficiencyOnRu),
   };

   return (
      <div className={styles.damageForm}>
         <ul className={styles.damageForm__list}>
            {fieldList.map((el) => (
               <li key={el.id} className={styles.damageForm__item}>
                  <DamageForm dice={el} parentId={id} {...options} />
               </li>
            ))}
         </ul>
      </div>
   );
};
