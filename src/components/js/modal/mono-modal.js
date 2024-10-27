import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example({ show, handleClose, token, openServ }) {
  const { t } = useTranslation();
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
          <Modal.Title>{t('addSiteTitle')}</Modal.Title> {/* Заголовок модального окна */}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDomain">
              <Form.Label>{t('domain')}</Form.Label> {/* Перевод для метки "Домен" */}
              <Form.Control
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIp">
              <Form.Label>{t('ip')}</Form.Label> {/* Перевод для метки "Адрес сервера" */}
              <Form.Control
                type="text"
                placeholder="0.0.0.0"
                value={ip}
                onChange={(e) => setip(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubdomains">
              <Form.Label>{t('subDomain')}</Form.Label> {/* Перевод для метки "Поддомен" */}
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
            {t('close')} {/* Перевод для кнопки "Закрыть" */}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t('save')} {/* Перевод для кнопки "Сохранить" */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
