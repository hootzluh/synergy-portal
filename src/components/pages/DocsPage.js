import React from 'react';
import DocSidebar from '../layout/DocSidebar';
import DocViewer from '../DocViewer';
import DocSearchBar from '../DocSearchBar';
import '../../styles/docs.css';

const DocsPage = () => {
  return (
    <div className="docs-page-container">
      <DocSidebar />
      <main className="docs-content-container">
        <DocSearchBar />
        <DocViewer />
      </main>
    </div>
  );
};

export default DocsPage;
