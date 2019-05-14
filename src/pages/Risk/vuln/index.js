import React, { PureComponent } from 'react';
import { connect } from 'dva';
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
const statusMap = ['red', 'processing', 'green', 'default'];
const status = ['未提交', '已提交', '确认', '误报'];
const vulnLevelMap = ['default', 'green', 'yellow', 'red'];
const vulnLevel = ['低危', '中危', '高危', '严重'];

@connect(({ risk, asset, loading }) => ({
  risk, asset,
  loading: loading.models.risk,
}))
@Form.create()
class Vuln extends PureComponent {
  state = {
    deleteVisible: false,
    deleteDone: false,
    bulkDeleteVisible: false,
    bulkDeleteDone: false,
    selectedRows: [],
    formValues: {},
    // current: {},
    operateKey: '',
    operateId: '',
  };

  columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: '影响',
      dataIndex: 'affects',
      render(val) {
        return <a href={val} rel="noopener noreferrer" target="_Blank">{val}</a>;
      },
    },
    {
      title: '公司',
      dataIndex: 'origin_domain',
    },
    {
      title: '等级',
      dataIndex: 'severity',
      render(val) {
        return <Badge status={vulnLevelMap[val]} text={vulnLevel[val]} />;
      },

    },
    {
      title: '漏洞状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (record) => (
        <Dropdown overlay={
          <Menu onClick={this.showDeleteModal} selectedKeys={[]}>
            <Menu.Item key="posted">提交</Menu.Item>
            <Menu.Item key="fixed">确认</Menu.Item>
            <Menu.Item key="ignored">忽略</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>}
        >
          <a href="#" onClick={this.setOperateId(record)}>
            操作 <Icon type="down" />
          </a>
        </Dropdown>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'risk/fetchVuln',
      payload: {
        method: 'vuln'
      },
    });
    dispatch({
      type: 'asset/fetchOriginDomain',
      payload: {
        method: 'originDomain'
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
        'status': fieldsValue.status,
        'severity': fieldsValue.severity,
        'origin_domain': fieldsValue.originDomain,
      }
    });
    dispatch({
      type: 'risk/fetchVuln',
      payload: { method: 'vuln', ...fieldsValue },
    });
  };

  handleSearchFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
  };

  showDeleteModal = (e) => {
    this.setState({
      deleteVisible: true,
      operateKey: e.key,
      deleteDone: false,
    });
  };

  handleDeleteCancel = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      deleteVisible: false,
    });
  };

  handleDeleteDone = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      deleteDone: true,
      deleteVisible: false,
    });
  };

  setOperateId = (record) => {
    this.setState({
      operateId: record.id,
    });
    ;
  }

  handleSingleClick = () => {
    const { dispatch } = this.props;
    const { operateId, operateKey } = this.state;
    let VulnStatus;
    switch (operateKey) {
      case 'delete':
        break
      case 'posted':
        VulnStatus = 1;
        break;
      case 'fixed':
        VulnStatus = 2;
        break;
      case 'ignored':
        VulnStatus = 3;
        break;
      default:
        return;
    };
    if (operateKey === 'delete') {
      dispatch({
        type: 'risk/bulkOperateVuln',
        payload: {
          ids: [operateId],
          method: 'vuln'
        }
      });
    } else {
      dispatch({
        type: 'risk/bulkOperateVuln',
        payload: {
          ids: [operateId],
          status: VulnStatus,
          method: 'vuln'
        }
      });
    }
    this.setState({
      deleteDone: true,
    });
    dispatch({
      type: 'risk/fetchVuln',
      payload: { method: 'vuln' },
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
      method: 'vuln',
      ...formValues,
      ...filters,

    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'risk/fetchVuln',
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
      type: 'risk/bulkOperateVuln',
      payload: {
        ids: selectedRows.map(row => row.id),
        method: 'vuln'
      }
    });
    message.success('操作成功');
    dispatch({
      type: 'risk/fetchVuln',
      payload: { method: 'vuln' },
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

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    let VulnStatus;
    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'undeal':
        VulnStatus = 0;
        break
      case 'posted':
        VulnStatus = 1;
        break;
      case 'fixed':
        VulnStatus = 2;
        break;
      case 'ignored':
        VulnStatus = 3;
        break;
      default:
        return;
    };
    dispatch({
      type: 'risk/bulkOperateVuln',
      payload: {
        ids: selectedRows.map(row => row.id),
        status: VulnStatus,
        method: 'vuln'
      }
    });
    this.setState({
      selectedRows: [],
    });
    message.success('操作成功');
    dispatch({
      type: 'risk/fetchVuln',
      payload: { method: 'vuln' },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };



  render() {
    const {
      risk: { vuln },
      asset: { originDomain },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { selectedRows, deleteVisible, bulkDeleteVisible, bulkDeleteDone, deleteDone = {} } = this.state;


    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="posted">批量提交</Menu.Item>
        <Menu.Item key="ignored">批量忽略</Menu.Item>
        <Menu.Item key="fixed">批量修复</Menu.Item>
        <Menu.Item key="default">批量重置</Menu.Item>
      </Menu>
    );

    const modalDeleteFooter = deleteDone
      ? { footer: null, onCancel: this.handleDeleteDone }
      : { okText: '更新', onOk: this.handleSingleClick, onCancel: this.handleDeleteCancel };

    const bulkDeleteFooter = bulkDeleteDone
      ? { footer: null, onCancel: this.handelBulkDeleteDone }
      : { okText: '删除', onOk: this.handleBulkDelete, onCancel: this.handelBulkDeleteCancel };


    const getOperateModalContent = () => {
      if (deleteDone) {
        return (
          <Result
            type="success"
            title="更新成功"
            description="更新漏洞成功"
            actions={
              <Button type="primary" onClick={this.handleDeleteDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (<p>确定更新该漏洞？</p>)
    }

    const getBulkDeleteModalContent = () => {
      if (bulkDeleteDone) {
        return (
          <Result
            type="success"
            title="删除成功"
            description="删除漏洞成功"
            actions={
              <Button type="primary" onClick={this.handleBulkDeleteDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (<p>确定批量删除漏洞？</p>)
    }

    return (
      <PageHeaderWrapper title="漏洞列表">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="搜索">
                    {getFieldDecorator('search', {
                      rules: [{ required: false, message: '请输入' }]
                    })
                      (<Input placeholder="请输入" style={{ width: '100%' }} />)}
                  </FormItem>
                </Col>
                <Col md={4} sm={24}>
                  <FormItem label="公司">
                    {getFieldDecorator('originDomain', {
                      rules: [{ required: false, message: '公司' }]
                    })
                      (
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          {originDomain.results.map(d => <Option key={d.id}>{d.name}</Option>)}
                        </Select>
                      )}
                  </FormItem>
                </Col>
                <Col md={4} sm={24}>
                  <FormItem label="等级">
                    {getFieldDecorator('severity', {
                      rules: [{ required: false, message: '等级' }]
                    })
                      (
                        <Select placeholder="" style={{ width: '100%' }}>
                          <Option value="0">低危</Option>
                          <Option value="1">中危</Option>
                          <Option value="2">高危</Option>
                          <Option value="3">严重</Option>
                        </Select>)}
                  </FormItem>
                </Col>
                <Col md={4} sm={24}>
                  <FormItem label="状态">
                    {getFieldDecorator('status', {
                      rules: [{ required: false, message: '状态' }]
                    })
                      (
                        (
                          <Select placeholder="" style={{ width: '100%' }}>
                            <Option value="0">未处理</Option>
                            <Option value="1">已提交</Option>
                            <Option value="2">已确认</Option>
                            <Option value="3">误报</Option>
                          </Select>))}
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
              data={vuln}
              columns={this.columns}
              rowKey={record => record.id}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandedRowRender={record =>
                <div style={{ margin: 0, padding: 0 }}>
                  <span style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{record.request}</span>
                  <Divider />
                  <span style={{ margin: 0 }}>漏洞发现时间: {record.created} <Divider type="vertical" /> 漏洞更新时间: {record.modified} <Divider type="vertical" /> 来源: {record.modulename}</span>
                </div>}
            />
          </div>
        </Card>
        <Modal
          title="漏洞更新"
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

export default Vuln;
