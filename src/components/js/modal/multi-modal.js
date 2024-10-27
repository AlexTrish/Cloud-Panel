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
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    try {
      const sitesToSubmit = sites.map((site) => {
        // Проверка и обработка поддоменов
        const updatedSubdomains = site.subdomains
          ? site.subdomains
              .split(',')
              .map(sub => sub.trim()) // Убираем лишние пробелы
              .filter(Boolean) // Убираем пустые значения
              .map(sub => `${sub}.host.com`) // Форматируем поддомены
              .join(',') // Объединяем обратно в строку
          : site.subdomains;

        return { ...site, subdomains: updatedSubdomains };
      });

      for (const site of sitesToSubmit) {
        // Проверка наличия обязательных полей
        if (!site.domain || !site.ip || !site.subdomains) {
          console.error('Ошибка: все поля должны быть заполнены для сайта:', site);
          continue; // Пропускаем сайт, если есть незаполненные поля
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
                    placeholder="example.com"
                    value={site.domain}
                    onChange={(e) => handleInputChange(site.id, 'domain', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formip-${site.id}`}>
                  <Form.Label>Адрес сервера</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0.0.0.0"
                    value={site.ip}
                    onChange={(e) => handleInputChange(site.id, 'ip', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formSubdomains-${site.id}`}>
                  <Form.Label>Поддомен</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="www, online..."
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