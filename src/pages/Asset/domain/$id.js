import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './domainDetail.less';
import Link from 'umi/link';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

@connect(({ domainDetail, loading }) => ({
  domainDetail,
  loading: loading.models.domainDetail,
}))
class AdvancedProfile extends Component {
  state = {
    operationkey: 'ip',
  };

  operationTabList = [
    {
      key: 'ip',
      tab: 'ip列表',
    },
    {
      key: 'vuln',
      tab: '漏洞',
    },
  ];
  
  IPcolumns = [
    {
      title: 'ip',
      dataIndex: 'ip',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text =>
        text === '0' ? (
          <Badge status="error" text="未激活" />
        ) : (
          <Badge status="success" text="在线" />
        ),
    },
    {
      title: '公司',
      dataIndex: 'origin_domain',
    },
   
    {
      title: '端口扫描时间',
      dataIndex: 'port_scan_time',
      render: val => <span>{ !val?'未进行扫描':val }</span>,
    },
  ];

  vulnColumns = [
    {
      title: 'ip',
      dataIndex: 'ip',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text =>
        text === '0' ? (
          <Badge status="error" text="未激活" />
        ) : (
          <Badge status="success" text="在线" />
        ),
    },
    {
      title: '公司',
      dataIndex: 'origin_domain',
    },
   
    {
      title: '端口扫描时间',
      dataIndex: 'port_scan_time',
      render: val =>
        val === '' ? (
          <span>未扫描</span>
        ) : (
          <span>{val}</span>
        ),
    },
  ];

  action = (
    <Button href="../domain">
      <Icon type="left" />返回域名列表
    </Button>
  );

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'domainDetail/fetchDomainDetail',
      payload: { id: match.params.id, method:'domain'}
    });
    dispatch({
      type: 'domainDetail/fetchDomainWebs',
      payload: { domainid: match.params.id, method:'web'}
    });
  };

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  render() {
    const { domainDetail: { name, 
                            status, 
                            originDomain, 
                            vulnNum, 
                            vulnStatus, 
                            webs, 
                            ips, 
                            vulns, 
                            created,
                            modified,
                            web_scan_time,
                            plugin_scan_time}, loading, match } = this.props;
    const { operationkey } = this.state;
    
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="公司">{originDomain}</Description>
        <Description term="漏洞数"><span>高危:{vulnNum.high} </span><span>中危:{vulnNum.mid} </span><span>低:{vulnNum.low}</span></Description>
        <Description term="创建时间">{created}</Description>
        <Description term="漏洞状态"><span>待提交:{vulnStatus.tosubmit} </span><span>已提交:{vulnStatus.submited} </span><span>已忽略:{vulnStatus.ignored}</span></Description>
      </DescriptionList>
    );

    const contentList = {
      ip: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={ips}
          columns={this.IPcolumns}
          rowKey={record => record.id}
        />
      ),
      vuln: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={vulns}
          columns={this.vulnColumns}
        />
      ),
    };

    const getWebDetail = () => { 
      if (webs && webs.length===2){
        return (
          <Card type="inner" title="web信息">
            <DescriptionList size="small" style={{ marginBottom: 16 }} col="1">
              <Description term="url">{webs[0].url}</Description>
              <Description term="banner">{webs[0].banner}</Description>
              <Description term="title">{webs[0].title}</Description>
              <Description term="headers">{webs[0].headers}</Description>
              <Description term="wvs扫描时间">{webs[0].last_wvs_scan_time?webs[0].last_wvs_scan_time:'未扫描'}</Description>
              <Description term="信息泄露扫描时间">{webs[0].last_infoleak_scan_time?webs[0].last_infoleak_scan_time:'未扫描'}</Description>
              <Description term="创建时间">{webs[0].created}</Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} col="1">
              <Description term="url">{webs[1].url}</Description>
              <Description term="banner">{webs[1].banner}</Description>
              <Description term="title">{webs[1].title}</Description>
              <Description term="headers">{webs[1].headers}</Description>
              <Description term="wvs扫描时间">{webs[1].last_wvs_scan_time?webs[0].last_wvs_scan_time:'未扫描'}</Description>
              <Description term="信息泄露扫描时间">{webs[1].last_infoleak_scan_time?webs[0].last_infoleak_scan_time:'未扫描'}</Description>
              <Description term="创建时间">{webs[1].created}</Description>
            </DescriptionList>
          </Card>);
        }
        if (webs && webs.length===1){
          return (
            <Card type="inner" title="web信息">
              <DescriptionList size="small" style={{ marginBottom: 16 }} title="80" col="1">
                <Description term="url">{webs[0].url}</Description>
                <Description term="banner">{webs[0].banner}</Description>
                <Description term="title">{webs[0].title}</Description>
                <Description term="headers">{webs[0].headers}</Description>
                <Description term="wvs扫描时间">{webs[0].last_wvs_scan_time?webs[0].last_wvs_scan_time:'未扫描'}</Description>
                <Description term="信息泄露扫描时间">{webs[0].last_infoleak_scan_time?webs[0].last_infoleak_scan_time:'未扫描'}</Description>
                <Description term="创建时间">{webs[0].created}</Description>
              </DescriptionList>
            </Card>
          )
        }
        
        return (
          <Card type="inner" title="web信息">
            <Description>未检测到web信息</Description>
          </Card>);
      }

    return (
      <PageHeaderWrapper
        title={name}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={this.action}
        content={description}
        // extraContent={extra}
        // tabList={tabList}
      >
        { getWebDetail() }
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={this.operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
