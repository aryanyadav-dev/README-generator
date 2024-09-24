function generateReadme(repoData) {
    let readmeContent = `# Project Title\n\n`;
  
    const readmeFile = repoData.find(file => file.name.toLowerCase() === 'readme.md');
    if (readmeFile) {
      readmeContent += `## Existing README Found:\n\n${readmeFile.download_url}\n\n`;
    }
  
    readmeContent += `## Repository Structure\n\n`;
    repoData.forEach(file => {
      if (file.type === 'dir') {
        readmeContent += `- 📂 ${file.name}\n`;
      } else {
        readmeContent += `- 📄 ${file.name}\n`;
      }
    });
  
    const hasPackageJson = repoData.some(file => file.name === 'package.json');
    if (hasPackageJson) {
      readmeContent += `\n## Running the Project\n\n`;
      readmeContent += '```bash\nnpm install\nnpm start\n```\n';
    }
  
    return readmeContent;
  }
  
  module.exports = { generateReadme };
  