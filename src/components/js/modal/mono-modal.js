import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example({ show, handleClose, token, openServ }) {
  const [domain, setDomain] = useState('');
  const [ip, setip] = useState('');
  const [subdomains, setSubdomains] = useState('');
  const [server, setServer] = useState('');

  const handleSubmit = async () => {
    const host = 'host.com';
    let completeSubdomains = subdomains
      .split(',')
      .map(sub => sub.trim())
      .filter(Boolean)
      .map(sub => {
        return sub.endsWith(`.${host}`) ? sub : `${sub}.${host}`;
      });

    const siteData = { domain, ip, subdomains: completeSubdomains.join(','), server: 1 };

    try {
      const response = await fetch('http://46.8.64.99:8000/api/me/create_site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(siteData),
      });

      if (response.ok) {
        console.log('Сайт успешно сохранен');
      } else {
        console.error('Ошибка при сохранении сайта');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }

    handleClose();
    openServ();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить сайт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDomain">
              <Form.Label>Домен</Form.Label>
              <Form.Control
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formip">
              <Form.Label>Адрес сервера</Form.Label>
              <Form.Control
                type="text"
                placeholder="0.0.0.0"
                value={ip}
                onChange={(e) => setip(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubdomains">
              <Form.Label>Поддомен</Form.Label>
              <Form.Control
                type="text"
                placeholder="www, online..."
                value={subdomains}
                onChange={(e) => setSubdomains(e.target.value)}
              />
            </Form.Group>
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

export default Example;
