import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/docs.css';

const DocViewer = () => {
  const { category, slug } = useParams();
  const [content, setContent] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const path = `/docs/${category}/${slug}.md`;
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error('404');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLastUpdated(new Date().toLocaleDateString());
      })
      .catch(() => setContent('## 404\nDocumentation not found.'));
  }, [category, slug]);

  return (
    <div className="doc-viewer fade-in">
      <ReactMarkdown
        children={content}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
      <div className="doc-updated">Last updated: {lastUpdated}</div>
    </div>
  );
};

export default DocViewer;
