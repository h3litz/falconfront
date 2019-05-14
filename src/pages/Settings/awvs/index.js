import React, { PureComponent, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
// import Link from 'umi/link';
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
const statusMap = ['error', 'success'];
const status = ['离线', '在线'];

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
      title={`awvs api${current.name ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      visible={createUpdateVisible}
      onOk={okHandle}
      onCancel={cancleHandel}
    >
      <FormItem label="url">
        {form.getFieldDecorator('url', {
          rules: [{ required: true, message: '请输入url' }],
          initialValue: current.url,
        })(<Input placeholder="请输入" style={{ width: "100%" }} />)}
      </FormItem>
      <FormItem label="secret">
        {form.getFieldDecorator('secret', {
          rules: [{ required: true, message: 'api key' }],
          initialValue: current.secret,
        })(<Input placeholder="请输入" style={{ width: "100%" }} />)}
      </FormItem>
      <FormItem label="status">
        {form.getFieldDecorator('status', {
          rules: [{ required: true, message: '状态' }],
          initialValue: current.status,
        })(
          <Select placeholder="请选择" style={{ width: "100%" }}>
            <Option value="0">离线</Option>
            <Option value="1">在线</Option>
          </Select>)}
      </FormItem>
    </Modal>
  );
});


@connect(({ scansettings, loading }) => ({
  scansettings,
    loading: loading.models.scansettings,
  }))
@Form.create()
class awvs extends PureComponent {
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
            title: '地址',
            // width: 50,
            dataIndex: 'url',
        },
        {
            title: 'apikey',
            dataIndex: 'secret',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(val) {
              return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created',
        },
        {
            title: '更新时间',
            dataIndex: 'modified',
            render: val => <span>{ !val?'未进行检查':val }</span>,
        
        },
        {
          title: '操作',
          render: (match, record) => (
            // const { match } = this.props;
            <Fragment>
              {/* <Link to={ 'awvs/' + record.id.toString()}>详情</Link> */}
              {/* <Divider type="vertical" /> */}
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
          type: 'scansettings/fetchAwvs',
          payload: { method:'awvs' },
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
          type: 'scansettings/submitAwvs',
          payload: {id, method:'awvs', ...fieldsValue },
        });
        message.success('添加成功');
        this.handleCreateUpdateModalVisible();
      }else{
        dispatch({
          type: 'scansettings/submitAwvs',
          payload: {method:'awvs', ...fieldsValue} ,
        });
        message.success('修改成功');
      this.handleCreateUpdateModalVisible();
      }
      dispatch({
        type: 'scansettings/fetchAwvs',
        payload: {method:'awvs'},
      });
    };

    handleSearch = e => {
      e.preventDefault();
      const { dispatch, form } = this.props;
      const fieldsValue = form.getFieldsValue();
      this.setState({
        formValues: {
          'search':fieldsValue.search,
          'status':fieldsValue.status
      }
      });
      dispatch({
        type: 'scansettings/fetchAwvs',
        payload: {method:'awvs', ...fieldsValue },
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
        type: 'scansettings/submitAwvs',
        payload: { id ,method:'awvs'},
      });
      dispatch({
        type: 'scansettings/fetchAwvs',
        payload: {method:'awvs'},
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
            method:'awvs',
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'scansettings/fetchAwvs',
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
        type: 'scansettings/bulkOperateAwvs',
        payload: {
          ids: selectedRows.map(row => row.id),
          method:'awvs'
        }
      });
      message.success('操作成功');
      dispatch({
        type: 'scansettings/fetchAwvs',
        payload: {method:'awvs'},
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
      let awvsStatus;
      if (selectedRows.length === 0) return;
      switch (e.key) {
        case 'offline':
          awvsStatus = 0;
          break;
        case 'online':
          awvsStatus = 1;
          break;
        default:
          return;
      };
      dispatch({
        type: 'scansettings/bulkOperateAwvs',
        payload: {
          ids: selectedRows.map(row => row.id),
          status: awvsStatus,
          method:'awvs'
        }
      });
      this.setState({
        selectedRows: [],
      });
      message.success('操作成功');
      dispatch({
        type: 'scansettings/fetchawvs',
        payload: {method:'awvs'},
      });
    };

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };



    render() {
        const {
          scansettings: { awvs },
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
                description="删除awvs节点成功"
                actions={
                  <Button type="primary" onClick={this.handleDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定删除该节点？</p>)
        }

        const getBulkDeleteModalContent = () => {
          if (bulkDeleteDone) {
            return (
              <Result
                type="success"
                title="删除成功"
                description="删除awvs节点成功"
                actions={
                  <Button type="primary" onClick={this.handleBulkDeleteDone}>
                    知道了
                  </Button>
                }
                className={styles.formResult}
              />
            );
          }
          return (<p>确定批量删除节点？</p>)
        }

        return (
          <PageHeaderWrapper title="awvs节点">
            <Card bordered={false}>
              <div className={styles.tableListForm}>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="节点">
                        {getFieldDecorator('search', {
                          rules: [{ required: false, message: '请输入' }]})
                          (<Input placeholder="请输入" style={{ width: '50%' }} />)}
                      </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
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
                  data={awvs}
                  columns={this.columns}  
                  rowKey={record => record.id}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}             
                />
              </div>
            </Card>
            <CreateUpdateForm current={current} createUpdateVisible={createUpdateVisible} {...parentMethods} />
            <Modal
              title="删除节点"
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

export default awvs;
