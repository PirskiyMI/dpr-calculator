import { AttackBonus } from 'entities/throw';

const getAverageBonus = (dice: string) => {
   const count = dice[0];
   const side = dice.slice(1).toUpperCase();
   return +count * AttackBonus[side as keyof typeof AttackBonus];
};

export const getAttackBonusSum = (value: string) => {
   const bonusList = value.split('+');
   let sum = 0;

   for (const bonus of bonusList) {
      const list = bonus.split('-');
      if (list.length === 1) {
         sum += getAverageBonus(list[0]);
      } else {
         let res = 0;
         list.forEach((el, index) => {
            index === 0 ? (res += getAverageBonus(el)) : (res -= getAverageBonus(el));
         });
         sum += res;
      }
   }
   return sum;
};
