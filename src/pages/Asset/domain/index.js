import React, { PureComponent, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
// import moment from 'moment';
import Link from 'umi/link';
import router from 'umi/router';
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
  const { originDomain, current, form, createUpdateVisible, handleCreateUpdateModalVisible, handleSubmit } = props;
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
      title={`子域名${current.name ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      visible={createUpdateVisible}
      onOk={okHandle}
      onCancel={cancleHandel}
    >
      <FormItem label="子域名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入子域名' }],
          initialValue: current.name,
        })(<Input placeholder="请输入" style={{ width: "100%" }} />)}
      </FormItem>
      <FormItem label="一级域名">
        {form.getFieldDecorator('origin_domain', {
          rules: [{ required: true, message: '请输入一级域名' }],
          initialValue: current.origin_domain,
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
class Domain extends PureComponent {
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
            title: '域名',
            width: 50,
            dataIndex: 'name',
        },
        {
            title: '解析IP',
            dataIndex: 'ips',
            render: val => <span>{val.map(function getIPList(ip){ return ip.ip}).join(',')}</span>
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(val) {
              return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '一级域名',
            dataIndex: 'origin_domain',
        },
        {
            title: '最近web扫描',
            dataIndex: 'web_scan_time',
            render: val => <span>{ !val?'未进行扫描':val }</span>,
        
        },
        {
            title: '最近插件扫描',
            dataIndex: 'plugin_scan_time',
            render: val => <span>{ !val?'未进行扫描':val }</span>,
        },
        {
          title: '操作',
          render: (match, record) => (
            // const { match } = this.props;
            <Fragment>
              <Link to={ 'domain/' + record.id.toString()}>详情</Link>
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
          type: 'asset/fetchDomain',
          payload: { method:'domain' },
        });
        dispatch({
          type: 'asset/fetchOriginDomain',
          payload: { method:'originDomain' },
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
          type: 'asset/submitDomain',
          payload: {id, method:'domain', ...fieldsValue },
        });
        message.success('添加成功');
        this.handleCreateUpdateModalVisible();
      }else{
        dispatch({
          type: 'asset/submitDomain',
          payload: {method:'domain', ...fieldsValue} ,
        });
        message.success('修改成功');
      this.handleCreateUpdateModalVisible();
      }
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
          'originDomain':fieldsValue.originDomain,
          'status':fieldsValue.status
      }
      });
      dispatch({
        type: 'asset/fetchDomain',
        payload: {method:'domain', ...fieldsValue },
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
        type: 'asset/submitDomain',
        payload: { id ,method:'domain'},
      });
      dispatch({
        type: 'asset/fetchDomain',
        payload: {method:'domain'},
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
            method:'domain',
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'asset/fetchDomain',
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
        type: 'asset/bulkOperateDomain',
        payload: {
          ids: selectedRows.map(row => row.id),
          method:'domain'
        }
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchDomain',
        payload: {method:'domain'},
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
      let domainStatus;
      if (selectedRows.length === 0) return;
      switch (e.key) {
        case 'offline':
          domainStatus = 0;
          break;
        case 'online':
          domainStatus = 1;
          break;
        default:
          return;
      };
      dispatch({
        type: 'asset/bulkOperateDomain',
        payload: {
          ids: selectedRows.map(row => row.id),
          status: domainStatus,
          method:'domain'
        }
      });
      this.setState({
        selectedRows: [],
      });
      message.success('操作成功');
      dispatch({
        type: 'asset/fetchDomain',
        payload: {method:'domain'},
      });
    };

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };



    render() {
        const {
          asset: { domain, originDomain },
          loading,
          form: { getFieldDecorator },
        } = this.props;
        const {  selectedRows, createUpdateVisible, deleteVisible, bulkDeleteVisible , bulkDeleteDone, current, deleteDone = {} } = this.state;
        
        // this.columns[2].filters = originDomain.results.map(function getOriginDomainList(k){return {text:k.name,value:k.id}});

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
          <PageHeaderWrapper title="子域名">
            <Card bordered={false}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                      <FormItem label="域名">
                        {getFieldDecorator('search', {
                          rules: [{ required: false, message: '请输入子域名' }]})
                          (<Input placeholder="请输入" style={{ width: '50%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                      <FormItem label="一级域名">
                        {getFieldDecorator('originDomain', {
                          rules: [{ required: false, message: '请输入子域名' }]})(
                            <Select placeholder="请选择" style={{ width: '50%' }}>
                              {originDomain.results.map(d => <Option key={d.id}>{d.name}</Option>)}
                            </Select>
                          )}
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
                  data={domain}
                  columns={this.columns}  
                  rowKey={record => record.id}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}             
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

export default Domain;
