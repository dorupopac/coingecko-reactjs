import React from 'react';
import TableComponent from '../../components/table/table';
import { Spinner } from 'react-bootstrap';
import { useGlobalContext } from '../../context';
import './home.css';

const Home = () => {
  const { loading, tablePageNo, list, error, setTablePageNo } =
    useGlobalContext();

  return (
    <div className="p-5 home-main">
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
          prevPage={() => setTablePageNo(prev => prev - 1)}
          nextPage={() => setTablePageNo(prev => prev + 1)}
          decrementButtonDisable={tablePageNo === 1}
          pageNo={tablePageNo}
        />
      ) : (
        <div style={{ color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default Home;
