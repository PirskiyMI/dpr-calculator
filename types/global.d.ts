declare module '*.module.scss';

declare global {
   type RootState = import('./../src/app/store').RootState;
   type AppDispatch = import('./../src/app/store').AppDispatch;
}

export {};
