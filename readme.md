
# Employee Management System

A full-stack employee management system with a RESTful API backend and a modern React frontend, designed to support organizational employee management with PostgreSQL as the database.

## 🚀 Quick Deploy to Render

This application is ready for deployment to [Render.com](https://render.com) using Docker!

**Two ways to deploy:**

1. **Blueprint (Recommended)** - One-click deployment using `render.yaml`
   - Fork this repository
   - Click **New Blueprint** in Render
   - Connect your repository
   - Deploy automatically with all services configured

2. **Manual** - Step-by-step deployment with full control

📖 **[Complete Deployment Guide →](DEPLOY.md)**

## Repository Structure

```
employee-management-api/
├── frontend/           # React frontend application
├── backend/           # Node.js API (root level)
├── docker-compose.yml # Docker orchestration for full stack
└── README.md         # This file
```

## Application Overview

This application is an employee management system designed for administrators and company employees. Administrators can add new employees, edit their data, assign positions, manage salary levels, and view salary increase histories. The system now includes comprehensive project management capabilities, allowing administrators to create and manage projects, assign multiple projects to employees, and track project status. The application automatically tracks salary raise dates for employees and sends notifications to administrators one month before the scheduled increase. Additionally, the system sends notifications about upcoming employee birthdays to help administrators congratulate employees on time.

Employees can update their personal information, such as name, contact details, and programming languages, while certain fields, like salary or position, are editable only by administrators. Employees can be assigned to multiple projects simultaneously, with project information visible on their profiles. All changes to employee profiles are automatically logged, and notifications are sent to administrators. Notifications also include employee status updates, such as assigned projects or English language proficiency. The application ensures regular data checks and sends important notifications through a task scheduler.

## Features

### Backend API
- **Employee Management**: Create, read, update, and delete employee records.
- **Project Management**: Full CRUD operations for projects with many-to-many employee-project relationships.
- **Data Validation**: Ensures data integrity with robust validation and input sanitization.
- **Search and Filter**: Allows filtering employees and projects by various criteria.
- **Pagination**: Supports paginated employee and project listings.
- **Error Handling**: Comprehensive error management for reliability.
- **Authentication**: JWT-based authentication system with role-based access control.
- **Notifications**: Automated notification system for birthdays and salary reviews.
- **Transaction Support**: Database transactions for data consistency.

### Frontend Application
- **Modern UI**: Built with React, Vite, Shadcn UI, and Tailwind CSS.
- **Authentication**: Secure login and registration.
- **Employee Management**: View, create, edit, and delete employees.
- **Project Management**: Full CRUD interface for projects with role-based access control.
- **Employee-Project Assignment**: Assign multiple projects to employees with visual indicators.
- **Responsive Design**: Works on desktop, tablet, and mobile.
- **Real-time Updates**: Notifications and data updates.
- **Interactive Components**: Clickable project cards, modals, and dynamic forms.

## Screenshots

### Login Page
![Login Page](screenshots/login-page.png)

### Employee List
![Employee List](screenshots/employee-list.png)

### Employee Detail
![Employee Detail](screenshots/employee-detail.png)

### Create Employee
![Create Employee](screenshots/create-employee.png)

### Projects Management
![Projects Page](screenshots/projects-page.png)

## Quick Start with GitHub Codespaces

The easiest way to get started is using GitHub Codespaces, which provides a fully configured development environment in the cloud.

### Prerequisites
- A GitHub account
- Access to GitHub Codespaces

### Setup

1. Click the **Code** button on the GitHub repository page
2. Select the **Codespaces** tab
3. Click **Create codespace on main** (or your preferred branch)

GitHub will automatically:
- Set up the development environment
- Configure port forwarding for ports 3000 (backend) and 5173 (frontend)
- Install VS Code extensions for linting and formatting

### Running the Application

Once your Codespace is ready:

1. Copy environment files:
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   ```

2. Start all services with Docker Compose:
   ```bash
   docker compose --profile dev up
   ```

   This starts:
   - **PostgreSQL Database** (internal only)
   - **Backend API** on port 3000 (automatically forwarded)
   - **Frontend Application** on port 5173 (automatically forwarded)

3. Access the application:
   - GitHub Codespaces will automatically forward ports
   - Click on the "Ports" tab in VS Code to see forwarded ports
   - Open the frontend URL (port 5173) in your browser

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `adminpassword`

### Manual Setup in Codespaces (without Docker)

If you prefer to run services manually:

1. **Terminal 1 - Backend**:
   ```bash
   npm install
   npm run dev
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The backend runs on port 3000 and frontend on port 5173. Both ports are automatically forwarded by Codespaces.

### Troubleshooting in Codespaces

**Connection Refused Errors:**
- Ensure backend is running on port 3000 (check terminal output)
- Verify `.env` file exists with `PORT=3000`
- Check port 3000 is forwarded in the Ports tab
- Ensure `VITE_API_URL=http://localhost:3000` in `frontend/.env`

**CORS Errors:**
- Update `CORS_ORIGIN` in `.env` to match your Codespaces frontend URL
- Or set `CORS_ORIGIN=*` for development

For more details, see [.devcontainer/README.md](.devcontainer/README.md).

## Quick Start with Docker

The application uses Docker Compose with profile-based execution for different environments.

### Prerequisites
- Docker and Docker Compose installed
- Git (to clone the repository)

### Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/dreamquality/employee-management-api.git
   cd employee-management-api
   ```

2. Copy environment files:
   ```bash
   cp .env.example .env
   cp .env.test.example .env.test
   cp .env.e2e.example .env.e2e
   ```

3. (Optional) Update environment variables in `.env` files for your setup

### Running the Application

#### Development Mode (Recommended)
Start all services for local development:
```bash
docker compose --profile dev up
```

This starts:
- **PostgreSQL Database** (internal only - not exposed to host, accessible via `docker compose exec`)
- **Backend API** on port 3000
- **Frontend Application** on port 5173

Access the application at `http://localhost:5173`

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `adminpassword`

#### CI Testing Mode
Run automated tests (used in GitHub Actions):
```bash
docker compose --profile ci up --abort-on-container-exit --exit-code-from test
```

Clean up after tests:
```bash
docker compose --profile ci down -v
```

#### E2E Testing Mode
Run end-to-end tests (requires Playwright setup):
```bash
docker compose --profile e2e up --abort-on-container-exit --exit-code-from playwright
```

> Note: The `playwright` service in `docker-compose.yml` currently uses a placeholder command that exits with an error. Playwright is not configured by default. Before using the `e2e` profile, configure Playwright in the frontend and add a `test:e2e` script to `frontend/package.json` that runs your E2E tests. Until this is done, running the E2E profile will fail as expected.
### Docker Compose Profiles

The application supports three profiles for different use cases:

| Profile | Services | Use Case |
|---------|----------|----------|
| `dev` | app, frontend, db | Local development with hot reload |
| `ci` | app, db, test | Automated testing in CI/CD pipelines |
| `e2e` | app, frontend, db, playwright | End-to-end testing |

### Common Docker Commands

```bash
# Stop all services
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f app

# Access database
docker compose exec db psql -U postgres -d my_database

# Rebuild containers
docker compose build --no-cache
```

### Docker Architecture

The refactored Docker setup includes:

- **Isolated Networking**: Database is not exposed to host, services communicate via Docker network
- **Health Checks**: App service includes health check endpoint (`/health`) to ensure proper startup order
- **Environment Files**: All secrets and configuration in `.env` files (not committed to Git)
- **Entrypoint Scripts**: Migrations run automatically before app/tests start
- **Profile-Based**: Run only the services you need for your task

### Troubleshooting Docker

| Problem | Solution |
|---------|----------|
| "no configuration file provided" | Run: `cp .env.example .env` |
| Services don't start | Ensure you specify a profile: `--profile dev` |
| Can't connect to DB from host | DB is internal only, use: `docker compose exec db psql -U postgres` |
| Health check fails | Check logs: `docker compose logs app` |
| CORS errors in browser | Check `CORS_ORIGIN` in `.env` file |

### GitHub Actions Integration

The CI workflow automatically uses Docker Compose:

```yaml
- name: Setup environment files
  run: |
    cp .env.test.example .env.test
    cp .env.example .env

- name: Run tests with Docker Compose
  run: |
    docker compose --profile ci up --abort-on-container-exit --exit-code-from test
```

This ensures consistency between local development and CI environments.

## Manual Setup

### Backend API Setup

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) (version 18 or higher recommended).
- **npm**: Comes with Node.js but can be updated independently.
- **PostgreSQL**: Install and configure [PostgreSQL 16](https://www.postgresql.org/) as the database for employee data.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/dreamquality/employee-management-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd employee-management-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root of the project.
2. Add the following environment variables:
   ```plaintext
   # Локальная база данных
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_NAME=employee_db
   DB_USER=your_local_db_user
   DB_PASSWORD=your_local_db_password

   # Секреты
   JWT_SECRET=your_jwt_secret
   SECRET_WORD=your_secret_word_for_admin_registration

   # Среда разработки
   NODE_ENV=development

   # Порт (опционально, по умолчанию 3000)
   PORT=3000
   ```
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: Данные для подключения к базе данных PostgreSQL.
   - `JWT_SECRET`: Секретный ключ для аутентификации JWT.
   - `SECRET_WORD`: Секретный ключ для регистрации администратора.
   - `NODE_ENV`: Указывает среду выполнения.
   - `PORT`: Порт, на котором будет работать сервер (по умолчанию 3000).

Замените `your_local_db_user`, `your_local_db_password`, `your_jwt_secret`, и `your_secret_word_for_admin_registration` на свои реальные значения.

### Running the Application

Start the server in development mode:
   ```sh
   npm run dev
   ```
The server will be running at `http://localhost:3000`.

### API Documentation

Access the interactive API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) if Swagger or a similar tool is set up. This documentation provides a complete view of the available endpoints and allows for interactive testing.

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install frontend dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```sh
   cp .env.example .env
   ```

4. Update the `.env` file with the API URL:
   ```plaintext
   VITE_API_URL=http://localhost:3000
   ```

5. Start the frontend development server:
   ```sh
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

For more details about the frontend, see the [frontend README](./frontend/README.md).

## Deployment

### Deploying to Render.com

**🚀 This application is production-ready for deployment to Render via Docker!**

For detailed deployment instructions, see **[DEPLOY.md](DEPLOY.md)**.

#### Quick Overview

This application provides multiple deployment options:

1. **Blueprint Deployment (Easiest)**
   - One-click deployment using the included `render.yaml`
   - Automatically creates database, backend, and frontend services
   - Pre-configured with environment variables

2. **Manual Deployment (More Control)**
   - Deploy services individually
   - Customize each service configuration
   - Full control over environment variables and settings

#### What's Included

- ✅ Production-optimized Dockerfiles
- ✅ Render Blueprint (`render.yaml`)
- ✅ Database migration automation
- ✅ Health check endpoint
- ✅ Environment variable templates
- ✅ Comprehensive deployment guide

#### Key Features for Render

- **Docker-based**: No build script configuration needed
- **Auto-migrations**: Database migrations run automatically on deployment
- **Health checks**: Built-in `/health` endpoint for service monitoring
- **Database URL support**: Works with Render's PostgreSQL connection strings
- **CORS configured**: Ready for separate frontend/backend deployment

📖 **[Read the Complete Deployment Guide](DEPLOY.md)** for step-by-step instructions, troubleshooting, and best practices.

### Legacy Docker Setup (Old Method)

For backward compatibility, you can still use the old method without profiles:

```bash
# Start all services
docker compose up --build
```

However, it's recommended to use the profile-based approach described in the "Quick Start with Docker" section above for better control and CI integration.

## API Documentation

Access the interactive API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to view and test available endpoints.

### Available Scripts

- **`npm run dev`**: Runs the app in development mode with hot reloading.
- **`npm start`**: Runs the app in production mode.
- **`npm test`**: Runs test cases for the application.
- **`npm run build:swagger`**: Generates static HTML Swagger documentation in the `docs/` folder.
- **`npm run lint`**: Lints the project files to enforce consistent code style.

## Continuous Integration

This project uses GitHub Actions for automated testing and documentation deployment. Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

The CI workflow uses Docker Compose with the `ci` profile:
1. Sets up environment files
2. Runs tests in isolated Docker containers using `docker compose --profile ci up`
3. Automatically cleans up containers and volumes
4. Generates Swagger documentation (only on `main` branch)
5. Deploys documentation to GitHub Pages in the `docs/` folder (only on `main` branch)

This approach ensures consistency between local development and CI environments, as both use the same Docker Compose configuration.

The generated documentation is automatically published to GitHub Pages at `https://<username>.github.io/<repo>/docs/` after successful test runs on the main branch.

You can view the test status in the repository's Actions tab.

## API Endpoints

### Authentication
| Method | Endpoint                          | Description                               |
|--------|-----------------------------------|-------------------------------------------|
| POST   | `/login`                         | Authenticate user                         |
| POST   | `/register`                      | Register a new user                       |

### Users
| Method | Endpoint                          | Description                               |
|--------|-----------------------------------|-------------------------------------------|
| GET    | `/users`                         | List all users (with pagination, filtering, sorting) |
| GET    | `/users/:id`                     | Get a specific user by ID                |
| POST   | `/users`                         | Create a new user (admin only)            |
| PUT    | `/users/:id`                     | Update user information                   |
| DELETE | `/users/:id`                     | Delete a user (admin only)               |
| GET    | `/users/me`                      | Get current user's profile                |

### Projects
| Method | Endpoint                                    | Description                               |
|--------|---------------------------------------------|-------------------------------------------|
| GET    | `/projects`                                | List all projects (with pagination, filtering, search) |
| GET    | `/projects/:id`                            | Get a specific project by ID              |
| POST   | `/projects`                                | Create a new project (admin only)         |
| PUT    | `/projects/:id`                            | Update project information (admin only)   |
| DELETE | `/projects/:id`                            | Delete a project (admin only)            |
| POST   | `/projects/:id/employees`                  | Assign multiple employees to project (admin only) |
| POST   | `/projects/:id/employee`                   | Add single employee to project (admin only) |
| DELETE | `/projects/:id/employees/:employeeId`      | Remove employee from project (admin only) |
| GET    | `/projects/:id/employees`                  | Get all employees assigned to a project   |

### Notifications
| Method | Endpoint                          | Description                               |
|--------|-----------------------------------|-------------------------------------------|
| GET    | `/notifications`                 | Get all notifications for the user        |
| POST   | `/notifications/mark-as-read`    | Mark notifications as read                |

### Example Requests

#### User Management
- **Get all users**: `GET /users?page=1&limit=10&sortBy=registrationDate&order=DESC`
- **Get user by ID**: `GET /users/:id`
- **Add new user**: `POST /users` with JSON body containing user data
- **Update user**: `PUT /users/:id` with JSON body of updated data (includes `projectIds` array for project assignment)
- **Delete user**: `DELETE /users/:id`
- **Get current user's profile**: `GET /users/me`

#### Authentication
- **User login**: `POST /login` with JSON body containing credentials
- **User registration**: `POST /register` with JSON body containing user details

#### Project Management
- **Get all projects**: `GET /projects?page=1&limit=10&active=true&search=project name`
- **Get project by ID**: `GET /projects/:id`
- **Create project**: `POST /projects` with JSON body:
  ```json
  {
    "name": "Project Name",
    "description": "Project description",
    "wage": 5000,
    "active": true
  }
  ```
- **Update project**: `PUT /projects/:id` with JSON body of updated data
- **Delete project**: `DELETE /projects/:id`
- **Assign employees to project**: `POST /projects/:id/employees` with JSON body:
  ```json
  {
    "employeeIds": [1, 2, 3]
  }
  ```
- **Add single employee**: `POST /projects/:id/employee` with JSON body:
  ```json
  {
    "employeeId": 1
  }
  ```
- **Remove employee from project**: `DELETE /projects/:id/employees/:employeeId`
- **Get project employees**: `GET /projects/:id/employees`

#### Notifications
- **Get notifications**: `GET /notifications`
- **Mark notifications as read**: `POST /notifications/mark-as-read` with JSON body containing notification IDs

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<br>

---
---

# Internship Task: API & UI Tests in Docker

> **This whole section was added as part of the internship task.**
> Everything above is the original project README; everything below describes the changes made for the task:
> *"Set up Docker with API and UI tests, run the tests and add new smoke suites."*

---

### Summary

| Area | Before | After |
|---|---|---|
| API tests (Mocha) | 86 tests, run in Docker | **101 tests** (86 existing + 15 new smoke), all passing |
| UI tests (Playwright) | Not present (only a stub service that exited with error) | **18 tests**, Page Object Model, TypeScript, run in Docker |
| Repeated test runs | Failed on second run (stale test DB) | Can be run any number of times in a row |

### Quick Start

All commands are run from the project root (`employee-management-crm`). No manual setup is needed: env files are optional (see [Environment Variables](#environment-variables)).

```bash
# Start database + API + Swagger + frontend (command from the task)
docker-compose up --build

# Stop and delete containers, network and DB volume (command from the task)
docker-compose down -v
```

After `docker-compose up --build`:

| What | URL |
|---|---|
| API | http://localhost:3000 (health check: `/health`) |
| Swagger UI | http://localhost:3000/api-docs |
| Frontend | http://localhost:5173 — login `admin@example.com` / `adminpassword` |

Tests (in a second terminal, or instead of `up`; dependencies start automatically):

```bash
# All API tests (Mocha)
docker compose --profile ci run --rm --build test

# Only API smoke tests
docker compose --profile ci run --rm test npm run test:smoke

# All UI tests (Playwright)
docker compose --profile e2e run --rm playwright

# Only UI smoke tests (tagged @smoke)
docker compose --profile e2e run --rm playwright sh -c "npm ci && npx playwright test --grep @smoke"
```

Then clean up with `docker-compose down -v`.

> **Notes**
> - `run --rm` removes the test container after the run, so `docker-compose down -v` cleans up everything. The exit code of `run` is the test result (`0` = all passed).
> - Alternatively, tests can run with `up`: `docker compose --profile e2e up --build --abort-on-container-exit --exit-code-from playwright`. In that case the stopped `my_playwright` container belongs to the `e2e` profile, so clean up with `docker compose --profile "*" down -v`.
> - After a run, messages like `my_app ... npm error signal SIGTERM` or `exited with code 143` are **normal** — Docker stops the other containers.

### Docker Services and Profiles

| Service | Profile | Purpose |
|---|---|---|
| `db` | — (always) | PostgreSQL 16 |
| `app` | — (always) | API + Swagger on port 3000 |
| `frontend` | — (always) | React (Vite dev server) on port 5173 |
| `test` | `ci` | API tests (Mocha) |
| `playwright` | `e2e` | UI tests (Playwright) |

Test services are in profiles, so `docker-compose up --build` starts only the application, not the tests.

### Environment Variables

Each service reads two env files: the committed `*.example` file with defaults, then an **optional** local file that overrides it:

| Service | Defaults | Optional override |
|---|---|---|
| `db`, `app`, `frontend` | `.env.example` | `.env` |
| `test` | `.env.test.example` | `.env.test` |
| `playwright` | `.env.e2e.example` | `.env.e2e` |

To change a value locally, copy the example (e.g. `cp .env.example .env`) and edit it. Local files are git-ignored.

### How UI Tests Reach the App

The frontend calls the API at `VITE_API_URL=http://localhost:3000`, which works in the host browser. Inside the Playwright container `localhost` is the container itself, so `e2e/localhost-proxy.js` forwards `localhost:5173 → frontend:5173` and `localhost:3000 → app:3000`. The browser in Docker therefore opens the app exactly like a user on the host (`BASE_URL=http://localhost:5173`). The proxy is started by the `playwright` service entrypoint, so it also works with overridden commands (UI mode, `--grep`).

### API Tests (Mocha)

**Stack:** JavaScript, [Mocha](https://mochajs.org/) (test runner), [Chai](https://www.chaijs.com/) (assertions), [Supertest](https://github.com/ladjs/supertest) (HTTP requests), [Sinon](https://sinonjs.org/) (mocks/stubs).

Supertest imports the Express `app` directly, so API tests need only the `db` container — not a running `app` server.

**Existing tests** (`tests/`): `auth`, `user`, `project`, `notification`, `notificationService`, `bugfixes`, `edge-cases` — 86 tests, all passing.

#### New: API smoke suite — `tests/smoke.test.js` (15 tests)

| Group | Tests |
|---|---|
| Service availability | `GET /health` returns 200 · `GET /api-docs.json` returns OpenAPI spec · `GET /api-docs` serves Swagger UI |
| Authentication | register admin (with secret word) · register employee · login admin returns token · login employee returns token · wrong password returns 400 |
| Protected endpoints | `GET /profile` without token → 401 · `GET /profile` with token → current user · `GET /users` as admin → 200 · `GET /notifications` → 200 |
| Projects CRUD | admin creates project → reads it → deletes it |

New npm script in root `package.json`:
```json
"test:smoke": "cross-env NODE_ENV=test mocha tests/smoke.test.js --exit"
```

### UI Tests (Playwright + TypeScript + POM)

The project had no UI tests. A separate Playwright project was added in the `e2e/` folder.

**Stack:** [Playwright](https://playwright.dev/) 1.63.0, TypeScript, Page Object Model, custom fixtures.
Tests run in the official image `mcr.microsoft.com/playwright:v1.63.0-noble` (browsers are preinstalled).

#### Structure

```
e2e/
├── fixtures/
│   └── index.ts              # Custom fixtures: page objects + `asAdmin` (logged-in admin)
├── tests/
│   ├── pages/                # Page Objects (locators + actions)
│   │   ├── BasePage.ts       # Common: navigation links, Logout
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── EmployeesPage.ts
│   │   ├── CreateEmployeePage.ts
│   │   ├── ProjectsPage.ts
│   │   ├── ProfilePage.ts
│   │   ├── NotificationsPage.ts
│   │   └── NotFoundPage.ts
│   └── specs/                # Test specs (no selectors inside, only page object calls)
│       ├── auth.spec.ts
│       ├── navigation.spec.ts
│       ├── employees.spec.ts
│       ├── projects.spec.ts
│       └── profile.spec.ts
├── localhost-proxy.js        # inside Docker: localhost:5173/3000 → frontend/app services
├── playwright.config.ts      # baseURL from BASE_URL env, screenshots + trace on failure
├── tsconfig.json             # strict mode
├── package.json              # scripts: test:e2e, test:e2e:smoke, typecheck
└── .gitignore
```

#### Page Object Model

- Each page is a class extending `BasePage`; locators are `readonly` fields of type `Locator`, actions are typed async methods (e.g. `login(email: string, password: string): Promise<void>`).
- **Locators use only stable attributes, never UI text:** form fields by `id` (`#email`, `#password`, ...), everything else by `data-testid` via `page.getByTestId(...)` (e.g. `login-submit`, `employees-heading`, `nav-projects`). The `data-testid` attributes were added to the frontend for this purpose (see the table below).
- Test data has interfaces: `NewUser` (`RegisterPage.ts`), `NewProject` (`ProjectsPage.ts`).
- Navigation sections are typed: `NavSection = 'employees' | 'projects' | 'notifications' | 'profile'` (maps to `data-testid="nav-<section>"`).
- Fixtures (`fixtures/index.ts`) inject page objects into tests, e.g. `test('...', async ({ loginPage, projectsPage }) => {...})`. The `asAdmin` fixture logs in as the default admin (`admin@example.com`, created automatically by `app.js`).

#### Test list (18 tests)

| Spec | Tests |
|---|---|
| `auth.spec.ts` `@smoke` | login page is displayed · unauthenticated user redirected to `/login` · wrong password stays on login page · admin can log in · admin can log out |
| `auth.spec.ts` (Registration) | register page opens from login link · new employee registers, logs in and does **not** see admin-only Notifications |
| `navigation.spec.ts` `@smoke` | open Employees · open Projects · open Notifications · unknown route shows 404 page |
| `employees.spec.ts` | admin sees "Add Employee" · "Add Employee" opens create form · search by unknown name shows "No employees found" |
| `projects.spec.ts` | create-project dialog opens and closes · admin creates a project and it appears in the list |
| `profile.spec.ts` | admin profile shows "Administrator" role · "Edit Profile" opens edit form |

Type check (from `e2e/`):
```bash
npm install
npm run typecheck
```

Test reports: after a run, `e2e/playwright-report/` (HTML report) and `e2e/test-results/` (screenshots and traces of failed tests) are created. Both are git-ignored.

### Watching UI Tests Run

#### Option 1: Playwright UI Mode in Docker (recommended)

UI Mode shows the test tree, a timeline with screenshots, every action (`goto`, `fill`, `click`, `expect`), a DOM snapshot for each step with the click point highlighted, and Console / Network / Source / Errors tabs.

```bash
# Start the e2e stand + UI Mode server on port 8080
docker compose --profile e2e run --rm -p 8080:8080 playwright sh -c "npm ci && npx playwright test --ui-port=8080 --ui-host=0.0.0.0"
```

Then open **http://localhost:8080** in Chrome / Safari / Firefox:

1. The left panel lists all specs (`auth`, `employees`, `navigation`, `profile`, `projects`).
2. Press ▶ next to a test, a file or at the top to run everything.
3. Hover over a step in the action list to see the page state at that moment.
4. Toggle 👁 (Watch) to re-run a test automatically when its file changes.

Stop with `Ctrl+C`, then clean up:
```bash
docker compose --profile "*" down -v
```

> The browser inside Docker is headless, so UI Mode shows a step-by-step recording rather than a live window.
> UI Mode relies on a Service Worker — use a regular browser; some embedded/preview browsers show a blank page.

#### Option 2: Headed mode on the host (real browser window)

To watch a real Chromium window clicking through the app, run the tests on the host against the running app:

```bash
# 1. Start the app (API on :3000, frontend on :5173)
docker-compose up --build -d

# 2. Install dependencies and Chromium on the host (once)
cd e2e
npm install
npx playwright install chromium

# 3. Run tests in a visible browser, one at a time
BASE_URL=http://localhost:5173 npx playwright test --headed --workers=1

# or open UI Mode locally (native window)
BASE_URL=http://localhost:5173 npx playwright test --ui
```

> These runs use the application database, so test data (projects, users) stays there. Reset with `docker-compose down -v`.

#### Option 3: HTML report and traces after a run

After every run Playwright writes an HTML report to `e2e/playwright-report/`; traces and screenshots of failed tests go to `e2e/test-results/`. Open the report from `e2e/`:

```bash
npx playwright show-report
```

To record a trace for **every** test (not only failed ones), run:
```bash
docker compose --profile e2e run --rm playwright sh -c "npm ci && npx playwright test --trace on"
```
and open any test in the report → **Trace** tab.

### CI: GitHub Actions

Workflow: `.github/workflows/test.yml` (name **Tests**). It combines the new API + UI test jobs with the original Swagger deploy.

**Triggers:** push and pull request to `main` / `develop`, plus manual run (**Actions → Tests → Run workflow**).

**Jobs:**

| Job | Runs | What it does |
|---|---|---|
| `api-tests` — API tests (Mocha) | always | `docker compose --profile ci run --rm --build test`; prints service logs on failure |
| `ui-tests` — UI tests (Playwright) | always, **in parallel** with `api-tests` | `docker compose --profile e2e run --rm --build playwright`; prints `app` / `frontend` logs and uploads screenshots + traces on failure |
| `deploy-swagger` — Swagger docs to GitHub Pages | only on `main` (not for pull requests), **after both test jobs passed** | `npm ci` → `npm run build:swagger` → publish `./docs` with `peaceiris/actions-gh-pages` |

```
api-tests ─┐
           ├─► deploy-swagger (main only)
ui-tests ──┘
```

**Artifacts** (Actions → run → *Artifacts*, kept 14 days):
- `playwright-report` — HTML report, uploaded on every run. Download, unzip and open with `npx playwright show-report <folder>`.
- `playwright-test-results` — screenshots and `trace.zip` of failed tests (only when tests fail). Open a trace at https://trace.playwright.dev.

**Other settings:** `concurrency` cancels an older run of the same branch when a new commit is pushed; `timeout-minutes` stops hung jobs; every test job ends with `docker compose --profile "*" down -v`; `deploy-swagger` has `contents: write` permission to push to the `gh-pages` branch.

No secrets or `.env` files are needed: services read the committed `*.example` env files.

### Changes to Existing Files

| File | Change | Why |
|---|---|---|
| `docker-compose.yml` | `playwright` service: stub (`exit 1`) replaced with a real service on the Playwright image, mounting `./e2e`, running `npm ci && npx playwright test`, `BASE_URL=http://frontend:5173` | Run UI tests in Docker |
| `docker-compose.yml` | Removed profiles from `db`, `app`, `frontend` | `docker-compose up --build` from the task started nothing (`no service selected`), and `docker-compose down -v` did not see any service |
| `docker-compose.yml` | `env_file` = committed `*.example` + optional local file (`required: false`) | Project starts on a clean machine without copying `.env` files |
| `docker-compose.yml` | `playwright` entrypoint starts `e2e/localhost-proxy.js`; `BASE_URL=http://localhost:5173` | The browser inside Docker uses the same URLs as the host browser |
| `.env.example`, `.env.e2e.example` | `VITE_API_URL=http://app:3000` → `http://localhost:3000` | `app` is not resolvable from the host browser, and `.app` is an HSTS-preloaded TLD (Chrome forces HTTPS) |
| `frontend/src/components/Layout.jsx`, `frontend/src/pages/*.jsx` | Added `data-testid` attributes (24 + nav links): page headings, buttons, search input, empty state, dialog, project title, profile role, logout | Stable UI-test locators that do not depend on visible text |
| `.github/workflows/test.yml` | Rewritten: jobs `api-tests` + `ui-tests` (parallel) + `deploy-swagger` (main only, after tests pass) | Run all autotests in CI and keep the original Swagger deploy |
| `e2e/localhost-proxy.js` | New file | Forwards `localhost:5173/3000` inside the Playwright container to `frontend`/`app` |
| `.env.example` | `CORS_ORIGIN=+` → `CORS_ORIGIN=*` | `+` blocked all browser requests (CORS), login through UI was impossible |
| `entrypoint-test.sh` | Drops the test DB before creating it | Second test run failed on migrations (`column "currentProject" does not exist`) because the test DB from the previous run remained |
| `package.json` | Added `test:smoke` script | Run only API smoke tests |
| `tests/smoke.test.js` | New file | API smoke suite |
| `e2e/` | New folder | Playwright UI tests |

### Bugs Found During Testing

1. **CORS misconfiguration** — `.env.example` had `CORS_ORIGIN=+`, so the API rejected every request from the browser and UI login did not work. Fixed (`*`).
2. **API URL `http://app:3000` in the browser** — not resolvable from the host, and inside Docker `.app` is an HSTS-preloaded TLD, so Chrome forces HTTPS (*"Redirect is not allowed for a preflight request"*). Fixed: `VITE_API_URL=http://localhost:3000` + `localhost-proxy.js` for the Playwright container.
3. **Commands from the task did not work** — all services were bound to profiles, so `docker-compose up --build` printed `no service selected`, and `.env` files had to be created manually. Fixed: base services without profiles, env files optional.
4. **Test DB not cleaned between runs** — repeated `npm run test` in Docker failed on migrations. Fixed in `entrypoint-test.sh`.
5. **Race condition on Employees page (not fixed in app)** — if the search request finishes before the initial list request, the initial (full) list overwrites search results. In dev mode React StrictMode fires the initial request twice, which makes it more likely. The UI test waits for network idle and for the search response (`EmployeesPage.ts`), but the frontend should cancel/ignore outdated requests.
6. **Login from the host browser was impossible** — consequence of bug 2. Fixed together with it.

### Test Results

| Suite | Command | Result |
|---|---|---|
| Start app | `docker-compose up --build` | `db`, `app` healthy; `/health`, `/api-docs`, frontend → 200 |
| API (all) | `docker compose --profile ci run --rm --build test` | **101 passing** |
| API smoke | `docker compose --profile ci run --rm test npm run test:smoke` | **15 passing** |
| UI (Playwright) | `docker compose --profile e2e run --rm playwright` | **18 passed** |
| UI smoke (`@smoke`) | `docker compose --profile e2e run --rm playwright sh -c "npm ci && npx playwright test --grep @smoke"` | **9 passed** |
| Clean up | `docker-compose down -v` | no containers, volumes or networks left |

---

*End of internship task section.*
