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
// const statusMap = ['error', 'success', 'default'];
// const status = ['冻结', '在线', '下线'];

const CreateUpdateForm = Form.create()(props => {
  const { originDomain, form, createUpdateVisible, handleCreateUpdateModalVisible, handleSubmit } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSubmit(fieldsValue);
    });
  };
  const cancleHandel = () => {
    form.resetFields();
    handleCreateUpdateModalVisible()
  };

  return (
    <Modal
      destroyOnClose
      title='泛解析域名添加'
      className={styles.standardListForm}
      visible={createUpdateVisible}
      onOk={okHandle}
      onCancel={cancleHandel}
    >
      <FormItem label="域名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入子域名' }],
        })(<Input placeholder="请输入" style={{ width: "100%" }} />)}
      </FormItem>
      <FormItem label="一级域名">
        {form.getFieldDecorator('origin_domain', {
          rules: [{ required: true, message: '请输入一级域名' }],
        })(
          <Select placeholder="请选择" style={{ width: "100%" }}>
            {originDomain.results.map(d => <Option key={d.name}>{d.name}</Option>)}
          </Select>)}
      </FormItem>
    </Modal>
  );
});


@connect(({ asset, loading }) => ({
    asset,
    loading: loading.models.asset,
  }))
@Form.create()
class CdnDomain extends PureComponent {
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
            title: '域名',
            dataIndex: 'name',
        },
        {
          title: '一级域名',
          dataIndex: 'origin_domain',
        },
        {
          title: '创建时间',
          dataIndex: 'created',
        },
        {
          title: '修改时间',
          dataIndex: 'modified',
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
        type: 'asset/fetchCdn',
        payload: {
          method:'cdn'
        },
      });
      dispatch({
        type: 'asset/fetchOriginDomain',
        payload: { method:'originDomain','pageSize':'1000' },
      });
    };

    showModal = () => {
      this.setState({
        createUpdateVisible: true,
      });
    };
      
    handleCreateUpdateModalVisible = flag => {
      this.setState({
        createUpdateVisible: !!flag,
        current: '',
      });
    }

    handleSubmit = (fieldsValue) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'asset/submitCdn',
        payload: { method:'cdn', ...fieldsValue },
      });
      message.success('添加成功');
      this.handleCreateUpdateModalVisible();

      dispatch({
        type: 'asset/fetchDomain',
        payload: {method:'domain'},
      });
    };

    handleSearch = e => {
      e.preventDefault();
      const { dispatch, form } = this.props;
      const fieldsValue = form.getFieldsValue();
      this.setState({
        formValues: {
          'search':fieldsValue.search,
          'originDomain':fieldsValue.originDomain,
      }
      });
      dispatch({
        type: 'asset/fetchCdn',
        payload: {method:'cdn', ...fieldsValue },
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
      this.setState({
        deleteVisible: false,
      });
    };

    handleDeleteDone = () => {
      this.setState({
        deleteDone: true,
        deleteVisible: false,
        current: '',
      });
    };

    handleDeleteItem = () => {
      const { dispatch } = this.props;
      const { current: { id } }= this.state;
      this.setState({
        deleteDone: true,
      });
      dispatch({
        type: 'asset/submitCdn',
        payload: { method:'cdn', id },
      });
      dispatch({
        type: 'asset/fetchCdn',
        payload: { method:'cdn' },
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
            method:'cdn'
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'asset/fetchCdn',
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
        type: 'asset/bulkOperateCdn',
        payload: {
          ids: selectedRows.map(row => row.id),
          method:'cdn'
        }
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchCdn',
        payload: {method:'cdn'},
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
        type: 'asset/bulkOperateCdn',
        payload: {
          ids: selectedRows.map(row => row.id),
          status: IPStatus,
          method:'cdn'
        }
      });
      this.setState({
        selectedRows: [],
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchCdn',
        payload: {method:'cdn'},
      });
    };

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };



    render() {
        const {
          asset: { cdndomain, originDomain },
          loading,
          form: { getFieldDecorator },
        } = this.props;
        const {  selectedRows, createUpdateVisible, deleteVisible, bulkDeleteVisible , bulkDeleteDone, current, deleteDone = {} } = this.state;
      
        const parentMethods = {
          handleSubmit: this.handleSubmit,
          handleCreateUpdateModalVisible: this.handleCreateUpdateModalVisible
        };

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
                description="删除泛解析域名成功"
                actions={
                  <Button type="primary" onClick={this.handleDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定删除该域名？</p>)
        }

        const getBulkDeleteModalContent = () => {
          if (bulkDeleteDone) {
            return (
              <Result
                type="success"
                title="删除成功"
                description="删除域名成功"
                actions={
                  <Button type="primary" onClick={this.handleBulkDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定批量删除域名？</p>)
        }

        return (
          <PageHeaderWrapper title="泛解析域名列表">
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
                    <Col md={6} sm={24}>
                      <FormItem label="一级域名">
                        {getFieldDecorator('originDomain', {
                          rules: [{ required: false, message: '一级域名' }]})
                          (
                            <Select placeholder="请选择" style={{ width: '100%' }}>
                              {originDomain.results.map(d => <Option key={d.id}>{d.name}</Option>)
                              }
                            </Select>)}
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
                  <Button 
                    icon="plus" 
                    type="primary" 
                    onClick={() => this.showModal()}
                    ref={component => {
                      /* eslint-disable */
                      this.addBtn = findDOMNode(component);
                      /* eslint-enable */
                  }}
                  >
                    新建
                  </Button>
                  {selectedRows.length > 0 && (
                    <span>
                      <Button onClick={this.showBuldDeleteVisible}>批量删除</Button>
                      {/* <Dropdown overlay={menu}>
                        <Button>
                          更多操作 <Icon type="down" />
                        </Button>
                      </Dropdown> */}
                    </span>
                  )}
                </div>
                <StandardTable
                  selectedRows={selectedRows}
                  loading={loading}
                  data={cdndomain}
                  columns={this.columns}  
                  rowKey={record => record.id}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                  scroll={{ x: 2000 }}          
                />
              </div>
            </Card>
            <CreateUpdateForm originDomain={originDomain} current={current} createUpdateVisible={createUpdateVisible} {...parentMethods} />
            <Modal
              title="删除域名"
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

export default CdnDomain;
