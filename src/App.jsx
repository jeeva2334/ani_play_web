import React, { Suspense, useState } from 'react'
import Navbar from './components/Navbar'
// import HomePage from './pages/HomePage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DetailsPage from './pages/DetailsPage';
import VideoPage from './pages/VideoPage';
import MorePage from './pages/MorePage';
import SearchPage from './pages/SearchPage';
import LoginScreen from './pages/LoginScreen';
import RegisterPage from './pages/RegisterPage';

const HomePage = React.lazy(()=>import('./pages/HomePage'));

function Loader(){
  return(
    <div className='flex flex-col justify-center items-center h-screen'>
      <div class="loader">
        <div class="cell d-0"></div>
        <div class="cell d-1"></div>
        <div class="cell d-2"></div>
        <div class="cell d-1"></div>
        <div class="cell d-2"></div>  
        <div class="cell d-2"></div>
        <div class="cell d-3"></div>        
        <div class="cell d-3"></div>
        <div class="cell d-4"></div>        
      </div>
      <h1 className='text-[rgb(48,248,208)] mt-12 flex font-bold text-2xl justify-center items-center'><img src='logo.png' className="w-20" /> Ani Play...</h1>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense fallback={<Loader />}>
          <HomePage />
        </Suspense>} />
        <Route path="/anime/:id" element={<DetailsPage />} />
        <Route path="/:id" element={<MorePage />} />
        <Route path="/play/:id/:name" element={<VideoPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
