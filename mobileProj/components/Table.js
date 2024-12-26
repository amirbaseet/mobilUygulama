import * as React from 'react';
import { DataTable } from 'react-native-paper';
import getTableName from './AgeScreen'
const Tabel = ({items}) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([4, 6, 8]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>klavuz</DataTable.Title>
        <DataTable.Title >IG</DataTable.Title>
        <DataTable.Title >age_group</DataTable.Title>
        <DataTable.Title >ref range</DataTable.Title>
        <DataTable.Title >type</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item,index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{item.KilavuzName}</DataTable.Cell>
          <DataTable.Cell >{item.type}</DataTable.Cell>
          <DataTable.Cell >{item.age_group}</DataTable.Cell>
          <DataTable.Cell >{item.DataBaseMinRange}</DataTable.Cell>
          <DataTable.Cell >{item.DataBaseMaxRange}</DataTable.Cell>
          <DataTable.Cell >{item.testType}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default Tabel;