const path = require('path');
const inquirer = require('inquirer');

const baseConfig = {
  builds: [
    {
      src: 'src/index.js',
      use: '@now/node-server',
    },
  ],
  routes: [
    {
      src: '/.*',
      dest: 'src/index.js',
    },
  ],
};

async function nodeExpress(config) {
  let mainFile = 'src/index.js';
  try {
    // eslint-disable-next-line
    const packageJson = require(path.join(process.cwd(), 'package.json'));
    mainFile = packageJson.main;
    // eslint-disable-next-line
  } catch (error) { }
  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'main',
      message: 'what is the path to your express entry point?',
      default: mainFile,
    },
  ]);
  baseConfig.builds[0].src = answers.main;
  baseConfig.builds[0].dest = answers.main;
  return {
    ...config,
    ...baseConfig,
  };
}

module.exports = nodeExpress;
