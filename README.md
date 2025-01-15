# monday-apps
This codebase contains the monorepo for monday apps.

## Monorepo Structure

/project-root/
├── package.json            -> Root workspace configuration
|
├── apps/                   -> Folder containing all apps
|   |
│   ├── google-drive-app/   -> App code for Google Drive App
|   |   ├──package.json/    -> Workspace package for app
|   |   ├──index.js/        -> Entry point for Google Drive App
|   |
│   ├── google-slides-app/  -> App code for Google Slides App
|       ├──package.json/    -> Workspace package for app
|       ├──index.js/        -> Entry point for Google Slides App
│   
|
├── packages/
   ├── components/         -> Shared component for all apps
       ├──package.json/    -> Workspace package for common component
       ├──index.js/        -> Entry point for Common Component
       ├──Header.js/       -> Entry point for Google Drive App
   

## Getting Started

Follow these steps to set up and start working with the monorepo:

1. Clone the Repository

git clone <repository-url>

cd <repository-name>
Clones the monorepo and navigates to the project directory.

2. Install Dependencies

npm install
# or
yarn install
Installs all required dependencies for the entire monorepo.


3. Build the Common Component  

npm run build --workspace=@npm-workspace-demo/components
Builds the shared component.

4. Start a Specific Package

npm run start --workspace=<package-name>
(For ex: npm run build --workspace=@npm-workspace-demo/app11)
Starts the development server for the specified package.

5. Build a specific app

npm run build --workspace=<package-name>
Builds the specific app.

To know more about working of monorepos refer this: https://earthly.dev/blog/npm-workspaces-monorepo/
