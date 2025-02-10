import  React from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import { Home, Index } from './components/home/home';
import { Jugador } from './components/jugadores/jugador';
import { Show } from './components/jugadores/mostrar';


export function App() {


  return (
    <Routes>
<Route path="/" element={<Index />} />
<Route path="/players" element={<Show />} />
<Route path="/add" element={<Jugador />} />
    </Routes>
  );
}

export default App;
