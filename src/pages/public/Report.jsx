import React from 'react'
import PageTitle from '../../components/PageTitle'
import ReportForm from '../../components/ReportForm'

const Report = () => {
    return (
        <>
            <PageTitle
                title="Report a City Issue"
                description="Help improve your city by reporting a problem."
                pageName="Report an Issue"
            />
            <ReportForm />
        </>
    )
}

export default Report