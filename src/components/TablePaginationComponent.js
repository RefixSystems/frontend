import React, { useMemo } from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { FaSort } from 'react-icons/fa';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons/lib';
import './FilterComponent.css';
import { useTheme } from '../Contexts/ThemeContext';

const BasicTable = (props) => {
  const { color } = useTheme();
  const columns = useMemo(() => props.COLUMNS, [props.COLUMNS]);
  const data = useMemo(() => props.MOCK_DATA || [], [props.MOCK_DATA]);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        autoResetWidth: false,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

  return (
    <div>
      <Container fluid className="ml-xxl-n4 ml-xl-n4 ml-lg-n4">
        <Row>
          <Table
            className="justify-content-center align-items-center"
            striped
            hover
            {...getTableProps()}
            responsive={true}
            style={{ width: '100%', marginLeft: '25px' }}
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      key={index}
                      className="text-center text-dark"
                      style={{
                        width: `${column.width}px`,
                        whiteSpace: 'nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={(e) => {
                        // Check if the click was not on the sort icon and if the column is not "ACTIONS"
                        if (
                          !e.target.classList.contains('fa-sort') &&
                          column.render('Header') !== 'ACTIONS'
                        ) {
                          // Change sorting on a single tap
                          column.toggleSortBy(!column.isSortedDesc);
                        }
                      }}
                    >
                      {column.render('Header') === 'ACTIONS' ? (
                        <>{column.render('Header')}</>
                      ) : (
                        <div>
                          {column.render('Header')}
                          <FaSort className="mx-2" />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length > 0 ? (
                page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, cellIndex) => {
                        const isActionColumn =
                          cell.column.id === 'action' ||
                          cell.column.id === 'localShop' ||
                          cell.column.id === 'serviceCenter' ||
                          cell.column.id === 'ourServices' ||
                          cell.column.id === 'addInCarousel';
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={cellIndex}
                            className="text-secondary text-start"
                            style={{
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              maxWidth: '20ch',
                              backgroundColor: index <= props.count-1 ?"#cfd1d1":"",
                            }}
                          >
                            {isActionColumn
                              ? cell.render('Cell')
                              : cell.value
                                ? cell.render('Cell')
                                : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center text-dark"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Col
            className={`${
              page.length > 0 ? 'd-flex' : 'd-none'
            } flex-row justify-content-center align-items-center`}
          >
            <Col className="d-flex justify-content-start align-items-center flex-wrap">
              <span className="m-1">
                Showing{''}
                <strong className="m-2">
                  {props.startIndex} to {props.endIndex} of{' '}
                  <strong className="m-2"> {props.totalItems} entries</strong>
                </strong>
              </span>
            </Col>
            <Col className=" mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center">
              <ReactPaginate
                breakLabel="..."
                onPageChange={(selectedPage) =>
                  props.setCurrentPage(selectedPage.selected + 1)
                }
                pageRangeDisplayed={5}
                pageCount={props.totalPages}
                renderOnZeroPageCount={null}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                containerClassName="pagination"
                previousLabel={
                  <IconContext.Provider value={{ color: color, size: '28px' }}>
                    <AiFillLeftCircle />
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider value={{ color: color, size: '28px' }}>
                    <AiFillRightCircle />
                  </IconContext.Provider>
                }
              />
            </Col>
            <Col className="d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center">
              <Button
                style={{ backgroundColor: color, border: 'none' }}
                onClick={() => props.setCurrentPage(props.currentPage - 1)}
                disabled={props.currentPage === 1}
                className="m-2"
              >
                <BiLeftArrow size={14} />
              </Button>
              <Button
                style={{ backgroundColor: color, border: 'none' }}
                onClick={() => {
                  props.setCurrentPage(props.currentPage + 1);
                }}
                disabled={props.currentPage === props.totalPages}
              >
                <BiRightArrow size={14} />
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default BasicTable;
