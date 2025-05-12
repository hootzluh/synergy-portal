import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/docs.css';

const DocSidebar = () => {
  const [docsIndex, setDocsIndex] = useState({});
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetch('/docs/docs_index.json')
      .then((res) => res.json())
      .then((data) => {
        setDocsIndex(data);
        // Automatically open all categories initially
        const initialState = {};
        Object.keys(data).forEach((cat) => {
          initialState[cat] = true;
        });
        setOpenSections(initialState);
      })
      .catch((err) => {
        console.error('Failed to load docs_index.json', err);
      });
  }, []);

  const toggleSection = (category) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <aside className="docs-sidebar">
      {Object.entries(docsIndex).map(([category, pages]) => (
        <div key={category} className="sidebar-category">
          <div
            className="sidebar-category-header"
            onClick={() => toggleSection(category)}
          >
            <strong>{category.replace(/-/g, ' ')}</strong>
            <span>{openSections[category] ? '−' : '+'}</span>
          </div>
          {openSections[category] && (
            <ul>
              {pages.map(({ title, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/docs/${category}/${slug}`}
                    className={location.pathname.includes(slug) ? 'active-link' : ''}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
};

export default DocSidebar;
