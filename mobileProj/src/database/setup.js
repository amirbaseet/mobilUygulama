import { initializeTables } from './tableInit';
import { insertData } from './dataInsert';
import { loadJSONFile } from '../utils/jsonLoader';
export const setupDatabase = async () => {
  initializeTables();

  const files = [
    { table: 'IgG1', file: 'igG1.json' },
    { table: 'IgG2', file: 'IgG2.json' },
    { table: 'IgG3', file: 'igG3.json' },
    { table: 'IgG4', file: 'IGG4.json' },
    { table: 'IgM', file: 'igM.json' },
    { table: 'IgA', file: 'IgA.json' },
    { table: 'IgG', file: 'igG.json' },
  ];

  for (const { table, file } of files) {
    const data = await loadJSONFile(file);
    insertData(table, data);
  }
};
