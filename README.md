# PerfectPlanner — Event Management App
# We created our readme file with the aid of ChatGPT, as it continously updates and formats the readme easily
## 📌 PerfectPlanner

**PerfectPlanner** — A simple and intuitive event management web app where users can create, view, edit, search, sort, and delete events.

---

## 📖 Overview

PerfectPlanner is a full-stack Node.js application designed to help users organize events easily. Users can:

* Create events
* View a full list of events
* Edit event details
* Delete events
* Search by event name or type
* Sort events by name, date, or type

This project uses an in-memory model for event storage (no external DB required for the event list), but the app is connected to a local MongoDB instance for future scalability.

---

## 🏗️ Tech Stack

* **Node.js**
* **Express.js**
* **EJS** for templates
* **Bootstrap 5** for styling
* **Font Awesome** for icons
* **MongoDB/Mongoose** (connected but not required for main event features)

---

## 📂 Project Structure

```
project-folder/
├── app.js
├── server.js
├── controllers/
│   └── eventController.js
├── models/
│   └── Event.js
├── routes/
│   └── events.js
├── views/
│   ├── index.ejs
│   ├── error.ejs
│   └── events/
│       ├── list.ejs
│       ├── create.ejs
│       └── edit.ejs
├── public/
│   ├── CSS/
│   ├── images/
│   └── Script/
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```
npm install
```

### 3. Start MongoDB (optional for now)

```
mongod
```

### 4. Run the project

Development:

```
nodemon server.js
```

Normal start:

```
npm start
```

---

## 🔌 Main Features & Routes

### **Home Page**

`GET /` — landing page with links to create & view events.

### **Event Routes**

| Route                | Method | Description                             |
| -------------------- | ------ | --------------------------------------- |
| `/events/list`       | GET    | View all events (with search & sorting) |
| `/events/create`     | GET    | Show create event form                  |
| `/events/create`     | POST   | Add a new event                         |
| `/events/edit/:id`   | GET    | Show edit form for an event             |
| `/events/edit/:id`   | POST   | Submit event edits                      |
| `/events/delete/:id` | POST   | Delete an event                         |

### Searching

```
/events/list?search=Birthday
```

### Sorting

```
/events/list?sort=name
/events/list?sort=date
/events/list?sort=type
```

## 🙌 Contributors

* Josee Jones
* Jemimah Adamu

---

##
