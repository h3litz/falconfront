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
  Badge,
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

const CreateUpdateForm = Form.create()(props => {
  const { current, form, createUpdateVisible, handleCreateUpdateModalVisible, handleSubmit } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSubmit(current, fieldsValue);
    });
  };
  const cancleHandel = () => {
    form.resetFields();
    handleCreateUpdateModalVisible()
  };

  return (
    <Modal
      destroyOnClose
      title={`一级域名${current.name ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      visible={createUpdateVisible}
      onOk={okHandle}
      onCancel={cancleHandel}
    >
      <FormItem label="一级域名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入一级域名' }],
          initialValue: current.name,
        })(<Input placeholder="请输入" style={{ width: "100%" }} />)}
      </FormItem>
      <FormItem label="公司">
        {form.getFieldDecorator('company', {
          rules: [{ required: true, message: '请输入所属公司' }],
          initialValue: current.company,
        })(<Input placeholder="请输入" style={{ width: "100%" }} />)}
      </FormItem>
      <FormItem label="状态">
        {form.getFieldDecorator('status', {
          rules: [{ required: true, message: '状态'}],
          initialValue: current.status,
        })(
          <Select placeholder="请选择" style={{ width: "100%" }}>
            <Option value="0">冻结</Option>
            <Option value="1">上线</Option>
            <Option value="2">下线</Option>
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
class OriginDomain extends PureComponent {
    state = {
        createUpdateVisible: false,
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
            title: '一级域名',
            width: 50,
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(val) {
              return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '公司',
            dataIndex: 'company',
        },
        {
            title: '创建时间',
            dataIndex: 'created',
        
        },
        {
            title: '修改时间',
            dataIndex: 'modified',
            render: val => <span>{ !val?'未进行修改':val }</span>,
        },
        {
          title: '操作',
          render: (match, record) => (
            // const { match } = this.props;
            <Fragment>
              <Link to={ 'originDomain/' + record.id.toString()}>详情</Link>
              <Divider type="vertical" />
              <a onClick={() => this.showEditModal(record)}>修改</a>
              <Divider type="vertical" />
              <a onClick={() => this.showDeleteModal(record)}>删除</a>
            </Fragment>
          ),
        },
    ];
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'asset/fetchOriginDomain',
          payload: {method:'originDomain'},
        });
      }
      
    showModal = () => {
      this.setState({
        createUpdateVisible: true,
      });
    };
  
    showEditModal = (record) => {
      this.setState({
        createUpdateVisible: true,
        current: record,
      });
    };

    handleCreateUpdateModalVisible = flag => {
      this.setState({
        createUpdateVisible: !!flag,
        current: '',
      });
    }
    
    handleSubmit = (current, fieldsValue) => {
      const { dispatch } = this.props;
      const { id = '' } = current;
      if (id){
        dispatch({
          type: 'asset/submitOriginDomain',
          payload: {method:'originDomain', id, ...fieldsValue },
        });
        message.success('添加成功');
        this.handleCreateUpdateModalVisible();
      }else{
        dispatch({
          type: 'asset/submitOriginDomain',
          payload: {method:'originDomain', ...fieldsValue} ,
        });
        message.success('修改成功');
      this.handleCreateUpdateModalVisible();
      };
      dispatch({
        type: 'asset/fetchOriginDomain',
        payload: {method:'originDomain'},
      });
    };

    handleSearch = e => {
      e.preventDefault();
      const { dispatch, form } = this.props;
      const fieldsValue = form.getFieldsValue();
      this.setState({
        formValues: {
          'company':fieldsValue.company,
          'status':fieldsValue.status
      }
      });
      dispatch({
        type: 'asset/fetchOriginDomain',
        payload: {method:'originDomain', ...fieldsValue },
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
        type: 'asset/submitOriginDomain',
        payload: { id ,method:'originDomain'},
      });
      dispatch({
        type: 'asset/fetchOriginDomain',
        payload: {method:'originDomain'},
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
            method:'originDomain',
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'asset/fetchOriginDomain',
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
        type: 'asset/bulkOperateOriginDomain',
        payload: {
          ids: selectedRows.map(row => row.id),
          method:'originDomain'
        }
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchOriginDomain',
        payload: {method:'originDomain'},
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
      let originDomainStatus;
      if (selectedRows.length === 0) return;
      switch (e.key) {
        case 'offline':
        originDomainStatus = 0;
          break;
        case 'online':
        originDomainStatus = 1;
          break;
        default:
          return;
      };
      dispatch({
        type: 'asset/bulkOperateOriginDomain',
        payload: {
          ids: selectedRows.map(row => row.id),
          status: originDomainStatus,
          method:'originDomain'
        }
      });
      this.setState({
        selectedRows: [],
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchOriginDomain',
        payload: {method:'originDomain'},
      });
    };

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };



    render() {
        const {
          asset: { originDomain },
          loading,
          form: { getFieldDecorator },
        } = this.props;
        const {  selectedRows, createUpdateVisible, deleteVisible, bulkDeleteVisible , bulkDeleteDone, current, deleteDone = {} } = this.state;
        
        const parentMethods = {
          handleSubmit: this.handleSubmit,
          handleCreateUpdateModalVisible: this.handleCreateUpdateModalVisible
        };

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
                description="删除域名成功"
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
                description="删除一级域名成功"
                actions={
                  <Button type="primary" onClick={this.handleBulkDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定批量删除一级域名？</p>)
        }

        return (
          <PageHeaderWrapper title="一级域名">
            <Card bordered={false}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                      <FormItem label="一级域名">
                        {getFieldDecorator('search', {
                          rules: [{ required: false, message: '请输入子域名' }]})
                          (<Input placeholder="请输入" style={{ width: '50%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                      <FormItem label="公司">
                        {getFieldDecorator('company', {
                          rules: [{ required: false, message: '请输入子域名' }]})
                          (<Input placeholder="请输入" style={{ width: '50%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                      <FormItem label="状态">
                        {getFieldDecorator('status')(
                          <Select placeholder="请选择" style={{ width: '50%' }}>
                            <Option value="0">冻结</Option>
                            <Option value="1">上线</Option>
                            <Option value="2">下线</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
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
                  data={originDomain}
                  columns={this.columns}  
                  rowKey={record => record.id}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}             
                />
              </div>
            </Card>
            <CreateUpdateForm current={current} createUpdateVisible={createUpdateVisible} {...parentMethods} />
            <Modal
              title="删除一级域名"
              destroyOnClose
              visible={deleteVisible}
              {...modalDeleteFooter}
            >
              {getDeleteModalContent()}
            </Modal>
            <Modal
              title="批量删除一级域"
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

export default OriginDomain;
