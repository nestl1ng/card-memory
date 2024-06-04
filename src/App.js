import React from 'react';
import GameBoard from './components/Board';
import Timer from './components/Timer';
import "./styles/App.css"

const App = () => {
    return (
        <div className="app">
            <Timer />
            <GameBoard />
        </div>
    );
};

export default App;
