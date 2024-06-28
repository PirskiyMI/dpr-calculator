import { Cover } from 'entities/attack';

export interface ISpecialProperties {
   hasElvenAccuracy: boolean;
   hasShield: boolean;
   hasWeaponFeats: boolean;
   extendedCritChance: boolean;
   cover: Cover;
}
