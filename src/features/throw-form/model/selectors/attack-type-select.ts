export const attackTypeSelector = (state: RootState) => state.attackTypeReducer;

export const getThrowTypeSelector = (state: RootState, id: string) => state.attackTypeReducer[id];
