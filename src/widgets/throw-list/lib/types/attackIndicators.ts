import { IAttackProbability } from './attackProbability';

export interface IAttackIndicators extends IAttackProbability {
   damagePerRound: number;
}
