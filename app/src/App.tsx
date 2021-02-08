//
//  App.tsx
//  app
//
//  Created by d-exclaimation on 1:37 PM.
//  Copyright © 2020 d-exclaimation. All rights reserved.
//


import React from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Board/>
            </header>
        </div>
    );
};

export default App;
