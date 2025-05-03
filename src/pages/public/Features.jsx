import React from 'react';
import PageTitle from '../../components/PageTitle';
import features from '../../data/features';
import * as RemixIcons from '@remixicon/react';

const Features = () => {
    return (
        <>
            <PageTitle
                title="Smart Features That Power Civic Change"
                description="Every tool you need to report, track, and resolve city issues — all in one place."
                pageName="Features"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </>
    );
};

const FeatureCard = ({ feature }) => {
    const renderIcon = () => {
        const IconComponent = RemixIcons[feature.icon];
        return <IconComponent size={24} color={feature.color} />;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <div className="mb-4 flex justify-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}15` }}
                >
                    {renderIcon()}
                </div>
            </div>
            <h5 className="text-center mb-3">{feature.title}</h5>
            <p className="text-gray-600 text-center">{feature.description}</p>
        </div >
    );
};

export default Features;