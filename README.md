# 🧩 EvalEase

EvalEase is a training feedback collection portal designed to gather and analyze participant feedback after training sessions. It helps Capability or L&D teams evaluate training effectiveness and continuously improve content and delivery. The platform enables administrators to create custom feedback forms for different training types. 

## 🔧 Tech Stack

### 🖥 Frontend
- **React** with **Vite**
- **TypeScript**
- **Tailwind CSS**

### 🔙 Backend
- **Spring Boot** (Java)
- **Maven** for build management
- **MySQL** (running in Docker)
- **JPA/Hibernate** for ORM
- **DTOs + Entity Mapping**

## ⚙️ Features

- ✅Form Supports:
  - Rating Scale
  - Text Input / TextArea
  - Multiple Choice
  - Checkboxes
- 🧪 Live form preview
- 💾 Save form with all questions to backend
- 🐬 MySQL schema auto-generation on startup
- 🔒 DTO layer to prevent entity exposure

## Setup

### Add env file in frontend folder with
```bash
VITE_SERVER_PORT = 'http://localhost:8080'
```

### For now admin credential is hard coded to (can change as per company requirement)
- `email` = "`admin@evalease.com`" 
- `password` = "`adminpass`"

> Under development all rights are reserved.

