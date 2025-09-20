# Digital Mental Health and Psychological Support System

A comprehensive MERN stack application designed for students in higher education, providing AI-powered mental health support, appointment booking, peer forums, and administrative analytics.

## 🌟 Features

### Core Functionality
- **AI-Powered Chatbot**: Intelligent mental health companion with PHQ-9/GAD-7 assessments
- **Appointment Booking**: Secure scheduling with qualified counselors
- **Resource Hub**: Multilingual psychoeducational materials (videos, audio, articles)
- **Peer Support Forum**: Moderated community for student interaction
- **Admin Dashboard**: Comprehensive analytics and user management
- **Crisis Management**: Automated alerts and professional referrals

### User Roles
- **Students**: Access all support features, book appointments, participate in forums
- **Counselors**: Manage appointments, respond to crisis alerts, moderate discussions
- **Administrators**: System oversight, analytics, user management

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + Material UI + TypeScript
- **Backend**: Node.js + Express.js + MongoDB
- **ML Service**: Flask + scikit-learn (PHQ-9 assessment model)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with role-based access control
- **Deployment**: Docker + Docker Compose

### Project Structure
```
mental-health-system/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts (Auth)
│   └── theme.ts           # Material UI theme
├── backend/               # Node.js API
│   ├── src/
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API endpoints
│   │   └── middleware/    # Authentication, validation
│   └── Dockerfile
├── ml-service/            # Flask ML service
│   ├── app.py            # PHQ-9 prediction model
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml     # Container orchestration
└── nginx/                # Reverse proxy configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose (for full deployment)
- MongoDB (if running locally)

### Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd mental-health-system
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

4. **Setup ML Service**
```bash
cd ml-service
pip install -r requirements.txt
```

5. **Start Development Servers**

Frontend (React):
```bash
npm run dev
```

Backend (Node.js):
```bash
cd backend
npm run dev
```

ML Service (Flask):
```bash
cd ml-service
python app.py
```

### Production Deployment

1. **Using Docker Compose**
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

2. **Access the Application**
- Frontend: http://localhost (or port 80)
- Backend API: http://localhost:5000
- ML Service: http://localhost:5001
- MongoDB: localhost:27017

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/mental_health_db
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ML_SERVICE_URL=http://localhost:5001
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_ML_SERVICE_URL=http://localhost:5001
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Chatbot Endpoints
- `POST /api/chatbot/chat` - Send message to AI
- `POST /api/chatbot/assessment/phq9` - Submit PHQ-9 assessment

### Appointment Endpoints
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Forum Endpoints
- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts` - Create new post
- `POST /api/forum/posts/:id/comments` - Add comment
- `POST /api/forum/posts/:id/like` - Like/unlike post

### ML Service Endpoints
- `GET /health` - Health check
- `POST /predict` - PHQ-9 prediction
- `GET /model-info` - Model information

## 🔒 Security Features

- JWT-based authentication with secure token storage
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Password hashing with bcrypt
- Crisis alert system for high-risk assessments

## 🧠 AI/ML Integration

The system includes a trained PHQ-9 assessment model:

- **Model Type**: Random Forest Classifier
- **Features**: 9 PHQ-9 questionnaire responses (0-3 scale)
- **Output**: Depression severity classification
- **Classes**: Minimal, Mild, Moderate, Moderately Severe, Severe
- **Integration**: Flask microservice with REST API

## 📱 Frontend Features

### Material UI Components
- Responsive design with mobile-first approach
- Professional government-style theme
- Comprehensive navigation with role-based menus
- Interactive dashboard with charts and analytics
- Form validation and error handling
- Loading states and progress indicators

### Key Pages
- **Home**: Landing page with feature overview
- **Chatbot**: Interactive AI mental health companion
- **Resources**: Searchable library with filters
- **Forum**: Community discussion board
- **Appointments**: Booking and management system
- **Dashboard**: Role-specific analytics and controls

## 📈 Admin Analytics

- User activity trends and engagement metrics
- Mental health severity distribution (PHQ-9 scores)
- Appointment statistics and counselor utilization
- Forum activity and moderation reports
- Crisis alert monitoring and response tracking
- Exportable CSV reports for institutional analysis

## 🆘 Crisis Management

Automated crisis intervention system:
- PHQ-9 scores ≥15 trigger immediate alerts
- Counselor dashboard notifications
- Emergency contact information display
- Professional referral recommendations
- Crisis hotline integration (988, Crisis Text Line)

## 🧪 Testing

```bash
# Frontend tests
npm test

# Backend tests
cd backend
npm test

# ML service tests
cd ml-service
python -m pytest
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Smart India Hackathon 2025
- Mental health professionals who provided guidance
- Open source community for tools and libraries
- Educational institutions supporting mental health initiatives

## 📞 Support

For support, email support@mindcare.gov or join our community forum.

---

**⚠️ Important Notice**: This application is designed for educational support and should not replace professional mental health treatment. If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.