import {useTable, useSortBy, usePagination} from 'react-table'
import { useState } from 'react';
import {data} from './assets/data.json'
const columns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Salary',
    accessor: 'salary',
  },
]

function App() {
  const [inputPage, setInputPage] = useState(''); // State for page input
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    page, 
    prepareRow, 
    nextPage, 
    previousPage,
    canNextPage,
    canPreviousPage,
    state:{
      pageIndex
    },
    pageCount,
    gotoPage
  } = useTable({
    columns, 
    data,
    initialState: { pageSize: 5 },
  },
  useSortBy,
  usePagination
  )

   // Handle page change for "Enter" key or button click
   const handlePageSubmit = () => {
    const page = inputPage ? Number(inputPage) - 1 : 0;
    if (page >= 0 && page < pageCount) {
      gotoPage(page);
    }
  };
   // Trigger page change on pressing Enter key
   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePageSubmit();
    }
  };

  return (
    <div className='container'>
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(hg=>(
              <tr {...hg.getHeaderGroupProps()}>
                {
                  hg.headers.map(column=>(
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            page.map(row=>{
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell=>{
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='btn-container'>
        <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>First</button>
        <button disabled={!canPreviousPage} onClick={previousPage}>Previous</button>
        <span>{pageIndex + 1} of {pageCount}</span>
        <button disabled={!canNextPage} onClick={nextPage}>Next</button>
        <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>Last</button>
        <button onClick={handlePageSubmit}>Go to Page</button>
        <input
          type='number'
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={handleKeyDown}
          defaultValue='1'
          placeholder='1'
          min='1'
          max={pageCount}
        />
      </div>
    </div>
  )
}

export default App
