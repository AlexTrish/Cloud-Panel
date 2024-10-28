import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UserProfile = ({ email }) => {
    const { t, i18n } = useTranslation();
    const [login, setLogin] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('jwtToken');
                if (!token) throw new Error('Токен не найден');
                
                const response = await fetch('http://46.8.64.99:8000/api/me', {
                    headers: { 'Authorization': `Token ${token}` },
                });
                if (!response.ok) throw new Error('Ошибка авторизации');
                const data = await response.json();
                console.log('Полученные данные:', data);
                setLogin(data.username);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };        
        fetchUserData();
    }, []);

    const handleOpenSettings = () => setShowSettings(true);
    const handleCloseSettings = () => setShowSettings(false);

    const handlePasswordChange = () => {
        if (newPassword === confirmPassword) {
            console.log('Пароль успешно изменён');
            handleCloseSettings();
        } else {
            console.error('Пароли не совпадают');
        }
    };
    
    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="user-profile">
            <h2 className="username">{login}</h2>
            <button className="btn-settings" onClick={handleOpenSettings}>
                <svg width="auto" height="auto" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.61458 21.4416C0.988324 20.4369 0.501506 19.3629 0.16571 18.245C0.896527 17.9002 1.51028 17.3745 1.93907 16.7262C2.36785 16.0779 2.59496 15.3322 2.59527 14.5716C2.59558 13.811 2.36907 13.0652 1.9408 12.4166C1.51254 11.768 0.899212 11.2419 0.168674 10.8966C0.838348 8.6503 2.11343 6.59912 3.87381 4.93628C4.56135 5.35094 5.35916 5.58105 6.17894 5.60114C6.99872 5.62123 7.80851 5.43052 8.51869 5.05012C9.22887 4.66972 9.81175 4.11445 10.2028 3.44578C10.5939 2.7771 10.7779 2.0211 10.7345 1.26142C13.1672 0.678197 15.7199 0.679143 18.1522 1.26417C18.1091 2.02383 18.2935 2.77973 18.6849 3.44821C19.0762 4.11669 19.6593 4.6717 20.3697 5.05181C21.08 5.43192 21.8898 5.62232 22.7096 5.60193C23.5293 5.58154 24.327 5.35116 25.0143 4.93628C25.8721 5.74712 26.6335 6.66927 27.2735 7.69862C27.915 8.72797 28.395 9.80129 28.7224 10.8952C27.9916 11.24 27.3778 11.7657 26.9491 12.414C26.5203 13.0623 26.2932 13.808 26.2929 14.5686C26.2925 15.3292 26.5191 16.075 26.9473 16.7236C27.3756 17.3722 27.9889 17.8983 28.7194 18.2436C28.0498 20.4899 26.7747 22.5411 25.0143 24.2039C24.3268 23.7893 23.529 23.5591 22.7092 23.5391C21.8894 23.519 21.0796 23.7097 20.3694 24.0901C19.6592 24.4705 19.0764 25.0257 18.6853 25.6944C18.2942 26.3631 18.1102 27.1191 18.1536 27.8788C15.7209 28.462 13.1682 28.4611 10.736 27.876C10.779 27.1164 10.5946 26.3605 10.2033 25.692C9.81188 25.0235 9.22878 24.4685 8.51846 24.0884C7.80814 23.7083 6.9983 23.5179 6.17857 23.5383C5.35883 23.5587 4.56116 23.789 3.87381 24.2039C2.99826 23.3751 2.23916 22.447 1.61458 21.4416ZM9.99967 21.7109C11.5784 22.5556 12.7653 23.9112 13.333 25.5177C14.0722 25.5823 14.8144 25.5837 15.5537 25.5191C16.1217 23.9124 17.3092 22.5567 18.8885 21.7123C20.4665 20.8653 22.3262 20.5888 24.1106 20.9358C24.5402 20.3751 24.9106 19.7773 25.2187 19.152C24.0031 17.8924 23.3315 16.2608 23.3328 14.5701C23.3328 12.8385 24.0291 11.2209 25.2187 9.9882C24.9084 9.3631 24.5365 8.76594 24.1077 8.20436C22.3244 8.55111 20.4659 8.2751 18.8885 7.42926C17.3098 6.58458 16.1228 5.22899 15.5552 3.62246C14.8159 3.55787 14.0737 3.55649 13.3344 3.62108C12.7664 5.22784 11.5789 6.58346 9.99967 7.42788C8.42159 8.27488 6.5619 8.5514 4.77751 8.20436C4.34872 8.76547 3.97771 9.3627 3.66937 9.9882C4.88502 11.2478 5.55658 12.8794 5.55528 14.5701C5.55528 16.3017 4.85899 17.9193 3.66937 19.152C3.9797 19.7771 4.35164 20.3743 4.78047 20.9358C6.56373 20.5891 8.42222 20.8651 9.99967 21.7109ZM14.4441 18.693C13.2653 18.693 12.1349 18.2586 11.3014 17.4854C10.4679 16.7122 9.99967 15.6636 9.99967 14.5701C9.99967 13.4766 10.4679 12.428 11.3014 11.6548C12.1349 10.8816 13.2653 10.4472 14.4441 10.4472C15.6228 10.4472 16.7532 10.8816 17.5867 11.6548C18.4202 12.428 18.8885 13.4766 18.8885 14.5701C18.8885 15.6636 18.4202 16.7122 17.5867 17.4854C16.7532 18.2586 15.6228 18.693 14.4441 18.693ZM14.4441 15.9444C14.837 15.9444 15.2138 15.7996 15.4916 15.5419C15.7694 15.2841 15.9255 14.9346 15.9255 14.5701C15.9255 14.2056 15.7694 13.8561 15.4916 13.5983C15.2138 13.3406 14.837 13.1958 14.4441 13.1958C14.0512 13.1958 13.6743 13.3406 13.3965 13.5983C13.1187 13.8561 12.9626 14.2056 12.9626 14.5701C12.9626 14.9346 13.1187 15.2841 13.3965 15.5419C13.6743 15.7996 14.0512 15.9444 14.4441 15.9444Z"/>
                </svg>
            </button>
            <Modal show={showSettings} onHide={() => setShowSettings(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profileSettings')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} readOnly disabled />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>{t('newPassword')}</Form.Label>
                            <Form.Control type="password" placeholder={t('newPassword')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>{t('confirmPassword')}</Form.Label>
                            <Form.Control type="password" placeholder={t('confirmPassword')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer id='modal-prof'>
                            <Button variant="secondary" onClick={handleCloseSettings}>Отмена</Button>
                            <Button variant="primary" onClick={handlePasswordChange}>Сохранить изменения</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserProfile;
