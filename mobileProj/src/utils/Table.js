export const TABLES = [
    {table:'IgM_data',type:'IgM'   ,char: 'M' },
    {table:'IgA_data'  ,type:'IgA' ,char: 'A' },
    {table:'IgG_data'  ,type:'IgG' ,char: 'G' },
    {table:'IgG1_data' ,type:'IgG1',char: 'G1' },
    {table:'IgG2_data' ,type:'IgG2',char: 'G2' },
    {table:'IgG3_data' ,type:'IgG3',char: 'G3' },
    {table:'IgG4_data' ,type:'IgG4',char: 'G4' },
  ];

  export  function getTableName(input){
    const tabelName = TABLES.find((item) => item.type === input);
    return tabelName;
  }
  export function getTabletable(input){
    const tabelName = TABLES.find((item) => item.table === input);
    return tabelName;
  }  