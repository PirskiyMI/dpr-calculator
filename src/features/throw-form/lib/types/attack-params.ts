import { ISpecialProperties } from "./special-properties";

export interface IAttackParams {
   minValueToHit: number;
   minCriticalHitValue: number;
   hasElvenAccuracy?: ISpecialProperties['hasElvenAccuracy'];
}
