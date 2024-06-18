import { throwType } from "entities/attack";

import { ISpecialProperties } from "./special-properties";

export interface IAttackDetails {
   type: throwType;
   criticalHitValues: '20' | '19-20';
   attackBonus: number;
   defendBonus: number;
   averageDamage: number;
   modifiers: ISpecialProperties;
}
