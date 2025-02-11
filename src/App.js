import  React from 'react';
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Index } from './components/home/home';
import { Jugador } from './components/jugadores/jugador';
import { Show } from './components/jugadores/mostrar';
import { Temp } from './components/finanzas/fin'


export function App() {

  return (
    <BrowserRouter basename="/sportmanapp">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/players" element={<Show />} />
        <Route path="/add" element={<Jugador />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
