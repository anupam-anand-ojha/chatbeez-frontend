# ChatBeez

A real-time chat application built with Socket.IO that enables instant messaging between users with a modern and responsive interface.It provides a responsive and intuitive chat experience while seamlessly communicating with the backend APIs and Socket.IO server.

## Overview

This application enables users to:

* Register and log in securely
* Access real-time messaging functionality
* View conversations instantly without page refreshes
* Maintain authenticated sessions
* Experience a responsive interface across devices

## Technology Stack

* React.js
* Vite
* Tailwind CSS
* Axios
* Socket.IO Client
* React Router DOM

## Features

* User Authentication
* Protected Routes
* Real-Time Messaging
* Persistent Sessions
* Responsive User Interface
* API Integration
* Socket.IO Integration

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/chatbeez-frontend.git
cd chatbeez-frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Project Structure

```bash
src/
├── components/
├── pages/
├── context/
├── socket/
├── services/
├── assets/
└── App.jsx
```

## Backend Repository

The frontend communicates with the ChatBeez Backend through REST APIs and Socket.IO connections.

Backend technologies include:

* Node.js
* Express.js
* MongoDB
* Socket.IO
* JWT Authentication

## Deployment

The application can be deployed on platforms such as Vercel.

Production environment variables should be configured before deployment.

## Author

Anand Anupam
