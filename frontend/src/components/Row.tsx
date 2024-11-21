import React, { useState } from 'react';

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'status-pending';
    case 'processing':
      return 'status-processing';
    case 'completed':
      return 'status-completed';
    case 'cancelled':
      return 'status-cancelled';
    default:
      return '';
  }
};

interface RowProps {
  data: {
    id: number;
    customerName: string;
    orderAmount: number;
    status: string;
    items: string | object;
    createdAt: string;
  };
  style: React.CSSProperties;
}

const Row: React.FC<RowProps> = ({ data, style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let parsedItems;

  if (typeof data.items === 'string') {
    try {
      parsedItems = JSON.parse(data.items);
    } catch (error) {
      console.error('Error parsing items:', error);
      parsedItems = [];
    }
  } else {
    parsedItems = data.items;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="row" style={style}>
      <span>{data.id}</span>
      <span>{data.customerName}</span>
      <span>${data.orderAmount.toFixed(2)}</span>
      {/* <span>{data.status}</span> */}
      <span>{new Date(data.createdAt).toLocaleString()}</span>
      <span className={`status-badge ${getStatusClass(data.status)}`}>
        {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
      </span>

      <button onClick={openModal} className="show-items-btn">Show Items</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Close button (X) */}
            <span className="close-btn" onClick={closeModal}>×</span>
            <h3>Items for Order {data.id}</h3>
            {Array.isArray(parsedItems) && parsedItems.length > 0 ? (
              <ul>
                {parsedItems.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;