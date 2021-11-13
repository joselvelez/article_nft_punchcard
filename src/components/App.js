import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./Main";
import { About } from "./About";
import { Content } from "./Content";
import { Article } from "./Article";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Content />} />
            <Route path="about" element={<About />} />
            <Route path="article/:articleId" element={<Article />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
