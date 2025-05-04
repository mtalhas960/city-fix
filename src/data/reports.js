const reports = [
    {
        "id": "CX-2025-83655",
        "title": "Broken Streetlight on Fawara Chowk",
        "category": "streetlight",
        "description": "There is a broken streetlight on fawara chowk",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/broken_sghiz4.webp"
        ],
        "location": {
            "latitude": 29.390951310053623,
            "longitude": 71.67176181666295,
            "address": "Khatam e Nabuwat Chowk, Bahawalpur City Tehsil, Bahawalpur District, Bahawalpur Division, Punjab, 06319, Pakistan"
        },
        "status": "pending",
        "priority": "Medium",
        "contact": {
            "email": "xyz@gmail.com",
            "phone": "123123123123"
        },
        "submittedAt": "2025-05-03T17:09:29.909Z",
        "estimatedResolutionDate": null
    },
    {
        "id": "CX-2025-72481",
        "title": "Large Pothole on Main Boulevard",
        "category": "pothole",
        "description": "There's a large pothole in the middle of the road that's causing traffic and damaging vehicles. It's approximately 2 feet wide and 6 inches deep.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355181/pothole_1_exc1va.jpg"
        ],
        "location": {
            "latitude": 29.394825,
            "longitude": 71.683460,
            "address": "Main Boulevard, Model Town A, Bahawalpur, Punjab, Pakistan"
        },
        "status": "in-progress",
        "priority": "High",
        "contact": {
            "email": "ahmad.khan@example.com",
            "phone": "03001234567"
        },
        "submittedAt": "2025-05-01T09:23:14.322Z",
        "estimatedResolutionDate": "2025-05-10T00:00:00.000Z"
    },
    {
        "id": "CX-2025-91037",
        "title": "Overflowing Garbage Bin",
        "category": "garbage",
        "description": "The garbage bin has not been collected for over a week and is now overflowing. It's creating bad odor and attracting stray animals.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/garbage_s84cyh.jpg"
        ],
        "location": {
            "latitude": 29.388762,
            "longitude": 71.670923,
            "address": "Block C, Satellite Town, Bahawalpur, Punjab, Pakistan"
        },
        "status": "resolved",
        "priority": "Medium",
        "contact": {
            "email": "sara.ahmed@example.com",
            "phone": "03331234567"
        },
        "submittedAt": "2025-04-25T14:45:37.129Z",
        "estimatedResolutionDate": "2025-04-30T00:00:00.000Z"
    },
    {
        "id": "CX-2025-64582",
        "title": "Water Leak from Main Pipeline",
        "category": "water",
        "description": "There is a significant water leak from the main pipeline, causing water to pool on the street. This has been ongoing for 3 days.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/water_dhbnkm.jpg"
        ],
        "location": {
            "latitude": 29.401234,
            "longitude": 71.678901,
            "address": "Gulberg Colony, Street 5, Bahawalpur, Punjab, Pakistan"
        },
        "status": "pending",
        "priority": "Critical",
        "contact": {
            "email": "usman.malik@example.com",
            "phone": "03451234567"
        },
        "submittedAt": "2025-05-02T11:12:05.763Z",
        "estimatedResolutionDate": null
    },
    {
        "id": "CX-2025-38291",
        "title": "Damaged Park Bench",
        "category": "other",
        "description": "A park bench in the community garden has been vandalized and has sharp, broken parts that pose a safety risk to children.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/damaged_bench_qdgv1n.jpg"
        ],
        "location": {
            "latitude": 29.392456,
            "longitude": 71.665432,
            "address": "City Park, Bahawalpur, Punjab, Pakistan"
        },
        "status": "pending",
        "priority": "Low",
        "contact": {
            "email": "fatima.iqbal@example.com",
            "phone": "03121234567"
        },
        "submittedAt": "2025-04-28T16:34:19.582Z",
        "estimatedResolutionDate": null
    },
    {
        "id": "CX-2025-27105",
        "title": "Multiple Streetlights Out on Highway",
        "category": "streetlight",
        "description": "A stretch of about 10 streetlights are not working on the highway, making it dangerous for nighttime driving. This is near the university entrance.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355181/not_working_t70zba.jpg"
        ],
        "location": {
            "latitude": 29.399876,
            "longitude": 71.691234,
            "address": "Bahawalpur-Yazman Road, Near Islamia University, Bahawalpur, Punjab, Pakistan"
        },
        "status": "in-progress",
        "priority": "High",
        "contact": {
            "email": "professor.ali@example.com",
            "phone": "03361234567"
        },
        "submittedAt": "2025-04-20T19:08:52.417Z",
        "estimatedResolutionDate": "2025-05-07T00:00:00.000Z"
    },
    {
        "id": "CX-2025-86421",
        "title": "Collapsed Road Barrier",
        "category": "other",
        "description": "A concrete road barrier has collapsed into the road, blocking one lane and creating a traffic hazard. Urgent attention needed.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355181/collapsed_barrier_spfr3p.jpg"
        ],
        "location": {
            "latitude": 29.387654,
            "longitude": 71.675432,
            "address": "Circular Road, Near Sadiq Public School, Bahawalpur, Punjab, Pakistan"
        },
        "status": "resolved",
        "priority": "Critical",
        "contact": {
            "email": "traffic.officer@example.com",
            "phone": "03211234567"
        },
        "submittedAt": "2025-04-29T07:23:41.902Z",
        "estimatedResolutionDate": "2025-04-29T16:00:00.000Z"
    },
    {
        "id": "CX-2025-59371",
        "title": "Deep Pothole Causing Accidents",
        "category": "pothole",
        "description": "A very deep pothole at this intersection has caused multiple accidents in the past week. It's hard to see at night and fills with water when it rains.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355181/pothole_2_mjsmnj.jpg"
        ],
        "location": {
            "latitude": 29.395123,
            "longitude": 71.667890,
            "address": "Intersection of Model Town B and Garden Town, Bahawalpur, Punjab, Pakistan"
        },
        "status": "in-progress",
        "priority": "Critical",
        "contact": {
            "email": "concerned.citizen@example.com",
            "phone": "03091234567"
        },
        "submittedAt": "2025-04-26T08:17:33.651Z",
        "estimatedResolutionDate": "2025-05-06T00:00:00.000Z"
    },
    {
        "id": "CX-2025-43879",
        "title": "Illegal Dumping Site",
        "category": "garbage",
        "description": "Someone has been using this empty lot as an illegal dumping site. There's construction waste, household trash, and other debris piling up.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/garbage_s84cyh.jpg"
        ],
        "location": {
            "latitude": 29.382345,
            "longitude": 71.662345,
            "address": "Empty Plot near Al-Fareed Housing Society, Bahawalpur, Punjab, Pakistan"
        },
        "status": "pending",
        "priority": "Medium",
        "contact": {
            "email": "environment.activist@example.com",
            "phone": "03551234567"
        },
        "submittedAt": "2025-05-01T13:42:08.294Z",
        "estimatedResolutionDate": null
    },
    {
        "id": "CX-2025-75124",
        "title": "Water Supply Disruption",
        "category": "water",
        "description": "Our entire neighborhood has been without water supply for 48 hours. No prior notice was given by the water department.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/water_dhbnkm.jpg"
        ],
        "location": {
            "latitude": 29.403456,
            "longitude": 71.685678,
            "address": "Officers Colony, Bahawalpur, Punjab, Pakistan"
        },
        "status": "resolved",
        "priority": "Critical",
        "contact": {
            "email": "resident.association@example.com",
            "phone": "03441234567"
        },
        "submittedAt": "2025-04-22T10:09:57.183Z",
        "estimatedResolutionDate": "2025-04-24T00:00:00.000Z"
    },
    {
        "id": "CX-2025-19246",
        "title": "Faded Road Markings",
        "category": "other",
        "description": "The road markings at this busy intersection have completely faded away, causing confusion and near-accidents as drivers can't see lanes properly.",
        "photos": [
            "https://res.cloudinary.com/dmie3ln0b/image/upload/v1746355180/faded_marking_xpf8oe.webp"
        ],
        "location": {
            "latitude": 29.391234,
            "longitude": 71.679012,
            "address": "University Chowk, Bahawalpur, Punjab, Pakistan"
        },
        "status": "pending",
        "priority": "Medium",
        "contact": {
            "email": "driving.instructor@example.com",
            "phone": "03871234567"
        },
        "submittedAt": "2025-04-29T15:36:42.719Z",
        "estimatedResolutionDate": null
    }
];

export default reports;