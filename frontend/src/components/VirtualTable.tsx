import React, { useRef, useState, useCallback } from 'react';
import { useOrders } from '../hooks/useOrders';
import Row from './Row';
import Loader from './Loader';
import '../styles/table.css';

const VirtualTable: React.FC = () => {
  const [limit, setLimit] = useState(50);
  const [sort, setSort] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useOrders({ limit, sort, sortDirection });

  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ROW_HEIGHT = 50; 
  const VISIBLE_ROWS = 20;

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const offset = Math.floor(containerRef.current.scrollTop / ROW_HEIGHT);
      setScrollOffset(offset);

      if (
        containerRef.current.scrollHeight -
          containerRef.current.scrollTop -
          containerRef.current.clientHeight <
        300 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allRows = data?.pages.flatMap((page) => page.data) || [];
  const visibleRows = allRows.slice(scrollOffset, scrollOffset + VISIBLE_ROWS);

  const handleApplyFilters = () => {
    refetch();
  };

  return (
    <div>
      <div className="filter-controls">
        <label>
          Limit:
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            min="1"
            max="100"
          />
        </label>
        <label>
          Sort By:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="id">ID</option>
            <option value="customerName">Customer Name</option>
            <option value="orderAmount">Order Amount</option>
            <option value="createdAt">Created At</option>
            <option value="status">Status</option>
          </select>
        </label>
        <label>
          Sort Direction:
          <select
            value={sortDirection}
            onChange={(e) =>
              setSortDirection(e.target.value as 'asc' | 'desc')
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <button onClick={handleApplyFilters}>Apply</button>
      </div>

      <div className="table-header">
        <span>ID</span>
        <span>Customer Name</span>
        <span>Order Amount</span>
        <span>Created At</span>
        <span>Status</span>
        <span>Items</span>
      </div>

      <div
        className="table-container"
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: `${ROW_HEIGHT * VISIBLE_ROWS}px`, overflowY: 'scroll' }}
      >
        <div style={{ height: `${ROW_HEIGHT * allRows.length}px` }}>
          {visibleRows.map((row, index) => (
            <Row
              key={row.id}
              data={row}
              style={{ top: `${(scrollOffset + index) * ROW_HEIGHT}px` }}
            />
          ))}
          {isFetchingNextPage && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default VirtualTable;