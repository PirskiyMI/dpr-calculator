import { IAttackProbability } from './attack-probability';

export interface IAttackIndicators extends IAttackProbability {
   damagePerRound: number;
}
