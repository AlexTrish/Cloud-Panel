import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddSitesModal({ show, handleClose }) {
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
    const token = '548e1ce8bc45c4211903186c47bf34deb7e86643';

    try {
      const sitesToSubmit = sites.map((site) => {
        const updatedSubdomains = site.subdomains
          ? `${site.subdomains}.host.com`
          : site.subdomains;
        return { ...site, subdomains: updatedSubdomains };
      });

      for (const site of sitesToSubmit) {
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
          console.error('Ошибка при сохранении сайта');
        }
      }

      console.log('Сайты для добавления:', sitesToSubmit);
    } catch (error) {
      console.error('Ошибка:', error);
    }

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Массовое добавление сайтов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {sites.map((site) => (
              <div key={site.id} className="mb-4">
                <h5>Сайт {site.id + 1}</h5>
                <Form.Group className="mb-3" controlId={`formDomain-${site.id}`}>
                  <Form.Label>Домен</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={site.domain}
                    onChange={(e) => handleInputChange(site.id, 'domain', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formip-${site.id}`}>
                  <Form.Label>Адрес сервера</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={site.ip}
                    onChange={(e) => handleInputChange(site.id, 'ip', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formSubdomains-${site.id}`}>
                  <Form.Label>Поддомен</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={site.subdomains}
                    onChange={(e) => handleInputChange(site.id, 'subdomains', e.target.value)}
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => handleRemoveSite(site.id)} disabled={sites.length === 1}>
                  Удалить сайт
                </Button>
                <hr />
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddSite}>
              Добавить еще один сайт
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSitesModal;