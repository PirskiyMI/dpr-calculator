import { ISpecialProperties } from 'entities/attack';

export interface IAttackParams {
   minValueToHit: number;
   minCriticalHitValue: number;
   hasElvenAccuracy?: ISpecialProperties['hasElvenAccuracy'];
}
