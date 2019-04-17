import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, domainCount, domainTodayCount, ipCount, ipTodayCount, webCount, webTodayCount, portCount,portTodayCount, vulnCount, vulnValidRate, vulnValidCount }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.domain-count" defaultMessage="domain-count" />}
        loading={loading}
        total={domainCount}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-new-increased-domain" defaultMessage="Daily Sales" />}
            value={domainTodayCount}
          />
        }
        contentHeight={46}
      />
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="app.analysis.ip-count" defaultMessage="ip-count" />}
        total={ipCount}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-new-increased-ip" defaultMessage="Daily Sales" />}
            value={ipTodayCount}
          />
        }
        contentHeight={46}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="app.analysis.port-count" defaultMessage="port-count" />}
        total={portCount}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-new-increased-port" defaultMessage="Daily Sales" />}
            value={portTodayCount}
          />
        }
        contentHeight={46}
      >
        {/* <MiniBar data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="app.analysis.vulnValidRate"
            defaultMessage="Operational Effect"
          />
        }
        total={()=><span>{vulnValidRate}%</span>}
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              <FormattedMessage id="app.analysis.vuln-valid-count" defaultMessage="Weekly Changes" />
              <span className={styles.trendText}>{vulnValidCount}</span>
              
            </Trend>
            <Trend flag="up">
              <FormattedMessage id="app.analysis.vuln-count" defaultMessage="Weekly Changes" />
              <span className={styles.trendText}>{vulnCount}</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      />
    </Col>
  </Row>
));

export default IntroduceRow;
