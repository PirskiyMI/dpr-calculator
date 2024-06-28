import { TThrow, ISpecialProperties } from 'entities/attack';

export interface IAttackDetails {
   type: TThrow;
   criticalHitValues: '20' | '19-20';
   attackBonus: number;
   defendBonus: number;
   averageDamage: number;
   modifiers: ISpecialProperties;
}
