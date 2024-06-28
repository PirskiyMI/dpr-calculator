import { ChangeEvent } from "react";

export interface IChangeActions {
   onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onDamageModifierChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageEfficiencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onHasFitChange: (id: string) => void;
}
