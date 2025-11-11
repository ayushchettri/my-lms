# SIST LMS — Student Information & Learning Management System
A full-stack web application for managing student academics, attendance, courses, and assignments.
Built with React.js, NestJS, and PostgreSQL, this system provides role-based dashboards for students and teachers with real-time data interaction and file uploads.

## 🚀 Features
### 👨‍🎓 Student Portal
  1. View dashboard summary with quick academic stats
  2. Check attendance percentage per course
  3. Browse enrolled courses
  4. View & download assignments
  5. Update and manage profile

### 👨‍🏫 Teacher Portal
  1. Manage courses and assigned subjects
  2. Record and update attendance for each student
  3. Upload and review assignments
  4. View and manage student details

### 🧑‍💻 Admin Portal
  1. View and manage users details(both teachers and students)
  2. Check system report
  3. Create courses, assign teacher and enroll students
  4. Check attendance of students

### 🧩 Common Features
  1. Secure login & registration system
  2. File upload & download (assignments, materials)
  3. Fully responsive design
  4. RESTful API integration
  5. Clean UI with modern layout and mobile navigation toggle

### 🏗️ Tech Stack
    Layer	                 Technology
    
    Frontend	            React.js, React Router DOM, Axios, CSS3
    Backend	              NestJS (Node.js framework), Express
    Database	            PostgreSQL
    File Uploads	        Multer (NestJS middleware)
    Authentication	      JWT (JSON Web Token)
    Other Tools	          Nodemon, dotenv, bcrypt, pg

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
    git clone https://github.com/ayushchettri/my-lms.git
    cd myt-lms

### 2️⃣ Setup Backend (NestJS)
    cd server
    npm install

  Create a .env file inside server/ with:
      DATABASE_URL=postgresql://user:password@localhost:5432/sist_lms
      JWT_SECRET=your_secret_key
      PORT=5000
      UPLOADS_DIR=uploads

  Run the server:
      npm run start:dev
      Backend will start on: http://localhost:4000
    
### 3️⃣ Setup Frontend (React)
    cd ../client
    npm install
    npm start
    Frontend will start on: http://localhost:3000

## 📱 Responsive Design
  1. Uses CSS Flexbox & Grid for layout
  2. Sidebar transforms into a toggleable drawer on mobile
  3. Tables become scrollable horizontally on small screens
  4. Smooth UI for all screen sizes (320px → 1440px+)

## 🧠 Future Enhancements
  1. Analytics dashboard for student progress
  2. In-app messaging between teacher & student
  3. Timetable & announcements module
  4. Attendance chart visualization

## 🧑‍💻 Developers
     Name	               Role
    Ayush Chettri        Full-Stack Developer

## 🪪 License
This project is licensed under the MIT License — feel free to use, modify, and build upon it with attribution.

## 💬 Feedback
If you find an issue or have suggestions, please open a GitHub issue or submit a pull request.
Let’s make academic management simpler and smarter 🚀.
