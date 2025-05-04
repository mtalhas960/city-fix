import React from 'react'
import { useParams } from 'react-router-dom'

const ReportDetail = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Report ID: {id}</h1>
        </div>
    )
}

export default ReportDetail