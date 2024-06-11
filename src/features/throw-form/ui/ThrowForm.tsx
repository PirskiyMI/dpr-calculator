import { FC, memo, useEffect, useState } from 'react';

import { MyButton } from 'src/shared/ui/controls/my-button';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import {
   getThrowTypeSelector,
   getDamageSelector,
   getIsDamageFitActive,
   getSpecialPropertiesSelector,
   getAttackParamsSelector,
   specialPropertiesActions,
} from 'src/entities/throw';
import { Throw } from 'src/entities/throw/ui/Throw';

import { IAttackIndicators, getAttackDetails } from '../lib/helpers/get-attack-details';
import { ThrowActionsMenu } from './action-menu/ActionMenu';
import { CoverSelector } from './cover-selector/CoverSelect';
import { DamageFields } from './damage-fields';
import { SpecialPropertiesCheckboxes } from './special-properties/SpecialPropertiesCheckboxes';
import { ThrowFields } from './throw-fields/ThrowFields';
import { ThrowSelector } from './ThrowSelector';

import styles from './ThrowForm.module.scss';

interface IProps {
   id: string;
}

export const ThrowForm: FC<IProps> = memo(({ id }) => {
   const damage = useAppSelector((state) => getDamageSelector(state, id));
   const modifiers = useAppSelector((state) => getSpecialPropertiesSelector(state, id));
   const { attackBonus, targetProtection } = useAppSelector((state) =>
      getAttackParamsSelector(state, id),
   );
   const { setSpecialProperties } = specialPropertiesActions;
   const attackType = useAppSelector((state) => getThrowTypeSelector(state, id));
   const isDamageFit = useAppSelector((state) => getIsDamageFitActive(state, id));
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setSpecialProperties({ id, params: { hasWeaponFeats: isDamageFit } }));
   }, [dispatch, id, isDamageFit, setSpecialProperties]);

   const [attackIndicators, setAttackIndicators] = useState<IAttackIndicators>({
      probabilityOfMiss: 0,
      probabilityOfHit: 0,
      probabilityOfCriticalHit: 0,
      damagePerRound: 0,
   });

   const handleCalculation = () => {
      const indicators = getAttackDetails({
         type: attackType,
         attackBonus: attackBonus,
         defendBonus: targetProtection,
         averageDamage: damage,
         criticalHitValues: '20',
         modifiers,
      });
      setAttackIndicators(indicators);
   };

   const calculationButton = (
      <MyButton type="submit" onClick={handleCalculation} className={styles.form__button}>
         Посчитать
      </MyButton>
   );

   return (
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
         <Throw
            actionMenu={<ThrowActionsMenu id={id} />}
            controls={{
               calculationButton,
               checkboxes: <SpecialPropertiesCheckboxes id={id} />,
               damageFields: <DamageFields id={id} />,
               throwFields: <ThrowFields id={id} />,
               throwSelect: <ThrowSelector id={id} />,
               coverSelect: <CoverSelector id={id} />,
            }}
            params={attackIndicators}
         />
      </form>
   );
});
