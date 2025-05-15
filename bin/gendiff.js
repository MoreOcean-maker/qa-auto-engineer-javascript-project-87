#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    genDiff(data1, data2);
  });

program.parse(process.argv);
