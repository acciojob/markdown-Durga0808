import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const parseMarkdown = (markdown) => {
  // Simple markdown parser
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*)\*/gim, '<i>$1</i>');

  // Line breaks
  html = html.replace(/\n/gim, '<br />');

  return html;
};

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState('');

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHtml(parseMarkdown(markdown));
  }, [markdown]);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="app">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="markdown-container">
          <textarea
            className="textarea"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Write your markdown here..."
          />
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default App;
