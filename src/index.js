
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
import Freelance from './pages/Freelances';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Result from './pages/Result';
import Survey from './pages/Survey'
import { SurveyProvider, ThemeProvider } from './utils/context';

import GlobalStyle from './utils/style/GlobalStyle';



// const GlobalStyle = createGlobalStyle`
//     div {
//         font-family: 'Trebuchet MS', Helvetica, sans-serif;
//     }
// `

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/survey/:questionNumber' element={<Survey />} />
            <Route path='/freelance' element={<Freelance />} />
            <Route path='/result' element={<Result />} />
            <Route path='/profile/:id' render={(props) => <Profile {...props} />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

