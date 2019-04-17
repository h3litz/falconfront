import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

import styles from './index.less';    // 按照 CSS Modules 的方式引入样式文件。

const ProductList = ({ onDelete, products }) => {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    }];
    return (
      <Table
        dataSource={products}
        columns={columns}
      />
    );
  };
  
  ProductList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
  };
  
  export default ProductList;