import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/docs.css';

const docsIndex = {
  'Getting Started': [
    { title: 'Introduction to Synergy Network', slug: 'introduction' },
    { title: 'Network Architecture', slug: 'network-architecture' },
    { title: 'Creating a Wallet', slug: 'creating-a-wallet' },
    { title: 'Obtaining SYN Tokens', slug: 'obtaining-syn-tokens' },
    { title: 'Making Your First Transaction', slug: 'first-transaction' },
  ],
  'Core Concepts': [
    { title: 'Proof of Synergy', slug: 'proof-of-synergy' },
    { title: 'Validator Clusters', slug: 'validator-clusters' },
    { title: 'Synergy Points System', slug: 'synergy-points' },
    { title: 'Post-Quantum Cryptography', slug: 'pqc' },
    { title: 'Synergy Naming System (SNS)', slug: 'sns' },
  ]
};

const DocSidebar = () => {
  const [openSections, setOpenSections] = useState(() =>
    Object.keys(docsIndex).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );
  const location = useLocation();

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="docs-sidebar">
      {Object.entries(docsIndex).map(([category, pages]) => (
        <div key={category} className="sidebar-category">
          <div
            className="sidebar-category-header"
            onClick={() => toggleSection(category)}
          >
            <strong>{category}</strong>
            <span>{openSections[category] ? '−' : '+'}</span>
          </div>
          {openSections[category] && (
            <ul>
              {pages.map(({ title, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/docs/${category.toLowerCase().replace(/ /g, '-')}/${slug}`}
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
