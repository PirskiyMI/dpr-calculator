export const getAttackModifierSum = (value: string) => {
   const modifierList = value.split('+');
   let sum = 0;

   for (const el of modifierList) {
      const list = el.split('-');
      list.length === 1
         ? (sum += +list[0])
         : (sum += list.reduce((acc, el) => (acc -= +el), +list[0] * 2));
   }

   return sum;
};
