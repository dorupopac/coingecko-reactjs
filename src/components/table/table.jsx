import React, { useState } from 'react';
import { ListGroupItem, Table } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import './table.css';

const TableComponent = ({
  headerData,
  tableData,
  prevPage,
  nextPage,
  decrementButtonDisable = false,
  pageNo = 0,
}) => {
  const [row, setRow] = useState([]);

  const getTableRow = () => {
    return tableData.map((rowObj, i) => {
      return (
        <tr key={rowObj + i}>
          {headerData.map((value, i) => (
            <td key={value + i}>
              {value === 'image' ? (
                <img src={rowObj[value]} width="50px" alt={rowObj.name} />
              ) : (
                rowObj[value]
              )}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headerData.map(data => (
              <th key={data} style={{ textTransform: 'uppercase' }}>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{getTableRow()}</tbody>
      </Table>
      <div className="table-pagination">
        {tableData.length > 1 && (
          <Pagination>
            <Pagination.Prev
              onClick={prevPage}
              disabled={decrementButtonDisable}
            />
            <Pagination.Item>{pageNo}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
