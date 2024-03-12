import { FC, useEffect, useState } from 'react';

import { Button } from 'src/shared/ui/button';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';

import { IAttackIndicators, getAttackDetails } from '../lib/helpers/get-attack-details';
import { getThrowTypeSelector } from '../model/selectors/attack-type-select';
import { getDamageSelector, getIsDamageFitActive } from '../model/selectors/damage-fields';
import { getSpecialPropertiesSelector } from '../model/selectors/special-properties';
import { getAttackParamsSelector } from '../model/selectors/attack-fields';
import { specialPropertiesActions } from '../model/reducers/special-properties';

import styles from './styles.module.scss';

import { AttackFields } from './attack-fields';
import { AttackTypeSelect } from './attack-type-select';
import { SpecialProperties } from './special-properties';
import { DamageFields } from './damage-fields';

interface IProps {
   id: string;
}

export const ThrowForm: FC<IProps> = ({ id }) => {
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

   const { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound } =
      attackIndicators;

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

   return (
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
         <div className={styles.form__controls}>
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
               }}>
               <AttackFields id={id} />
               <SpecialProperties id={id} />
            </div>

            <AttackTypeSelect id={id} />

            <DamageFields id={id} />
         </div>
         
         <div className={styles.form__output}>
            <div className={styles.form__wrapper}>
               <Button
                  type="primary"
                  shape="round"
                  onClick={handleCalculation}
                  className={styles.form__button}>
                  Результат
               </Button>
               <ul className={styles.form__list}>
                  <li>Промах: {(probabilityOfMiss * 100).toFixed(2)}%</li>
                  <li>Попадание: {(probabilityOfHit * 100).toFixed(2)}%</li>
                  <li>Критическое попадание: {(probabilityOfCriticalHit * 100).toFixed(2)}%</li>
                  <li>Средний урон: {damagePerRound.toFixed(2)}</li>
               </ul>
            </div>
         </div>
      </form>
   );
};
