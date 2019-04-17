import React, { PureComponent, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import Link from 'umi/link';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Badge,
  Dropdown,
  Menu,
  Modal,
  message,
  Divider,
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
const statusMap = ['error', 'success', 'default'];
const status = ['冻结', '在线', '下线'];


@connect(({ asset, loading }) => ({
    asset,
    loading: loading.models.asset,
  }))
@Form.create()
class Web extends PureComponent {
    state = {
        deleteVisible: false,
        deleteDone: false,
        bulkDeleteVisible: false,
        bulkDeleteDone: false,
        selectedRows: [],
        formValues: {},
        current: {},
      };

    columns = [
        {
            title: 'url',
            width: 50,
            dataIndex: 'url',
            fixed: 'left',
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            fixed: 'left',
        },
        {
            title: 'banner',
            dataIndex: 'banner',
        },
        {
            title: 'headers',
            // width: 100,
            dataIndex: 'headers',
        
        },
        {
          title: '一级域名',
          width: 100,
          fixed: 'right',
          dataIndex: 'origin_domain',
        },
        {
          title: 'wvs扫描',
          width: 150,
          fixed: 'right',
          dataIndex: 'last_wvs_scan_time',
          render: val => <span>{ !val?'未进行扫描':val }</span>,
        },
        {
          title: '信息泄露扫描',
          width: 150,
          fixed: 'right',
          dataIndex: 'last_infoleak_scan_time',
          render: val => <span>{ !val?'未进行扫描':val }</span>,
        },
        {
          title: '操作',
          fixed: 'right',
          render: (match, record) => (
            <Fragment>
              <Link to={ 'web/' + record.id.toString()}>详情</Link>
              <Divider type="vertical" />
              {/* <a onClick={() => this.showEditModal(record)}>修改</a> */}
              <Divider type="vertical" />
              <a onClick={() => this.showDeleteModal(record)}>删除</a>
            </Fragment>
          ),
        },
    ];
    
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'asset/fetchWeb',
        payload: {
          method:'web'
        },
      });
    };
      
    handleSearch = e => {
      e.preventDefault();
      const { dispatch, form } = this.props;
      const fieldsValue = form.getFieldsValue();
      this.setState({
        formValues: {
          'search':fieldsValue.search,
          'ip':fieldsValue.ip,
          'domain':fieldsValue.domain,
          'origin_domain':fieldsValue.origin_domain,
      }
      });
      dispatch({
        type: 'asset/fetchWeb',
        payload: {method:'web', ...fieldsValue },
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
        current: record,
      });
    };

    handleDeleteCancel = () => {
      setTimeout(() => this.addBtn.blur(), 0);
      this.setState({
        deleteVisible: false,
      });
    };

    handleDeleteDone = () => {
      setTimeout(() => this.addBtn.blur(), 0);
      this.setState({
        deleteDone: true,
        deleteVisible: false,
      });
    };

    handleDeleteItem = () => {
      const { dispatch } = this.props;
      const { current: { id } }= this.state;
      this.setState({
        deleteDone: true,
      });
      dispatch({
        type: 'asset/submitWeb',
        payload: { method:'web', id },
      });
      dispatch({
        type: 'asset/fetchWeb',
        payload: { method:'web' },
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
            ...formValues,
            ...filters,
            method:'web'
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'asset/fetchWeb',
            payload: params,
        });
    };

    showBuldDeleteVisible = () => {
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
        type: 'asset/bulkOperateWeb',
        payload: {
          ids: selectedRows.map(row => row.id),
          method:'web'
        }
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchWeb',
        payload: {method:'web'},
      });
    };

    handleBulkDeleteDone = () => {
      this.setState({
        bulkDeleteDone: true,
        bulkDeleteVisible: false
      });
    };

    handelBulkDeleteCancel = () =>{
      this.setState({
        bulkDeleteVisible: false
      })
    };

    handleMenuClick = e => {
      const { dispatch } = this.props;
      const { selectedRows } = this.state;
      let IPStatus;
      if (selectedRows.length === 0) return;
      switch (e.key) {
        case 'offline':
          IPStatus = 0;
          break;
        case 'online':
          IPStatus = 1;
          break;
        default:
          return;
      };
      dispatch({
        type: 'asset/bulkOperateWeb',
        payload: {
          ids: selectedRows.map(row => row.id),
          status: IPStatus,
          method:'web'
        }
      });
      this.setState({
        selectedRows: [],
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchWeb',
        payload: {method:'web'},
      });
    };

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };



    render() {
        const {
          asset: { web },
          loading,
          form: { getFieldDecorator },
        } = this.props;
        const {  selectedRows, createUpdateVisible, deleteVisible, bulkDeleteVisible , bulkDeleteDone, current, deleteDone = {} } = this.state;
      

        const menu = (
          <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
            <Menu.Item key="offline">批量下线</Menu.Item>
            <Menu.Item key="online">批量上线</Menu.Item>
          </Menu>
        );

        const modalDeleteFooter = deleteDone
        ? { footer: null, onCancel: this.handleDeleteDone }
        : { okText: '删除', onOk: this.handleDeleteItem, onCancel: this.handleDeleteCancel };

        const bulkDeleteFooter = bulkDeleteDone
        ? { footer: null, onCancel: this.handelBulkDeleteDone }
        : { okText: '删除', onOk: this.handleBulkDelete, onCancel: this.handelBulkDeleteCancel };


        const getDeleteModalContent = () => {
          if (deleteDone) {
            return (
              <Result
                type="success"
                title="删除成功"
                description="删除web成功"
                actions={
                  <Button type="primary" onClick={this.handleDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定删除该web？</p>)
        }

        const getBulkDeleteModalContent = () => {
          if (bulkDeleteDone) {
            return (
              <Result
                type="success"
                title="删除成功"
                description="删除web成功"
                actions={
                  <Button type="primary" onClick={this.handleBulkDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定批量删除web？</p>)
        }

        return (
          <PageHeaderWrapper title="web列表">
            <Card bordered={false}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                      <FormItem label="搜索">
                        {getFieldDecorator('search', {
                          rules: [{ required: false, message: '请输入' }]})
                          (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                      <FormItem label="IP">
                        {getFieldDecorator('ip', {
                          rules: [{ required: false, message: 'ip' }]})
                          (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                      <FormItem label="域名">
                        {getFieldDecorator('domain', {
                          rules: [{ required: false, message: '域名' }]})
                          (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                      <FormItem label="一级域名">
                        {getFieldDecorator('origin_domain', {
                          rules: [{ required: false, message: '一级域名' }]})
                          (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
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
                      <Button onClick={this.showBuldDeleteVisible}>批量删除</Button>
                      <Dropdown overlay={menu}>
                        <Button>
                          更多操作 <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </span>
                  )}

                </div>
                <StandardTable
                  selectedRows={selectedRows}
                  loading={loading}
                  data={web}
                  columns={this.columns}  
                  rowKey={record => record.id}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                  scroll={{ x: 2000 }}          
                />
              </div>
            </Card>
            <Modal
              title="删除web"
              destroyOnClose
              visible={deleteVisible}
              {...modalDeleteFooter}
            >
              {getDeleteModalContent()}
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

export default Web;
