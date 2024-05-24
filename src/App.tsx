import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Recommendations from './components/Recommendations';

const App: React.FC = () => {
    const [userId] = useState("20");

    return (
        <div>
            <h1>Movie Recommendation System</h1>
            <SearchBar />
            <Recommendations userId={userId} />
        </div>
    );
};

export default App;
