import { Route, Routes } from 'react-router-dom';

import { CalculatorPage } from 'pages/calculator-page';
import { TechnicalCalculatorPage } from 'pages/technical-calculator-page';

export const AppRouter = () => {
   return (
      <Routes>
         <Route path="/dpr-calculator/" element={<CalculatorPage />} />
         <Route path="/dpr-calculator/technical" element={<TechnicalCalculatorPage />} />
      </Routes>
   );
};