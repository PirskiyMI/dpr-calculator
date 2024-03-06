import { throwType } from 'src/features/attack-type-select';

interface ISpecialProperties {
   hasElvenAccuracy: boolean;
   hasShield: boolean;
   hasWeaponFeats: boolean;
}
interface IAttackDetails {
   type: throwType;
   criticalHitValues: '20' | '19-20';
   attackBonus: number;
   defendBonus: number;
   averageDamage: number;
   modifiers: ISpecialProperties;
}
interface IAttackParams {
   minValueToHit: number;
   minCriticalHitValue: number;
   hasElvenAccuracy?: ISpecialProperties['hasElvenAccuracy'];
}
interface IAttackProbability {
   probabilityOfMiss: number;
   probabilityOfHit: number;
   probabilityOfCriticalHit: number;
}
export interface IAttackIndicators extends IAttackProbability {
   damagePerRound: number;
}
const getDefaultAttackProbability = ({
   minValueToHit,
   minCriticalHitValue,
}: IAttackParams): IAttackProbability => {
   const probabilityOfCriticalHit = (21 - minCriticalHitValue) / 20;
   const probabilityOfMiss =
      minValueToHit > 2 ? (minValueToHit - (21 - minCriticalHitValue)) / 20 : 1 / 20;
   const probabilityOfHit = 1 - probabilityOfCriticalHit - probabilityOfMiss;

   return { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit };
};
const getAttackProbabilityWithAdvantage = ({
   minValueToHit,
   minCriticalHitValue,
   hasElvenAccuracy,
}: IAttackParams): IAttackProbability => {
   if (hasElvenAccuracy) {
      const probabilityOfCriticalHit = minCriticalHitValue === 20 ? 1141 / 8000 : (1141 / 8000) * 2;
      const probabilityOfMiss =
         minValueToHit === 2
            ? 1 / 8000
            : minValueToHit === minCriticalHitValue
            ? 1 - probabilityOfCriticalHit
            : Math.pow(Math.abs((minValueToHit - (21 - minCriticalHitValue)) / 20), 3);
      const probabilityOfHit = 1 - probabilityOfCriticalHit - probabilityOfMiss;

      return { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit };
   }
   const probabilityOfCriticalHit = minCriticalHitValue === 20 ? 39 / 400 : (39 / 400) * 2;
   const probabilityOfMiss =
      minValueToHit === 2
         ? 1 / 400
         : minValueToHit === minCriticalHitValue
         ? 1 - probabilityOfCriticalHit
         : Math.pow(Math.abs((minValueToHit - (21 - minCriticalHitValue)) / 20), 2);
   const probabilityOfHit = 1 - probabilityOfCriticalHit - probabilityOfMiss;

   return { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit };
};
const getAttackProbabilityWithDisadvantage = ({
   minValueToHit,
   minCriticalHitValue,
}: IAttackParams): IAttackProbability => {
   const probabilityOfCriticalHit = minCriticalHitValue === 20 ? 1 / 400 : (1 / 400) * 2;

   console.log(1 - Math.pow(21 - minValueToHit, 2) / 400);

   const probabilityOfMiss =
      minValueToHit === 2
         ? 39 / 400
         : minValueToHit === minCriticalHitValue
         ? 1 - probabilityOfCriticalHit
         : 1 - Math.pow(21 - minValueToHit, 2) / 400;

   const probabilityOfHit =
      minValueToHit === probabilityOfCriticalHit
         ? 0
         : 1 - probabilityOfCriticalHit - probabilityOfMiss;

   return { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit };
};

export const getAttackDetails = ({
   type,
   attackBonus,
   defendBonus,
   criticalHitValues,
   averageDamage,
   modifiers,
}: IAttackDetails) => {
   const minCriticalHitValue = criticalHitValues === '19-20' ? 19 : 20;
   let minValueToHit = modifiers.hasWeaponFeats
      ? defendBonus - attackBonus + 5
      : defendBonus - attackBonus;
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
