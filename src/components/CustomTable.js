import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  Card,
  Button,
  Col,
  Dropdown,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { MdModeEditOutline } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { FaPlus, FaSearch, FaSortAmountDown } from 'react-icons/fa';

const CustomTable = ({
  columns,
  data,
  addButton,
  sortButton,
  searchButton,
  currentPage,
  setCurrentPage,
  totalLength,
  handleEdit,
  handleDelete,
  sortValues,
  handleSort,
  handleSearch,
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sort, setSort] = useState('All');
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setCurrentPage(pagination.pageIndex);
  }, [pagination.pageIndex, setCurrentPage]);

  const startRow = pagination.pageIndex * pagination.pageSize + 1;
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalLength
  );

  return (
    <div className="p-5">
      <Card className="px-3">
        <div
          className="d-flex flex-xxl-row flex-xl-row flex-md-row flex-column flex-lg-row flex-sm-column justify-content-lg-between justify-content-xxl-between justify-content-xl-between justify-content-md-center justify-content-sm-center align-items-center py-3 flex-wrap"
          style={{ backgroundColor: 'white', borderBottom: 'none' }}
        >
          <Col>
            <p style={{ fontWeight: 700, fontSize: '20px' }}>Hello</p>
          </Col>
          <Col className="mx-2 my-2">
            {!searchButton ? (
              <InputGroup style={{ borderRadius: '50px' }}>
                <FormControl
                  autoFocus={false}
                  placeholder="Search..."
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    borderTopLeftRadius: '50px',
                    borderBottomLeftRadius: '50px',
                    boxShadow: 'none',
                  }}
                />
                <Button
                  variant="outline-warning"
                  onClick={() => handleSearch(query)}
                  style={{
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '50px',
                  }}
                  className="d-flex px-4 flex-row justify-content-center align-items-center gap-xxl-2 gap-xl-2 gap-lg-2 gap-md-2"
                >
                  <span>
                    <FaSearch />
                  </span>
                </Button>
              </InputGroup>
            ) : (
              <div></div>
            )}
          </Col>
          <Col className="d-flex flex-row justify-content-lg-end justify-content-xxl-end justify-content-xl-end justify-content-md-end justify-content-sm-center gap-2 align-items-center flex-md-nowrap">
            {!sortButton ? (
              <Col
                xs="auto"
                className="d-flex flex-row gap-2 justify-content-end flex-wrap"
              >
                <Dropdown>
                  <Dropdown.Toggle
                    as={Button}
                    variant="secondary"
                    style={{ borderRadius: '50px' }}
                    className="d-flex px-4 flex-row justify-content-center align-items-center gap-2 custom-dropdown-toggle custom-dropdown-no-caret"
                  >
                    <span>
                      <FaSortAmountDown />
                    </span>
                    <span
                      style={{ fontSize: '14px', fontWeight: 600 }}
                      className="d-sm-none d-md-block d-xxl-block d-xl-block text-nowrap d-none d-lg-block"
                    >
                      Sort By - {sort}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {sortValues.map((value, index) => (
                      <Dropdown.Item
                        key={index}
                        eventKey={index}
                        onClick={() => {
                          handleSort(value);
                          setSort(value);
                        }}
                      >
                        {value}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            ) : (
              <div></div>
            )}
            {!addButton ? (
              <Button
                style={{ borderRadius: '50px' }}
                className="d-flex px-4 flex-row justify-content-center align-items-center gap-xxl-2 gap-xl-2 gap-lg-2 gap-md-2"
              >
                <span>
                  <FaPlus />
                </span>
                <span
                  style={{ fontSize: '15px', fontWeight: 600 }}
                  className="d-sm-none d-md-block d-xxl-block d-xl-block text-nowrap d-none d-lg-block"
                >
                  Add Hello
                </span>
              </Button>
            ) : (
              <div></div>
            )}
          </Col>
        </div>

        <div className="table-container">
          <Table responsive={true} color="white">
            <thead
              style={{
                marginBottom: '10px',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        color: '#2f2f2f',
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'white',
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                  <th style={{ fontSize: 14, fontWeight: 600 }}>Actions</th>
                </tr>
              ))}
            </thead>

            <tbody style={{ overflowY: 'auto', height: '20px' }}>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  style={{ height: '60px', verticalAlign: 'middle' }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: '#939393',
                        verticalAlign: 'middle',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '70px',
                    }}
                  >
                    <span
                      onClick={() => handleEdit(row)}
                      style={{
                        display: 'flex',
                        marginRight: '0.5rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '5px',
                        width: '32px',
                        height: '32px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MdModeEditOutline size={20} />
                    </span>
                    <span
                      onClick={() => handleDelete(row)}
                      style={{
                        display: 'flex',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '6px',
                        width: '32px',
                        height: '32px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IoMdTrash size={20} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Card.Footer
          className="p-4 d-flex justify-content-end align-items-center"
          style={{ backgroundColor: 'white', borderTop: 'none' }}
        >
          <div className="d-flex align-items-center gap-3">
            <span
              className="text-nowrap d-flex flex-row justify-content-center align-items-center"
              style={{ fontSize: '15px', color: '#939393' }}
            >
              {startRow}-{endRow} of {totalLength}
            </span>
            <div
              onClick={() => table.getCanPreviousPage() && table.previousPage()}
              aria-disabled={!table.getCanPreviousPage()}
              className={`pointer ${!table.getCanPreviousPage() ? 'disabled' : ''}`}
              style={{
                cursor: !table.getCanPreviousPage() ? 'not-allowed' : 'pointer',
              }}
            >
              <IoIosArrowBack size={18} />
            </div>
            <div
              onClick={() => table.getCanNextPage() && table.nextPage()}
              aria-disabled={!table.getCanNextPage()}
              className={`pointer ${!table.getCanNextPage() ? 'disabled' : ''}`}
              style={{
                cursor: !table.getCanNextPage() ? 'not-allowed' : 'pointer',
              }}
            >
              <IoIosArrowForward size={18} />
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default CustomTable;


// How to use Above Table?

// import { createColumnHelper } from '@tanstack/react-table';
// import { CustomTable } from './components/CustomTable';
// const data = [
//   {
//     id: 1,
//     col1: 'Hello',
//     col2: 'World',
//   },
//   {
//     id: 2,
//     col1: 'react-table',
//     col2: 'rocks',
//   },
//   {
//     id: 3,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 4,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 5,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 6,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 7,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 8,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 9,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 10,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 11,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 12,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 13,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 14,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   {
//     id: 15,
//     col1: 'whatever',
//     col2: 'you want',
//   },
//   // Add more rows with unique IDs...
// ];

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor('col1', {
//     id: 'col1',
//     header: 'Column 1',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//     enableFiltering: true,
//   }),
//   columnHelper.accessor('col2', {
//     id: 'col2',
//     header: 'Column 2',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//     enableFiltering: true,
//   }),
//   columnHelper.accessor('col2', {
//     id: 'col2',
//     header: 'Column 2',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//     enableFiltering: true,
//   }),
//   columnHelper.accessor('col2', {
//     id: 'col2',
//     header: 'Column 2',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//     enableFiltering: true,
//   }),
//   columnHelper.accessor('col2', {
//     id: 'col2',
//     header: 'Column 2',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//     enableFiltering: true,
//   }),
//   columnHelper.accessor('col2', {
//     id: 'col2',
//     header: 'Column 2',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//     enableFiltering: true,
//   }),

//   // Add more columns if needed...
// ];

// function handleEdit(id) {
//   // Implement edit logic here
//   console.log('Editing row with ID:', id.original.id);
// }

// function handleDelete(id) {
//   // Implement delete logic here
//   console.log('Deleting row with ID:', id.original.id);
// }
// function handleSearch(query) {
//   // Implement delete logic here
//   console.log(query);
// }

// function handleSort(id) {
//   // Implement delete logic here
//   console.log('sort with ID:', id);
// }

// const sortValues = ['All', 'Category'];

// function App() {
//   const [currentPage, setCurrentPage] = useState(1);
//   return (
//     <div className="App">
//       <CustomTable
//         columns={columns}
//         data={data}
//         sortValues={sortValues}
//         handleSort={handleSort}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         handleSearch={handleSearch}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalLength={15}
//       />
//     </div>
//   );
// }

// export default App;
