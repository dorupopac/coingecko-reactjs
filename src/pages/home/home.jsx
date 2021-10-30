import React from 'react';
import TableComponent from '../../components/Table/Table';
import { Spinner } from 'react-bootstrap';
import { useGlobalContext } from '../../context';

const Home = () => {
  const { loading, tablePageNo, list, error, setTablePageNo } =
    useGlobalContext();

  const handleNextTablePage = () => {
    setTablePageNo(prev => prev + 1);
  };

  const handlePrevTablePage = () => {
    setTablePageNo(prev => prev - 1);
  };

  return (
    <div className="m-5">
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : list.length > 0 ? (
        <TableComponent
          headerData={Object.keys(list[0]).filter(key => key !== 'id')}
          tableData={list}
          prevPage={handlePrevTablePage}
          nextPage={handleNextTablePage}
          decrementButtonDisable={tablePageNo === 1}
          pageNo={tablePageNo}
          containerClassName="mt-5"
        />
      ) : (
        <div style={{ color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default Home;
