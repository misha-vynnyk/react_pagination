import React from 'react';
import cn from 'classnames';

interface PaginationProps {
  pageItemsToShow: number[];
  pageItemCount: number;
  currentPage: number;
  visibleItems: string[];
  handleChangePage: (choicePage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageItemsToShow,
  pageItemCount,
  currentPage,
  visibleItems,
  handleChangePage,
}) => {
  return (
    <div>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageItemsToShow.map(item => (
          <li
            className={cn(`page-item`, { active: item === currentPage })}
            key={item}
          >
            <a
              aria-label={`Go to page ${item}`}
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => handleChangePage(item)}
            >
              {item}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === pageItemCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageItemCount ? 'true' : 'false'}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map((item, index) => (
          <li data-cy="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
