const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const { generateReadme } = require('./readmeGenerator'); 

const app = express();
app.use(cors()); 
app.use(express.json());

app.post('/generate-readme', async (req, res) => {
  const { githubLink } = req.body;

  
  const repoDetails = extractRepoDetails(githubLink);

  if (!repoDetails) {
    return res.status(400).json({ error: 'Invalid GitHub URL' });
  }

  const { owner, repo } = repoDetails;

  try {
    const repoData = await fetchRepoData(owner, repo);

    if (!repoData || repoData.length === 0) {
      return res.status(404).json({ error: 'Repository not found or is empty' });
    }

    const readmeContent = generateReadme(repoData);

    res.json({ readme: readmeContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate README' });
  }
});

function extractRepoDetails(githubLink) {
  const regex = /github\.com\/([\w-]+)\/([\w-]+)/;
  const match = githubLink.match(regex);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
}

async function fetchRepoData(owner, repo) {
  const githubAPI = `https://api.github.com/repos/${owner}/${repo}/contents/`;
  
  try {
    const response = await axios.get(githubAPI, {
      headers: { 
        'User-Agent': 'README-Generator',
        'Accept': 'application/vnd.github.v3+json' 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching repository data from GitHub');
  }
}

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
