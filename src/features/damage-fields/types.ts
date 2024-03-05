export type TDiceType = 'D4' | 'D6' | 'D8' | 'D10' | 'D12';
export type TDiceName = 'd4' | 'd6' | 'd8' | 'd10' | 'd12';
export type TDiceValue = '2.5' | '3.5' | '4.5' | '5.5' | '6.5';
export type TDamageEfficiency = 'immunity' | 'resistance' | 'default' | 'vulnerability';
export type TDamageType =
   | 'acid'
   | 'poison'
   | 'cold'
   | 'fire'
   | 'lightning'
   | 'thunder'
   | 'psychic'
   | 'radiant'
   | 'necrotic'
   | 'force'
   | 'slashing'
   | 'piercing'
   | 'bludgeoning';

export interface IDice {
   id: string;
   name: TDiceName;
   value: TDiceValue;
   count: number;
   damageType: TDamageType;
   damageEfficiency: TDamageEfficiency;
}
