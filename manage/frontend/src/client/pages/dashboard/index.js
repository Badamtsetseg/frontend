import React from 'react';
import {Card} from 'antd';
import {inject, observer} from 'mobx-react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

const Dashboard = inject('dashboardStore')
(observer((
  {
    dashboardStore
  }) => {
  return (
    <PageHeaderWrapper
      title='Хянах самбар'
      content={
        <p>Astvision starter manage</p>
      }
    >
      <Card>
        TODO
      </Card>
    </PageHeaderWrapper>
  );
}));

export default Dashboard;
