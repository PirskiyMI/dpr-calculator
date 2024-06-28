import { FC, FormEvent, memo, useEffect, useState } from 'react';

import { MyButton } from 'shared/ui/controls/my-button';
import { IPropsId, useAppDispatch, useAppSelector } from 'shared/lib';
import { Throw } from 'entities/throw';
import {
   getAttackParamsSelector,
   getSpecialPropertiesSelector,
   getThrowTypeSelector,
   specialPropertiesActions,
} from 'entities/attack';
import { getDamageSelector, getIsDamageFitActive } from 'entities/damage';
import { ChangeCover } from 'features/change-cover';
import { ActionMenu } from 'features/action-menu';
import { DamageForm } from 'features/damage-form';
import { AddDamageDice } from 'features/add-damage-dice';
import { AttackModifiers } from 'features/attack-modifiers';
import { ThrowFields } from 'features/throw-fields';
import { ThrowTypeSelector } from 'features/throw-type-selector';

import { IAttackIndicators } from '../lib/types/attackIndicators';
import { getAttackDetails } from '../lib/helpers/getAttackDetails';
import styles from './ThrowListItem.module.scss';

export const ThrowListItem: FC<IPropsId> = memo(({ id }) => {
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

   const calculationButton = (
      <MyButton type="submit" onClick={handleCalculation} className={styles.item__button}>
         Посчитать
      </MyButton>
   );

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

   return (
      <form onSubmit={handleSubmit} className={styles.item}>
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
      </form>
   );
});
