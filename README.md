# HK Masso - Admin Dashboard (Frontend)

A role-based administrative web application for managing services, user permissions, worker availabilities, and appointment bookings for HK Masso.

🌐 **Live Demo:** [hk-masso.vercel.app/overview](https://hk-masso.vercel.app/overview)

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Clients["Frontend Applications"]
        A["HK Masso Client App<br>(Next.js)"]
        B["HK Masso Admin Dashboard<br>(React + Vite)"]
    end

    subgraph Auth["Security & Auth"]
        C["Google OAuth<br>(Auth.js)"]
        D["JWT & Session Cookies<br>(Custom API Auth)"]
    end

    subgraph Backend["Backend API Services"]
        E["Express.js REST API<br>(Node.js)"]
    end

    subgraph Database["Database"]
        F[("MongoDB Atlas<br>(Mongoose)")]
    end

    A -->|User Auth| C
    B -->|Admin Login| D
    A -->|HTTP / Axios| E
    B -->|HTTP / Axios| E
    E -->|Database Operations| F
