import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/home-page';
import { AppWrapper } from 'components/app-wrapper';

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<AppWrapper />}>
      <Route index element={<HomePage />} />
    </Route>
  </Routes>
);
