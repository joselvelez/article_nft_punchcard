import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./Main";
import { About } from "./About";
import { Content } from "./Content";
import { Article } from "./Article";
import { PunchcardMint } from "./PunchcardMint";
import WalletProvider from "../context/WalletProvider";
import { PunchcardRefill } from "./PunchcardRefill";
import { InstallMetaMask } from "./InstallMetaMask";

function App() {

  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Content />} />
            <Route path="about" element={<About />} />
            <Route path="mint" element={<PunchcardMint />} />
            <Route path="refill" element={<PunchcardRefill />} />
            <Route path="install-wallet" element={<InstallMetaMask />} />
            <Route path="article/:articleId" element={<Article />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
