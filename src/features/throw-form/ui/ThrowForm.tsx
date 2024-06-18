import { FC, memo, useEffect, useState } from 'react';

import { MyButton } from 'shared/ui/controls/my-button';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { Throw } from 'entities/throw';
import {
   getAttackParamsSelector,
   getSpecialPropertiesSelector,
   getThrowTypeSelector,
   specialPropertiesActions,
} from 'entities/attack';
import { getDamageSelector, getIsDamageFitActive } from 'entities/damage';
import { DetailedThrow, IDetailedThrowCalculations } from 'entities/detailed-throw';

import { getAttackDetails, getExtendedAttackDetails } from '../lib/helpers/get-attack-details';

import styles from './ThrowForm.module.scss';

//TODO убрать импорты из этого слоя
import { ChangeCover } from 'features/change-cover';
import { ActionMenu } from 'features/action-menu';
import { DamageForm } from 'features/damage-form';
import { AddDamageDice } from 'features/add-damage-dice';
import { AttackModifiers } from 'features/attack-modifiers';
import { ThrowFields } from 'features/throw-fields';
import { ThrowTypeSelector } from 'features/throw-type-selector';
import { IAttackIndicators } from '../lib/types';

interface IProps {
   isExtendedForm?: boolean;
   id: string;
}

export const ThrowForm: FC<IProps> = memo(({ id, isExtendedForm = false }) => {
   const damage = useAppSelector((state) => getDamageSelector(state, id));
   const modifiers = useAppSelector((state) => getSpecialPropertiesSelector(state, id));
   const { attackBonus, targetProtection } = useAppSelector((state) =>
      getAttackParamsSelector(state, id),
   );
   const { setSpecialProperty } = specialPropertiesActions;
   const attackType = useAppSelector((state) => getThrowTypeSelector(state, id));
   const isDamageFit = useAppSelector((state) => getIsDamageFitActive(state, id));
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setSpecialProperty({ id, property: 'hasWeaponFeats' }));
   }, [dispatch, id, isDamageFit, setSpecialProperty]);

   const [attackIndicators, setAttackIndicators] = useState<IAttackIndicators>({
      probabilityOfMiss: 0,
      probabilityOfHit: 0,
      probabilityOfCriticalHit: 0,
      damagePerRound: 0,
   });

   const [calculations, setCalculations] = useState<IDetailedThrowCalculations[]>([]);

   const handleCalculation = () => {
      const indicators = getAttackDetails({
         type: attackType,
         attackBonus: attackBonus,
         defendBonus: targetProtection,
         averageDamage: damage,
         criticalHitValues: modifiers.extendedCritChance ? '19-20' : '20',
         modifiers,
      });
      setAttackIndicators(indicators);
   };

   const handleExtendedCalculation = () => {
      const indicators = getExtendedAttackDetails({
         type: attackType,
         attackBonus: attackBonus,
         hasElvenAccuracy: modifiers.hasElvenAccuracy,
         criticalHitValues: modifiers.extendedCritChance ? '19-20' : '20',
         averageDamage: damage,
      });
      setCalculations(indicators);
   };

   const calculationButton = (
      <MyButton type="submit" onClick={handleCalculation} className={styles.form__button}>
         Посчитать
      </MyButton>
   );

   const extendedCalculationButton = (
      <MyButton type="submit" onClick={handleExtendedCalculation}>
         Посчитать расширенные значения
      </MyButton>
   );

   return (
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
         {isExtendedForm ? (
            <DetailedThrow fields={extendedCalculationButton} calculations={calculations} />
         ) : (
            <Throw
               actionMenu={<ActionMenu id={id} />}
               controls={{
                  calculationButton,
                  checkboxes: <AttackModifiers id={id} />,
                  damageFields: (
                     <>
                        <AddDamageDice id={id} />
                        <DamageForm id={id} />
                     </>
                  ),
                  throwFields: <ThrowFields id={id} />,
                  throwSelect: <ThrowTypeSelector id={id} />,
                  coverSelect: <ChangeCover id={id} />,
               }}
               calculations={attackIndicators}
            />
         )}
         {/*          <Throw
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
         /> */}
      </form>
   );
});
