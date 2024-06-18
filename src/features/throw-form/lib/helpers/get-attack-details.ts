import { IAttackDetails } from '../types/attack-details';
import { IAttackParams } from '../types/attack-params';
import {
   getAttackProbabilityWithAdvantage,
   getAttackProbabilityWithDisadvantage,
   getDefaultAttackProbability,
} from './get-attack-probability';

export const getAttackDetails = ({
   type,
   attackBonus,
   defendBonus,
   criticalHitValues,
   averageDamage,
   modifiers,
}: IAttackDetails) => {
   const minCriticalHitValue = criticalHitValues === '19-20' ? 19 : 20;
   let minValueToHit = defendBonus - attackBonus;

   if (modifiers.hasWeaponFeats) minValueToHit += 5;
   if (modifiers.hasShield) minValueToHit += 5;

   minValueToHit =
      modifiers.cover === 'absent'
         ? minValueToHit
         : modifiers.cover === 'half'
         ? minValueToHit + 2
         : minValueToHit + 5;
   minValueToHit =
      minValueToHit < minCriticalHitValue ? (minValueToHit > 2 ? minValueToHit : 2) : 20;

   const attackParams: IAttackParams = { minValueToHit, minCriticalHitValue };

   const { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit } =
      type === 'advantage'
         ? getAttackProbabilityWithAdvantage({
              ...attackParams,
              hasElvenAccuracy: modifiers.hasElvenAccuracy,
           })
         : type === 'disadvantage'
         ? getAttackProbabilityWithDisadvantage(attackParams)
         : getDefaultAttackProbability(attackParams);

   const damagePerRound =
      averageDamage * probabilityOfHit + averageDamage * probabilityOfCriticalHit * 2;

   return { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound };
};

interface IExtendedAttackDetails extends Omit<IAttackDetails, 'defendBonus' | 'modifiers'> {
   hasElvenAccuracy: boolean;
}

export const getExtendedAttackDetails = ({
   attackBonus,
   averageDamage,
   criticalHitValues,
   type,
   hasElvenAccuracy,
}: IExtendedAttackDetails) => {
   const minCriticalHitValue = criticalHitValues === '19-20' ? 19 : 20;
   const res = [];

   for (let armorClass = 8; armorClass <= 30; armorClass++) {
      let minValueToHit = armorClass - attackBonus;
      minValueToHit =
         minValueToHit < minCriticalHitValue ? (minValueToHit > 2 ? minValueToHit : 2) : 20;

      const attackParams: IAttackParams = { minCriticalHitValue, minValueToHit };

      const probabilities =
         type === 'advantage'
            ? getAttackProbabilityWithAdvantage({
                 ...attackParams,
                 hasElvenAccuracy,
              })
            : type === 'disadvantage'
            ? getAttackProbabilityWithDisadvantage(attackParams)
            : getDefaultAttackProbability(attackParams);

      const damagePerRound =
         averageDamage * probabilities.probabilityOfHit +
         averageDamage * probabilities.probabilityOfCriticalHit * 2;

      res.push({ ...probabilities, damagePerRound, armorClass });
   }

   return res;
};
