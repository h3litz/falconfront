import React, { memo } from 'react';
import { Card } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { Bar } from '@/components/Charts';

const VulnsCard = memo(
  ({ vulnDateCount, loading }) => (
    <Card 
      loading={loading} 
      bordered={false} 
      bodyStyle={{ padding: 24 }}
      style={{ marginBottom: 24 }} 
    >
     
      <div className={styles.salesBar}>
        <Bar
          height={295}
          title={
            <FormattedMessage
              id="app.analysis.vuln-month-count"
              defaultMessage="Vuln Trend"
            />
          }
          data={vulnDateCount}
        />
      </div>
    </Card>
  )
);

export default VulnsCard;
