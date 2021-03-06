import React, { useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div
        className={`alert alert-${alert.type}`}
        role='alert'
        style={{ marginTop: '110px' }}
      >
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
