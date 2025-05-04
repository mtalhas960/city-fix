const admins = [
  {
    "id": "ADM-001",
    "name": "John Doe",
    "email": "john.doe@cityfix.com",
    "phone": "+92 300 1234567",
    "role": "Super Admin",
    "department": "IT Department",
    "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
    "status": "active",
    "joinedAt": "2023-05-15T09:00:00.000Z",
    "lastActive": "2023-07-10T14:35:23.000Z",
    "permissions": ["create", "read", "update", "delete"],
    "assignedReports": 15
  },
  {
    "id": "ADM-002",
    "name": "Sarah Johnson",
    "email": "sarah.johnson@cityfix.com",
    "phone": "+92 301 2345678",
    "role": "Manager",
    "department": "Public Works",
    "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
    "status": "active",
    "joinedAt": "2023-06-22T10:30:00.000Z",
    "lastActive": "2023-07-09T16:42:11.000Z",
    "permissions": ["read", "update"],
    "assignedReports": 8
  },
  {
    "id": "ADM-003",
    "name": "Mohammed Ali",
    "email": "mohammed.ali@cityfix.com",
    "phone": "+92 302 3456789",
    "role": "Field Officer",
    "department": "Transportation",
    "avatar": "https://randomuser.me/api/portraits/men/56.jpg",
    "status": "inactive",
    "joinedAt": "2023-04-10T08:15:00.000Z",
    "lastActive": "2023-06-25T11:23:45.000Z",
    "permissions": ["read", "update"],
    "assignedReports": 3
  },
  {
    "id": "ADM-004",
    "name": "Aisha Khan",
    "email": "aisha.khan@cityfix.com",
    "phone": "+92 303 4567890",
    "role": "Support Staff",
    "department": "Waste Management",
    "avatar": "https://randomuser.me/api/portraits/women/22.jpg",
    "status": "active",
    "joinedAt": "2023-07-01T14:00:00.000Z",
    "lastActive": "2023-07-10T09:15:32.000Z",
    "permissions": ["read"],
    "assignedReports": 6
  },
  {
    "id": "ADM-005",
    "name": "Fahad Ahmed",
    "email": "fahad.ahmed@cityfix.com",
    "phone": "+92 304 5678901",
    "role": "Supervisor",
    "department": "Parks & Recreation",
    "avatar": "https://randomuser.me/api/portraits/men/78.jpg",
    "status": "active",
    "joinedAt": "2023-03-15T11:30:00.000Z",
    "lastActive": "2023-07-08T17:05:47.000Z",
    "permissions": ["read", "update", "delete"],
    "assignedReports": 12
  }
];

export default admins;
