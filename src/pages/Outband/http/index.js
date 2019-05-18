import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Modal,
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ outband, loading }) => ({
  outband,
  loading: loading.models.outband,
}))
@Form.create()
class Http extends PureComponent {
  state = {
    deleteVisible: false,
    deleteDone: false,
    bulkDeleteVisible: false,
    bulkDeleteDone: false,
    selectedRows: [],
    formValues: {},
    current: '',
  };

  columns = [
    {
      title: 'url',
      dataIndex: 'url',
    },
    // {
    //   title: 'headers',
    //   dataIndex: 'headers',
    // },
    // {
    //   title: 'data',
    //   dataIndex: 'data',
    // },
    {
      title: '源IP',
      dataIndex: 'source_ip',
    },
    {
      title: '时间',
      dataIndex: 'created',
    },
    {
      title: '操作',
      render: (match, record) => (
        <Fragment>
          <a onClick={() => this.showDeleteModal(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'outband/fetchHttp',
      payload: {
        method: 'http'
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const fieldsValue = form.getFieldsValue();
    this.setState({
      formValues: {
        'search': fieldsValue.search,
        // 'name': fieldsValue.name,
        // 'domain': fieldsValue.domain,
        'sourceIP': fieldsValue.sourceIP,
      }
    });
    dispatch({
      type: 'outband/fetchHttp',
      payload: { method: 'http', ...fieldsValue },
    });
  };

  handleSearchFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
  };

  showDeleteModal = (record) => {
    this.setState({
      deleteVisible: true,
      deleteDone: false,
      current: record,
    });
  };

  handleDeleteCancel = () => {
    this.setState({
      deleteVisible: false,
    });
  };

  handleDeleteDone = () => {
    this.setState({
      deleteDone: true,
      deleteVisible: false,
    });
  };

  handleDeleteItem = () => {
    const { dispatch } = this.props;
    const { current: { id } } = this.state;
    this.setState({
      deleteDone: true,
    });
    dispatch({
      type: 'outband/submitHttp',
      payload: { id, method: 'http' },
    });
    dispatch({
      type: 'outband/fetchHttp',
      payload: { method: 'http' },
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      method: 'http',
      ...formValues,
      ...filters,

    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'outband/fetchHttp',
      payload: params,
    });
  };

  showBulkDeleteVisible = () => {
    this.setState({
      bulkDeleteVisible: true,
    });
  };

  handleBulkDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) return;
    this.setState({
      selectedRows: [],
      bulkDeleteDone: true,
    });
    dispatch({
      type: 'outband/bulkOperateHttp',
      payload: {
        ids: selectedRows.map(row => row.id),
        method: 'http'
      }
    });
    message.success('操作成功');
    dispatch({
      type: 'outband/fetchHttp',
      payload: { method: 'http' },
    });
  };

  handleBulkDeleteDone = () => {
    this.setState({
      bulkDeleteDone: false,
      bulkDeleteVisible: false
    });
  };

  handelBulkDeleteCancel = () => {
    this.setState({
      bulkDeleteVisible: false
    })
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };



  render() {
    const {
      outband: { http },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { selectedRows, deleteVisible, bulkDeleteVisible, bulkDeleteDone, deleteDone = {} } = this.state;


    const modalDeleteFooter = deleteDone
      ? { footer: null, onCancel: this.handleDeleteDone }
      : { okText: '删除', onOk: this.handleDeleteItem, onCancel: this.handleDeleteCancel };

    const bulkDeleteFooter = bulkDeleteDone
      ? { footer: null, onCancel: this.handelBulkDeleteDone }
      : { okText: '删除', onOk: this.handleBulkDelete, onCancel: this.handelBulkDeleteCancel };


    const getOperateModalContent = () => {
      if (deleteDone) {
        return (
          <Result
            type="success"
            title="删除成功"
            description="删除http记录成功"
            actions={
              <Button type="primary" onClick={this.handleDeleteDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (<p>确定删除该http记录？</p>)
    }

    const getBulkDeleteModalContent = () => {
      if (bulkDeleteDone) {
        return (
          <Result
            type="success"
            title="删除成功"
            description="删除http记录成功"
            actions={
              <Button type="primary" onClick={this.handleBulkDeleteDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (<p>确定批量删除http记录？</p>)
    }

    return (
      <PageHeaderWrapper title="httplog列表">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="搜索">
                    {getFieldDecorator('search', {
                      rules: [{ required: false, message: '请输入' }]
                    })
                      (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="源IP">
                    {getFieldDecorator('sourceIp', {
                      rules: [{ required: false, message: '请输入请求IP' }]
                    })
                      (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <span className={styles.submitButtons}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleSearchFormReset}>
                      重置
                    </Button>
                  </span>
                </Col>
              </Row>
            </Form>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.showBulkDeleteVisible}>批量删除</Button>
                </span>
              )}

            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={http}
              columns={this.columns}
              rowKey={record => record.id}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandedRowRender={record =>
                <div style={{ margin: 0, padding: 0 }}>
                  <span style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{record.headers.replace(',','\n')}</span>
                </div>}
            />
          </div>
        </Card>
        <Modal
          title="http记录删除"
          destroyOnClose
          visible={deleteVisible}
          {...modalDeleteFooter}
        >
          {getOperateModalContent()}
        </Modal>
        <Modal
          title="批量删除"
          destroyOnClose
          visible={bulkDeleteVisible}
          {...bulkDeleteFooter}
        >
          {getBulkDeleteModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Http;
