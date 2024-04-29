const express = require('express');
const router = express.Router();
const { getIntroSections } = require('../models/introSectionModel');

// GET запрос для получения разделов введения
router.get('/', async (req, res) => {
    try {
        const introSections = await getIntroSections();

        // Проверяем, есть ли данные для отправки
        if (introSections.length === 0) {
            // Если в базе данных нет записей, отправляем соответствующее сообщение
            return res.status(404).json({ message: 'No intro sections found' });
        }

        // Отправляем полученные данные клиенту
        res.status(200).json(introSections);
    } catch (error) {
        console.error('Error fetching intro sections:', error);
        // Отправляем сообщение об ошибке с более подробной информацией
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
