import React, { useState } from 'react';
import Card from './Card';
import '../css/index.scss';



let setCurrentMenu;

export const handleChangeMenu = (menu) => {
  if (setCurrentMenu) {
    setCurrentMenu(menu);
  }
};


const Dashboard = () => {
  const [currentMenu, _setCurrentMenu] = useState(null);
  setCurrentMenu = _setCurrentMenu;

  const handleMonoMenuClick = () => {
    setCurrentMenu('mono');
  };

  const handleMultiMenuClick = () => {
    setCurrentMenu('multi');
  };

  return (
    <div className="dashboard">
      {currentMenu === 'multi' ? (
        <div className="multi-menu">
          <div className="header-menu">
            <h6 className="title-menu">Меню мультисайтов</h6>
            <button className="btn-close-multy-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>
            </button>
            </div>
        </div>
      ) : currentMenu === 'mono' ? (
        <div className="mono-menu">

        </div>
      ) : (
        <div className="section">
          <div className="card-section">
            <div className="available-card">
              <button className='one' onClick={handleMonoMenuClick}><Card title="Одиночное добавление сайта" content="" /></button>
              <button className='two' onClick={handleMultiMenuClick}><Card title="Массовое добавление сайтов" content="" /></button>
            </div>
            <button className="unavailable-card">
              <Card title="Временно недоступно" content="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
