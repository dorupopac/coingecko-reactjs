import React from 'react';
import { Table } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import './table.css';

const TableComponent = ({
  headerData,
  tableData,
  prevPage,
  nextPage,
  decrementButtonDisable = false,
  pageNo = 0,
  showPagination = true,
}) => {
  const { error } = useGlobalContext();

  const getTableRow = () => {
    return tableData.map((rowObj, i) => {
      return (
        <tr key={rowObj + i}>
          {headerData.map((value, i) => (
            <td key={value + i}>
              {value === 'image' ? (
                <Link to={`/details/${rowObj.id}`}>
                  <img src={rowObj[value]} width="50px" alt={rowObj.name} />
                </Link>
              ) : (
                rowObj[value]
              )}
            </td>
          ))}
        </tr>
      );
    });
  };

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {headerData.map(data => (
              <th key={data} style={{ textTransform: 'uppercase' }}>
                {data.replace('_', ' ')}
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
            <Pagination.Item disabled>{pageNo}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
