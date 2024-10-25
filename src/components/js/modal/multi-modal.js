import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';

function AddSitesModal({ show, handleClose }) {
  const [sites, setSites] = useState([{ id: uuidv4(), domain: '', ip: '', subdomains: '', server: '1' }]);

  const handleAddSite = () => {
    setSites([...sites, { id: uuidv4(), domain: '', ip: '', subdomains: '', server: '1' }]);
  };

  const handleRemoveSite = (id) => {
    setSites(sites.filter((site) => site.id !== id));
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
      for (const site of sites) {
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
        console.log(site)
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }

    console.log('Сайты для добавления:', sites);
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
            {sites.map((site, index) => (
              <div key={site.id} className="mb-4">
                <h5>Сайт {index + 1}</h5>
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