import React from 'react';
import Graph from './Graph';
import Stats from './Stats';
import History from './History';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const {t} = useTranslation();
  return (
    <div className="dashboard">
		<div className="container-fluid">
      		<div className="row">
      			<h1>{t('dashboard')}</h1>
	  			<History /> {}
        		<Stats /> {}
				<Graph /> {}
			</div>
		</div>
    </div>
  );
}

export default Dashboard;