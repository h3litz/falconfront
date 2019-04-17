import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
// import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const VulnsCard = React.lazy(() => import('./VulnsCard'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { chart, loading } = this.props;
    const {
      domainCount,
      domainTodayCount,
      ipCount,
      ipTodayCount,
      webCount,
      webTodayCount,
      portCount,
      portTodayCount,
      vulnCount,
      vulnValidRate,
      vulnValidCount,
      vulnDateCount,
      vulnCateCount,
    } = chart;

    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow 
            loading={loading} 
            domainCount={domainCount} 
            domainTodayCount={domainTodayCount} 
            ipCount={ipCount} 
            ipTodayCount={ipTodayCount} 
            webCount={webCount} 
            webTodayCount={webTodayCount} 
            portCount={portCount} 
            portTodayCount={portTodayCount} 
            vulnCount={vulnCount} 
            vulnValidRate={vulnValidRate} 
            vulnValidCount={vulnValidCount} 
          />
        </Suspense>
        <Suspense fallback={null}>
          <VulnsCard
            vulnDateCount={vulnDateCount}
            isActive={this.isActive}
            loading={loading}
          />
        </Suspense>
      </GridContent>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Analysis {...props} />
  </AsyncLoadBizCharts>
);
