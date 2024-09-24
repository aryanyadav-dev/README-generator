import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Optional: for rendering the markdown

function ReadmeGenerator() {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [installation, setInstallation] = useState('');
  const [usage, setUsage] = useState('');
  const [license, setLicense] = useState('MIT');
  const [generatedReadme, setGeneratedReadme] = useState('');

  // Function to handle generating the markdown content
  const generateReadme = () => {
    const markdownTemplate = `
# ${projectTitle || 'Project Title'}

${description || 'Brief description of the project.'}

## Features
${features || '- Feature 1\n- Feature 2\n- Feature 3'}

## Installation
\`\`\`bash
${installation || '# Install dependencies\nnpm install'}
\`\`\`

## Usage
\`\`\`bash
${usage || '# Run the project\nnpm start'}
\`\`\`

## License
This project is licensed under the ${license} License.
`;

    setGeneratedReadme(markdownTemplate);
  };

  // Function to copy the content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme);
    alert("Copied to clipboard!");
  };

  // Function to download README as a .md file
  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedReadme], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>README Generator</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea
          rows="4"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        ></textarea>
        <textarea
          rows="3"
          placeholder="Features (one per line)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        ></textarea>
        <textarea
          rows="3"
          placeholder="Installation Instructions"
          value={installation}
          onChange={(e) => setInstallation(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        ></textarea>
        <textarea
          rows="3"
          placeholder="Usage Instructions"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        ></textarea>
        <select
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="MIT">MIT</option>
          <option value="GPLv3">GPLv3</option>
          <option value="Apache 2.0">Apache 2.0</option>
          <option value="BSD 3-Clause">BSD 3-Clause</option>
        </select>
      </div>

      {/* Button to generate README */}
      <button onClick={generateReadme} style={{ padding: '10px 20px', marginBottom: '20px', marginRight: '10px' }}>
        Generate README
      </button>

      {/* Button to download README */}
      <button onClick={downloadReadme} style={{ padding: '10px 20px', marginBottom: '20px', marginRight: '10px' }}>
        Download README.md
      </button>

      {/* Display generated README in a box */}
      {generatedReadme && (
        <div>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {generatedReadme}
            </pre>
            <button
              onClick={copyToClipboard}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Copy
            </button>
          </div>

          {/* Optionally: Render markdown directly */}
          <h2>Preview:</h2>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#fff',
            }}
          >
            <ReactMarkdown>{generatedReadme}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadmeGenerator;
