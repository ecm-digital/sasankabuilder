import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Estimator } from './pages/Estimator';
import { Scheduler } from './pages/Scheduler';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { ConstructionHelper } from './pages/ConstructionHelper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="estimator" element={<Estimator />} />
          <Route path="scheduler" element={<Scheduler />} />
          <Route path="helper" element={<ConstructionHelper />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
