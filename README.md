# HK Masso - Admin Dashboard (Frontend)

A role-based administrative web application for managing services, user permissions, worker availabilities, and appointment bookings for HK Masso.

🌐 **Live Demo:** [hk-masso.vercel.app/overview](https://hk-masso.vercel.app/overview)

---

## 🚀 Features & Access Control

The dashboard implements fine-grained **Role-Based Access Control (RBAC)** across four user levels: `Super Admin`, `Admin`, `Worker`, and `Receptionist`.

### 🔐 Role Permissions Matrix

* **Super Admin:**
  * User management: Create new staff accounts, modify user roles, and delete users.
  * System guardrails: Enforces a single Super Admin account constraint across the system.
  * Full administrative access over services, availabilities, and bookings.
* **Admin:**
  * Full CRUD control over service listings (prices, durations, and details).
  * Create, edit, and delete worker schedules and availabilities.
  * Manage and update booking statuses or delete bookings.
* **Worker & Receptionist:**
  * View-only access to operational stats, service lists, user profiles, worker availabilities, and customer bookings.
* **All Users:**
  * Profile self-management (account deletion option).
  * Dashboard access protected via secure login (JWT & session cookies provided by the API server).

### 🎨 User Interface & Experience
* **Interactive Data Visualization:** Real-time business performance analytics powered by Recharts.
* **Theme Preference:** Full Light and Dark mode toggle.
* **Error Resilience:** Error boundaries via `react-error-boundary` and toast feedback using `sonner`.

---

## 🛠️ Tech Stack

* **Build Tool & Core:** [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
* **Routing & SEO:** [React Router](https://reactrouter.com/), `react-helmet-async`
* **UI Components & Styling:** [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), `tailwindcss-animate`, [Lucide React](https://lucide.dev/)
* **State Management & Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest), [Axios](https://axios-http.com/)
* **Forms & Validation:** `react-hook-form`
* **Data Visualization:** [Recharts](https://recharts.org/)
* **Feedback & Error Handling:** `sonner` (Toasts), `react-error-boundary`

> **Note:** This repository houses the **Admin Frontend** interface built with Vite. Authentication, business logic, and database operations are powered by a separate Node.js / Express / MongoDB REST API.

---

## 📂 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### Local Setup

1. **Clone the repository:**
   ```bash

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
   git clone [https://github.com/your-username/hk-masso-admin-frontend.git](https://github.com/your-username/hk-masso-admin-frontend.git)
   cd hk-masso-admin-frontend
