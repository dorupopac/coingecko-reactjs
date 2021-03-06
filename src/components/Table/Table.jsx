import React from 'react';
import HomeBtn from '../Utils/HomeBtn';
import { Table } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import { useGlobalContext } from '../../hooks/global-context';
import { Link } from 'react-router-dom';

const TableComponent = ({
  headerData,
  tableData,
  prevPage,
  nextPage,
  decrementButtonDisable = false,
  pageNo = 1,
  containerClassName = '',
}) => {
  const { error, setSearchTerm, searchTerm } = useGlobalContext();

  const resetSearchTerm = () => {
    setSearchTerm('');
  };

  const getTableRow = () => {
    return tableData.map((rowObj, i) => {
      return (
        <tr key={rowObj + i}>
          {headerData.map((value, i) => (
            <td
              key={value + i}
              style={
                rowObj[value] !== null
                  ? {}
                  : { fontStyle: 'italic', fontWeight: '200' }
              }
            >
              {value === 'image' ? (
                <Link onClick={resetSearchTerm} to={`/details/${rowObj.id}`}>
                  <img src={rowObj[value]} width="50px" alt={rowObj.name} />
                </Link>
              ) : rowObj[value] !== null ? (
                rowObj[value]
              ) : (
                'No data found ☹️'
              )}
            </td>
          ))}
        </tr>
      );
    });
  };

  if (error) return <h2>{error}</h2>;
  return (
    <>
      {searchTerm.length !== 0 && <HomeBtn />}
      <Table
        className={containerClassName}
        striped
        hover
        responsive
        variant="dark"
      >
        <thead>
          <tr>
            {headerData.map(data => (
              <th key={data} style={{ textTransform: 'uppercase' }}>
                {data.replaceAll('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{getTableRow()}</tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {tableData.length > 1 && (
          <Pagination>
            <Pagination.Prev
              onClick={prevPage}
              disabled={decrementButtonDisable}
            />
            <Pagination.Item active>{pageNo}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        )}
      </div>
    </>
  );
};

export default TableComponent;
