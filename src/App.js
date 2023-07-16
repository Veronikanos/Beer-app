import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import RecipesList from './components/RecipesList';
import { RecipeDetails } from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipesList />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
