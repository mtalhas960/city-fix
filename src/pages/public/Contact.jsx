import React from 'react';
import PageTitle from '../../components/PageTitle';
import ContactForm from '../../components/ContactForm';

const Contact = () => {
    return (
        <>
            <PageTitle
                title="Let's Connect"
                description="Have a question, suggestion, or just want to say hi? We're here to listen."
                pageName="Contact Us"
            />
            <ContactForm />
        </>
    );
};

export default Contact