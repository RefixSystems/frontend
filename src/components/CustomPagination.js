import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useTheme } from '../Contexts/ThemeContext';

const CustomPagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const { color } = useTheme();
  const maxPagesToShow = 5;

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return [...Array(totalPages).keys()].map((page) => page + 1);
    }

    const pages = [];
    let startPage, endPage;

    if (currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="justify-content-center" style={{ zIndex: 0 }}>
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        linkStyle={{ color: currentPage === 1 ? 'grey' : color }}
      />
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
          linkStyle={{
            backgroundColor: page === currentPage ? color : 'white',
            color: page !== currentPage ? color : 'white',
            borderColor: page === currentPage ? color : 'white',
          }}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        linkStyle={{ color: currentPage === totalPages ? 'grey' : color }}
      />
    </Pagination>
  );
};

export default CustomPagination;
