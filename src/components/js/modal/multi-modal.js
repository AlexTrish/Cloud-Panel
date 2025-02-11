import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddSitesModal({ show, handleClose, openServ, token }) {
  const { t } = useTranslation();
  const [sites, setSites] = useState([{ id: 0, domain: '', ip: '', subdomains: '', server: '1' }]);

  const handleAddSite = () => {
    setSites([...sites, { id: sites.length, domain: '', ip: '', subdomains: '', server: '1' }]);
  };

  const handleRemoveSite = (id) => {
    setSites(sites.filter((site) => site.id !== id).map((site, index) => ({ ...site, id: index })));
  };

  const handleInputChange = (id, field, value) => {
    const updatedSites = sites.map((site) =>
      site.id === id ? { ...site, [field]: value } : site
    );
    setSites(updatedSites);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const sitesToSubmit = sites.flatMap((site) => {
        // Разбиваем домены на массив, разделённый запятой или пробелом
        const domains = site.domain
          .split(/[, ]+/)
          .map(domain => domain.trim())
          .filter(Boolean);
  
        // Обновляем поддомены, добавляя ".host.com" к каждому, если указано
        const updatedSubdomains = site.subdomains
          ? site.subdomains
              .split(',')
              .map(sub => sub.trim())
              .filter(Boolean)
              .map(sub => `${sub}.host.com`)
              .join(',')
          : site.subdomains;
  
        // Создаём новый объект для каждого домена с тем же IP и поддоменами
        return domains.map(domain => ({
          ...site,
          domain: domain,
          subdomains: updatedSubdomains
        }));
      });
  
      for (const site of sitesToSubmit) {
        if (!site.domain || !site.ip || !site.subdomains) {
          console.error('Ошибка: все поля должны быть заполнены для сайта:', site);
          continue;
        }
  
        const response = await fetch('http://46.8.64.99:8000/api/me/create_site', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify(site),
        });
  
        if (response.ok) {
          console.log('Сайт успешно сохранен');
        } else {
          console.error('Ошибка при сохранении сайта', site);
        }
      }
  
      console.log('Сайты для добавления:', sitesToSubmit);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  
    handleClose();
    openServ();
  };
  
  

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('MultiAddSite')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {sites.map((site) => (
              <div key={site.id} className="mb-4">
                <h5>{t('site')} {site.id + 1}</h5>
                <Form.Group className="mb-3" controlId={`formDomain-${site.id}`}>
                  <Form.Label>{t('domain')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="example.com    or    example.com, 2example.com..."
                    value={site.domain}
                    onChange={(e) => handleInputChange(site.id, 'domain', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formip-${site.id}`}>
                  <Form.Label>{t('ip')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0.0.0.0"
                    value={site.ip}
                    onChange={(e) => handleInputChange(site.id, 'ip', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formSubdomains-${site.id}`}>
                  <Form.Label>{t('subDomain')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="www, online..."
                    value={site.subdomains}
                    onChange={(e) => handleInputChange(site.id, 'subdomains', e.target.value)}
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => handleRemoveSite(site.id)} disabled={sites.length === 1}>
                  {t('removeSite')}
                </Button>
                <hr />
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddSite}>
              {t('addAnotherSite')}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('close')}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t('save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSitesModal;