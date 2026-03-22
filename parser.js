import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { copyFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  currentFile: join(__dirname, 'currentFile.txt'),
  inputFile: join(__dirname, 'inputFile.txt'),
  outputDir: join(__dirname, 'outputDir'),
};

const parser = createInterface({
  input: config.currentFile,
  crlfDelay: Infinity,
});

parser.on('line', (line) => {
  if (line.startsWith('#')) {
    console.log(line);
  } else if (line.startsWith(' ') || line.startsWith('\t')) {
    const trimmedLine = line.trim();
    const [command, ...args] = trimmedLine.split(' ');
    if (command === 'include') {
      const includedFile = args[0];
      const includedFilePath = join(config.inputFile, includedFile);
      copyFileSync(includedFilePath, join(config.outputDir, includedFile));
      console.log(`Included file: ${includedFile}`);
    }
  }
});