import "./App.scss";
import AppLayout from "./layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="movies">
            <Route index element={<MoviePage />}></Route>
            <Route path=":id" element={<MovieDetail />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
