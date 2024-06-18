import { IAttackParams } from "../types/attack-params";
import { IAttackProbability } from "../types/attack-probability";

export const getDefaultAttackProbability = ({
   minValueToHit,
   minCriticalHitValue,
}: IAttackParams): IAttackProbability => {
   const probabilityOfCriticalHit = (21 - minCriticalHitValue) / 20;
   const probabilityOfMiss =
      minValueToHit > 2 ? (minValueToHit - (21 - minCriticalHitValue)) / 20 : 1 / 20;
   const probabilityOfHit = 1 - probabilityOfCriticalHit - probabilityOfMiss;

   return { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit };
};

export const getAttackProbabilityWithAdvantage = ({
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

export const getAttackProbabilityWithDisadvantage = ({
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
