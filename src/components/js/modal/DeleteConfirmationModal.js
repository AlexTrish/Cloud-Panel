import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../css/index.scss'

function DeleteConfirmationModal({ show, handleClose, site, token }) {
  const { t } = useTranslation();
    const handleDeleteSite = async (siteId) => {
        try {
            const response = await fetch(`http://46.8.64.99:8000/api/sites/${siteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (response.ok) {
                console.log("Сайт успешно удалён");
                handleClose();
            } else {
                console.error("Ошибка при удалении сайта:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
        }
    };

    const extractSubdomains = (subdomains) => {
        if (!subdomains) return '';
        return subdomains.split(',').map(subdomain => {
            const parts = subdomain.trim().split('.');
            return parts.length > 1 ? parts[0] : subdomain;
        }).join(', ');
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение удаления</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить сайт:
        {site && (
          <div>
            <strong>Домен:</strong> {site.domain} <br />
            <strong>Субдомен:</strong> {extractSubdomains(site.subdomains)} <br />
            <strong>IP адрес:</strong> {site.ip}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="danger" onClick={() => {if (site) {handleDeleteSite(site.id);}}}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default DeleteConfirmationModal;
