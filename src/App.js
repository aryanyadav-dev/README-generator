import React, { useState } from 'react'; 
import './App.css';

function App() {
  const [githubLink, setGithubLink] = useState('');
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(''); 
    try {
      const response = await fetch('http://localhost:3000/generate-readme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubLink }), 
      });

      if (!response.ok) {
        throw new Error('Failed to generate README. Please check the GitHub link.');
      }

      const data = await response.json();
      setGeneratedReadme(data.readme); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="background">
      <div className="search-container">
        <h1>Generate a README for any code on <span>GitHub</span></h1>

        {/* Input form for GitHub link */}
        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Enter a GitHub Link" 
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)} 
              required 
            />
            <button type="submit" disabled={loading}>Generate</button> {/* Disable button during loading */}
          </div>
        </form>

        {/* Display loading indicator */}
        {loading && <p>Loading...</p>}

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Display the generated README once it is received */}
        {generatedReadme && (
          <div className="readme-container">
            <h2>Generated README</h2>
            <pre>{generatedReadme}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
