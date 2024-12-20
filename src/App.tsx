import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);
const perPageOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const totalPageLength = items.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalPageLength);
  const visibleItems = items.slice(startIndex, endIndex);
  const pageItemCount = Math.ceil(totalPageLength / itemsPerPage);

  const getVisiblePages = () => {
    const maxPages = 9;
    const halfWindow = Math.floor(maxPages / 2);

    let start = Math.max(1, currentPage - halfWindow);
    let end = Math.min(pageItemCount, currentPage + halfWindow);

    if (currentPage <= halfWindow) {
      end = Math.min(pageItemCount, maxPages);
    } else if (currentPage + halfWindow > pageItemCount) {
      start = Math.max(1, pageItemCount - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageItemsToShow = getVisiblePages();

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleChangePage = (choicePage: number): void => {
    if (
      choicePage < 1 ||
      choicePage > pageItemCount ||
      choicePage === currentPage
    ) {
      return;
    }

    setCurrentPage(choicePage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of{' '}
        {totalPageLength})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {perPageOptions.map(pageCount => (
              <option value={pageCount} key={pageCount}>
                {pageCount}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        pageItemsToShow={pageItemsToShow}
        pageItemCount={pageItemCount}
        currentPage={currentPage}
        visibleItems={visibleItems}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default App;
