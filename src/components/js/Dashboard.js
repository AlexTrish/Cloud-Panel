import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { API, TOKEN_API } from '../../App'
import Card from './Card';
import '../css/index.scss';
import Example from './modal/mono-modal';
import AddSitesModal from './modal/multi-modal';
import DeleteConfirmationModal from './modal/DeleteConfirmationModal';

let setCurrentMenu;

export const handleChangeMenu = (menu) => {
  if (setCurrentMenu) {
    setCurrentMenu(menu);
  }
};

export const handleSiteListClick = () => {
  if (setCurrentMenu) {
    setCurrentMenu('serv');
  }
};

export const handleSiteDnsMenu = () => {
  if (setCurrentMenu) {
    setCurrentMenu('dns');
  }
};

const Dashboard = ( TOKEN_API, API ) => {
  const { t } = useTranslation();
  const [currentMenu, _setCurrentMenu] = useState(() => {
    return localStorage.getItem('currentMenu') || null;
  });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMonoModal, setShowMonoModal] = useState(false);
  const [showMultiModal, setShowMultiModal] = useState(false);
  const [sitesData, setSitesData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [subdomainInput, setSubdomainInput] = useState('');
  setCurrentMenu = _setCurrentMenu;


  const fetchSitesData = async () => {
    try {
      const response = await fetch( API + 'api/me/sites', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${TOKEN_API}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setSitesData(result);
        console.log(result);
      } else {
        console.error('Ошибка при получении сайтов:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };
  

  useEffect(() => {
    fetchSitesData();
  }, []);

  // функции открытия и закрытия модалок
  const handleShowMonoModal = () => {
    setShowMonoModal(true);
  };

  const handleCloseMonoModal = async () => {
    setShowMonoModal(false);
    await fetchSitesData();
  };

  const handleCloseMultiModal = async () => {
    setShowMultiModal(false);
    await fetchSitesData();
  };

  const handleSaveSites = (sites) => {
    setSitesData(sites);
    setShowMultiModal(false);
  };

  const handleOpenDelModal = (site) => {
    setSelectedSite(site);
    setShowDeleteModal(true);
  };

  const handleCloseDelModal = async () => {
    setShowDeleteModal(false);
    setSelectedSite(null);
    await fetchSitesData();
  };

  const handleRowClick = (siteId) => {
    const site = sitesData.find((s) => s.id === siteId);
    setSelectedSite(site);
    setCurrentMenu('site-settings');
  };




  const extractSubdomains = (subdomains) => {
    if (!subdomains) return '';
    return subdomains.split(',').map(subdomain => {
        const parts = subdomain.trim().split('.');
        return parts.length > 1 ? parts[0] : subdomain; // Возвращает только часть до первого "."
    }).join(', ');
  };

  const handleFieldChange = (field, value) => {
    setSelectedSite(prev => ({ ...prev, [field]: value }));
    setUpdatedFields(prev => ({ ...prev, [field]: value }));
  
    // Обновляем состояние ввода поддомена, если изменяется поле 'subdomains'
    if (field === 'subdomains') {
      setSubdomainInput(value);
    }
  };
  
  const handleSubdomainChange = (e) => {
    // Получаем значение из ввода, разделяем и убираем лишние пробелы
    const value = e.target.value.split(',').map(sub => sub.trim()).join(',');
    setSubdomainInput(value);
    handleFieldChange('subdomains', value);
  };
  
  const handleSaveChanges = async () => {
  
    // Проверяем, есть ли изменения для сохранения
    if (Object.keys(updatedFields).length === 0) {
      console.log("Нет изменений для сохранения");
      return;
    }
  
    // Обрабатываем поддомены
    const domains = subdomainInput.split(',').map(subdomain => subdomain.trim()).filter(Boolean);
    const domain = 'host.com';
    const fullSubdomains = domains.map(subdomain => `${subdomain}.${domain}`);
    const subdomainsString = fullSubdomains.join(',');
  
    // Формируем данные для отправки
    const finalData = { ...updatedFields, subdomains: subdomainsString };
  
    try {
      const response = await fetch( API + 'api/sites/${selectedSite.id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN_API}`
        },
        body: JSON.stringify(finalData),
      });
  
      // Проверяем ответ
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Data saved successfully:', result);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  


  useEffect(() => {
    localStorage.setItem('currentMenu', currentMenu);
  }, [currentMenu]);

  return (
<div className="dashboard">
      <div className="multi-menu"></div>
      {currentMenu === 'dns' ? (
        <div className="dns-menu">
          <div className="servers-menu dns-list">
          <div className="header-menu">
            <h6 className="title-menu">{t('DnsList')}</h6>
          </div>
          <div className="container-address">
            <div className="address-block-wrapper">
              <div className="thead">
                <div>{t('Type')}</div>
                <div>{t('NameDNS')}</div>
                <div>{t('DnsAddress')}</div>
                <div>{t('ProxyStatus')}</div>
                <div>TTL</div>
                <div>{t('actions')}</div>
              </div>
              <div className="tbody">
              {/* {sitesData.slice().reverse().map((dns) => (
                  <div key={site.id} className="tbody-wrapper">
                    <div className="tbody_th dns-type">{dns.type}</div>
                    <div className="tbody_th">{dns.nameDNS}</div>
                    <div className="tbody_th">{dns.DnsAddress}</div>
                    <div className="tbody_th">{dns.ProxyStatus}</div>
                    <div className="tbody_th">{dns.ttl}</div>
                    <div className="tbody_btns">
                        <button className="btn-settings" onClick={() => handleRowClick(site.id)}><svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.61458 21.4416C0.988324 20.4369 0.501506 19.3629 0.16571 18.245C0.896527 17.9002 1.51028 17.3745 1.93907 16.7262C2.36785 16.0779 2.59496 15.3322 2.59527 14.5716C2.59558 13.811 2.36907 13.0652 1.9408 12.4166C1.51254 11.768 0.899212 11.2419 0.168674 10.8966C0.838348 8.6503 2.11343 6.59912 3.87381 4.93628C4.56135 5.35094 5.35916 5.58105 6.17894 5.60114C6.99872 5.62123 7.80851 5.43052 8.51869 5.05012C9.22887 4.66972 9.81175 4.11445 10.2028 3.44578C10.5939 2.7771 10.7779 2.0211 10.7345 1.26142C13.1672 0.678197 15.7199 0.679143 18.1522 1.26417C18.1091 2.02383 18.2935 2.77973 18.6849 3.44821C19.0762 4.11669 19.6593 4.6717 20.3697 5.05181C21.08 5.43192 21.8898 5.62232 22.7096 5.60193C23.5293 5.58154 24.327 5.35116 25.0143 4.93628C25.8721 5.74712 26.6335 6.66927 27.2735 7.69862C27.915 8.72797 28.395 9.80129 28.7224 10.8952C27.9916 11.24 27.3778 11.7657 26.9491 12.414C26.5203 13.0623 26.2932 13.808 26.2929 14.5686C26.2925 15.3292 26.5191 16.075 26.9473 16.7236C27.3756 17.3722 27.9889 17.8983 28.7194 18.2436C28.0498 20.4899 26.7747 22.5411 25.0143 24.2039C24.3268 23.7893 23.529 23.5591 22.7092 23.5391C21.8894 23.519 21.0796 23.7097 20.3694 24.0901C19.6592 24.4705 19.0764 25.0257 18.6853 25.6944C18.2942 26.3631 18.1102 27.1191 18.1536 27.8788C15.7209 28.462 13.1682 28.4611 10.736 27.876C10.779 27.1164 10.5946 26.3605 10.2033 25.692C9.81188 25.0235 9.22878 24.4685 8.51846 24.0884C7.80814 23.7083 6.9983 23.5179 6.17857 23.5383C5.35883 23.5587 4.56116 23.789 3.87381 24.2039C2.99826 23.3751 2.23916 22.447 1.61458 21.4416ZM9.99967 21.7109C11.5784 22.5556 12.7653 23.9112 13.333 25.5177C14.0722 25.5823 14.8144 25.5837 15.5537 25.5191C16.1217 23.9124 17.3092 22.5567 18.8885 21.7123C20.4665 20.8653 22.3262 20.5888 24.1106 20.9358C24.5402 20.3751 24.9106 19.7773 25.2187 19.152C24.0031 17.8924 23.3315 16.2608 23.3328 14.5701C23.3328 12.8385 24.0291 11.2209 25.2187 9.9882C24.9084 9.3631 24.5365 8.76594 24.1077 8.20436C22.3244 8.55111 20.4659 8.2751 18.8885 7.42926C17.3098 6.58458 16.1228 5.22899 15.5552 3.62246C14.8159 3.55787 14.0737 3.55649 13.3344 3.62108C12.7664 5.22784 11.5789 6.58346 9.99967 7.42788C8.42159 8.27488 6.5619 8.5514 4.77751 8.20436C4.34872 8.76547 3.97771 9.3627 3.66937 9.9882C4.88502 11.2478 5.55658 12.8794 5.55528 14.5701C5.55528 16.3017 4.85899 17.9193 3.66937 19.152C3.9797 19.7771 4.35164 20.3743 4.78047 20.9358C6.56373 20.5891 8.42222 20.8651 9.99967 21.7109ZM14.4441 18.693C13.2653 18.693 12.1349 18.2586 11.3014 17.4854C10.4679 16.7122 9.99967 15.6636 9.99967 14.5701C9.99967 13.4766 10.4679 12.428 11.3014 11.6548C12.1349 10.8816 13.2653 10.4472 14.4441 10.4472C15.6228 10.4472 16.7532 10.8816 17.5867 11.6548C18.4202 12.428 18.8885 13.4766 18.8885 14.5701C18.8885 15.6636 18.4202 16.7122 17.5867 17.4854C16.7532 18.2586 15.6228 18.693 14.4441 18.693ZM14.4441 15.9444C14.837 15.9444 15.2138 15.7996 15.4916 15.5419C15.7694 15.2841 15.9255 14.9346 15.9255 14.5701C15.9255 14.2056 15.7694 13.8561 15.4916 13.5983C15.2138 13.3406 14.837 13.1958 14.4441 13.1958C14.0512 13.1958 13.6743 13.3406 13.3965 13.5983C13.1187 13.8561 12.9626 14.2056 12.9626 14.5701C12.9626 14.9346 13.1187 15.2841 13.3965 15.5419C13.6743 15.7996 14.0512 15.9444 14.4441 15.9444Z"/></svg></button>
                        <button className="btn-delete" onClick={() => handleOpenDelModal(site)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg></button>
                    </div>
                  </div>    
                ))} */}
              </div>
            </div>
          </div>
          </div>
        </div>
      ) : currentMenu === 'serv' ? (
        <div className="servers-menu">
          <div className="header-menu">
            <h6 className="title-menu">{t('siteList')}</h6>
          </div>
          <div className="container-address">
            <div className="address-block-wrapper">
              <div className="thead">
                <div>ID</div>
                <div>{t('subDomain')}</div>
                <div>{t('domain')}</div>
                <div>{t('ip')}</div>
                <div>{t('actions')}</div>
              </div>
              <div className="tbody">
                {sitesData.slice().reverse().map((site, index) => (
                  <div key={site.id} className="tbody-wrapper">
                    <div className="tbody_th site-index">{sitesData.length - index - 1}</div>
                    <div className="tbody_th site-subdomains">
                    {site.subdomains.split(',').map((subdomain, subIndex) => {
                      const trimmedSubdomain = subdomain.trim().split('.')[0];
                      
                      if (site.subdomains.split(',').length > 3 && subIndex === 2) {
                        return (
                          <div key={subIndex}>
                            {trimmedSubdomain}...
                          </div>
                        );
                      }
                      
                      return (
                        <div key={subIndex}>
                          {trimmedSubdomain}
                        </div>
                      );
                    }).slice(0, 3)}
                    </div>
                    <div className="tbody_th site-domains">{site.domain}</div>
                    <div className="tbody_th site-ip">{site.ip}</div>
                    <div className="tbody_btns">
                        <button className="btn-settings" onClick={() => handleRowClick(site.id)}><svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.61458 21.4416C0.988324 20.4369 0.501506 19.3629 0.16571 18.245C0.896527 17.9002 1.51028 17.3745 1.93907 16.7262C2.36785 16.0779 2.59496 15.3322 2.59527 14.5716C2.59558 13.811 2.36907 13.0652 1.9408 12.4166C1.51254 11.768 0.899212 11.2419 0.168674 10.8966C0.838348 8.6503 2.11343 6.59912 3.87381 4.93628C4.56135 5.35094 5.35916 5.58105 6.17894 5.60114C6.99872 5.62123 7.80851 5.43052 8.51869 5.05012C9.22887 4.66972 9.81175 4.11445 10.2028 3.44578C10.5939 2.7771 10.7779 2.0211 10.7345 1.26142C13.1672 0.678197 15.7199 0.679143 18.1522 1.26417C18.1091 2.02383 18.2935 2.77973 18.6849 3.44821C19.0762 4.11669 19.6593 4.6717 20.3697 5.05181C21.08 5.43192 21.8898 5.62232 22.7096 5.60193C23.5293 5.58154 24.327 5.35116 25.0143 4.93628C25.8721 5.74712 26.6335 6.66927 27.2735 7.69862C27.915 8.72797 28.395 9.80129 28.7224 10.8952C27.9916 11.24 27.3778 11.7657 26.9491 12.414C26.5203 13.0623 26.2932 13.808 26.2929 14.5686C26.2925 15.3292 26.5191 16.075 26.9473 16.7236C27.3756 17.3722 27.9889 17.8983 28.7194 18.2436C28.0498 20.4899 26.7747 22.5411 25.0143 24.2039C24.3268 23.7893 23.529 23.5591 22.7092 23.5391C21.8894 23.519 21.0796 23.7097 20.3694 24.0901C19.6592 24.4705 19.0764 25.0257 18.6853 25.6944C18.2942 26.3631 18.1102 27.1191 18.1536 27.8788C15.7209 28.462 13.1682 28.4611 10.736 27.876C10.779 27.1164 10.5946 26.3605 10.2033 25.692C9.81188 25.0235 9.22878 24.4685 8.51846 24.0884C7.80814 23.7083 6.9983 23.5179 6.17857 23.5383C5.35883 23.5587 4.56116 23.789 3.87381 24.2039C2.99826 23.3751 2.23916 22.447 1.61458 21.4416ZM9.99967 21.7109C11.5784 22.5556 12.7653 23.9112 13.333 25.5177C14.0722 25.5823 14.8144 25.5837 15.5537 25.5191C16.1217 23.9124 17.3092 22.5567 18.8885 21.7123C20.4665 20.8653 22.3262 20.5888 24.1106 20.9358C24.5402 20.3751 24.9106 19.7773 25.2187 19.152C24.0031 17.8924 23.3315 16.2608 23.3328 14.5701C23.3328 12.8385 24.0291 11.2209 25.2187 9.9882C24.9084 9.3631 24.5365 8.76594 24.1077 8.20436C22.3244 8.55111 20.4659 8.2751 18.8885 7.42926C17.3098 6.58458 16.1228 5.22899 15.5552 3.62246C14.8159 3.55787 14.0737 3.55649 13.3344 3.62108C12.7664 5.22784 11.5789 6.58346 9.99967 7.42788C8.42159 8.27488 6.5619 8.5514 4.77751 8.20436C4.34872 8.76547 3.97771 9.3627 3.66937 9.9882C4.88502 11.2478 5.55658 12.8794 5.55528 14.5701C5.55528 16.3017 4.85899 17.9193 3.66937 19.152C3.9797 19.7771 4.35164 20.3743 4.78047 20.9358C6.56373 20.5891 8.42222 20.8651 9.99967 21.7109ZM14.4441 18.693C13.2653 18.693 12.1349 18.2586 11.3014 17.4854C10.4679 16.7122 9.99967 15.6636 9.99967 14.5701C9.99967 13.4766 10.4679 12.428 11.3014 11.6548C12.1349 10.8816 13.2653 10.4472 14.4441 10.4472C15.6228 10.4472 16.7532 10.8816 17.5867 11.6548C18.4202 12.428 18.8885 13.4766 18.8885 14.5701C18.8885 15.6636 18.4202 16.7122 17.5867 17.4854C16.7532 18.2586 15.6228 18.693 14.4441 18.693ZM14.4441 15.9444C14.837 15.9444 15.2138 15.7996 15.4916 15.5419C15.7694 15.2841 15.9255 14.9346 15.9255 14.5701C15.9255 14.2056 15.7694 13.8561 15.4916 13.5983C15.2138 13.3406 14.837 13.1958 14.4441 13.1958C14.0512 13.1958 13.6743 13.3406 13.3965 13.5983C13.1187 13.8561 12.9626 14.2056 12.9626 14.5701C12.9626 14.9346 13.1187 15.2841 13.3965 15.5419C13.6743 15.7996 14.0512 15.9444 14.4441 15.9444Z"/></svg></button>
                        <button className="btn-delete" onClick={() => handleOpenDelModal(site)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg></button>
                    </div>
                  </div>    
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : currentMenu === 'site-settings' && selectedSite ? (
        <div className="servers-settings">
          <div className="header-menu-settings">
            <h6>{t('profileSettings')}</h6>
          </div>
          <div className="container-address-settings">
            <form className='form-edit'>
              <div className="form-group domen">
                <label>{t('domain')}</label>
                <input
                  type="text"
                  value={selectedSite.domain}
                  onChange={(e) => handleFieldChange('domain', e.target.value)}
                />
              </div>
              <div className="form-group subdomen">
                <label>{t('subDomain')}</label>
                <input
                  type="text"
                  id="subdomains"
                  value={extractSubdomains(selectedSite.subdomains)}
                  onChange={handleSubdomainChange}
                />
              </div>
              <div className="form-group address">
                <label>{t('ip')}</label>
                <input
                  type="text"
                  value={selectedSite.ip}
                  onChange={(e) => handleFieldChange('ip', e.target.value)}
                />
              </div>
              <button className='btn-save-edit' type="button" onClick={handleSaveChanges}>
                {t('saveChanges')}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="section">
          <div className="card-section">
            <div className="available-card">
              <button className="one" onClick={handleShowMonoModal}>
                <Card title={t('MonoAddSite')} content="" />
              </button>
              <button className="two">
                <Card title={t('unavailable')} content="" />
              </button>
            </div>
            <button className="unavailable-card">
              <Card title={t('unavailable')} content="" />
            </button>
          </div>
        </div>
      )}

      {/* Модальные окна */}
      {showMonoModal && <Example show={showMonoModal} handleClose={handleCloseMonoModal} openServ={handleSiteListClick} token={token}/>}
      {showMultiModal && <AddSitesModal show={showMultiModal} handleClose={handleCloseMultiModal} openServ={handleSiteListClick} onSave={handleSaveSites} token={token}/>}
      {showDeleteModal && (<DeleteConfirmationModal show={showDeleteModal} site={selectedSite} handleClose={handleCloseDelModal} token={token}/>)}

    </div>
  );
};

export default Dashboard;