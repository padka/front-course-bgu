const { executeQuery } = require('../conf/Database');

async function getIntroSections() {
    try {
        const queryText = 'SELECT * FROM intro_sections ORDER BY id ASC';
        const result = await executeQuery(queryText);
        
        // Перебираем каждую строку результата и проверяем JSON поля
        return result.rows.map(section => {
            // Преобразовываем поля JSON из строки в объект, если они не null
            section.paragraphs = section.paragraphs ? JSON.parse(section.paragraphs) : null;
            section.images = section.images ? JSON.parse(section.images) : null;
            return section;
        }); // Возвращаем обработанные строки
    } catch (error) {
        console.error('Error fetching intro sections:', error);
        throw error; // Передаем ошибку дальше, чтобы обработать ее на более высоком уровне
    }
}

module.exports = { getIntroSections };
