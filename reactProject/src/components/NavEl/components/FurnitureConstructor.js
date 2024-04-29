import React, { useState } from 'react';
import { Alert } from 'react-bootstrap'; // Для отображения уведомлений
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/FurnitureConstrucor.css' // Убедитесь, что путь к файлу CSS верный
import defaultFurnitureImage from '../../../Image/2.png'; // Путь к изображению

const FurnitureConstructor = () => {
  const [dimensions, setDimensions] = useState({ width: 1660, height: 2780, depth: 240 });
  const [material, setMaterial] = useState('Бежевый, ЛДСП 16мм');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const materials = [
    'Бежевый, ЛДСП 16мм',
    'Белый, ЛДСП 16мм',
    'Черный, ЛДСП 16мм',
    'Дуб, ЛДСП 16мм',
    'Венге, ЛДСП 16мм',
  ];

  const handleDimensionChange = (dimension, value) => {
    setDimensions({ ...dimensions, [dimension]: value });
  };

  const handleClose = () => {
    // Здесь должна быть логика для закрытия конструктора
  };

  const handleOrder = () => {
    // Здесь должна быть логика обработки заказа
    // Пример для демонстрации анимации:
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000); // Уведомление исчезнет через 3 секунды
  };

  return (
      <div className="furniture-constructor container mt-5">
        {orderSuccess && <Alert variant="success" className="order-alert">Заказ успешно добавлен в корзину!</Alert>}
        <button className="btn-close" onClick={handleClose}>×</button>
        <h2 className="text-center mb-4">Конструктор мебели</h2>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <img src={defaultFurnitureImage} alt="Мебель" className="img-fluid" />
          </div>
          <div className="col-lg-6 settings">
            {Object.entries(dimensions).map(([key, value]) => (
                <div key={key} className="mb-3">
                  <label htmlFor={`${key}-slider`} className="form-label">{`${key[0].toUpperCase() + key.slice(1)}: ${value} мм`}</label>
                  <input
                      type="range"
                      className="form-range"
                      id={`${key}-slider`}
                      min="1000"
                      max="3000"
                      step="10"
                      value={value}
                      onChange={(e) => handleDimensionChange(key, parseInt(e.target.value))}
                  />
                </div>
            ))}
            <div className="mb-3">
              <label htmlFor="material-select" className="form-label">Материал:</label>
              <select
                  className="form-select"
                  id="material-select"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
              >
                {materials.map((mat, index) => (
                    <option key={index} value={mat}>{mat}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary btn-order" onClick={handleOrder}>Заказать</button>
          </div>
        </div>
      </div>
  );
};

export default FurnitureConstructor;
