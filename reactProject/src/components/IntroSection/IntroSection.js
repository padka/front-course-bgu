import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from "../../Image/1.png"
import img2 from "../../Image/2.png"
import img3 from "../../Image/kitchen.png"
import './IntroSection.css';

// Предположим, что у нас есть следующий датасет
const DATA = {
    title: 'Наше портфолио',
    sections: [
        {
            id: 1,
            image: img1,
            content: 'Описание проекта 1'
        },
        {
            id: 2,
            image: img2,
            content: 'Описание проекта 2'
        },
        {
            id: 3,
            image: img3,
            content: 'Описание проекта 3'
        },
        {
            id: 4,
            image: img2,
            content: 'Описание проекта 2'
        },
        {
            id: 5,
            image: img2,
            content: 'Описание проекта 2'
        },
        {
            id: 6,
            image: img2,
            content: 'Описание проекта 2'
        },
        {
            id: 7,
            image: img2,
            content: 'Описание проекта 2'
        },
        {
            id: 8,
            image: img2,
            content: 'Описание проекта 2'
        },
        {
            id: 9,
            image: img2,
            content: 'Описание проекта 2'
        }
     
    ]
};

function IntroSection() {
    const [introData] = useState(DATA);
    const [error] = useState(null);
    const navigate = useNavigate(); // Удалите эту строку, если не используете navigate

    // Если потребуется, здесь может быть логика для загрузки данных

    if (error) {
        return <div>Error loading Intro Section: {error}</div>;
    }

    return (
        <section className="intro-section">
            <h2>{introData.title}</h2>
            <div className="gallery">
                {introData.sections.map((section, index) => (
                    <div className="image-container" key={index} onClick={() => navigate(`/section/${section.id}`)}>
                        <img src={section.image} alt={`Gallery item ${index}`} loading="lazy" />
                        <div className="image-text">{section.content}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default IntroSection;
