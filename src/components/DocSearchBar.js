import React, { useState } from 'react';
import '../styles/docs.css';

const DocSearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="doc-searchbar">
      <input
        type="text"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default DocSearchBar;
