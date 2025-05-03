import React from 'react';
import * as RemixIcons from '@remixicon/react';

const Card = ({ icon, color, title, description }) => {
    const renderIcon = () => {
        const IconComponent = RemixIcons[icon];
        return <IconComponent size={36} color={color} />;
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[#9333ea]/10 transition-all duration-300 text-center border border-gray-100 hover:-translate-y-1">
            <div className={`rounded-full bg-black/5 w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
                {renderIcon()}
            </div>
            <h4 className="font-semibold text-xl mb-3 text-darkGray">{title}</h4>
            <p className="text-darkGray/80 leading-relaxed">{description}</p>
        </div>
    );
};

export default Card;
