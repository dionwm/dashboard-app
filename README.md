# Dashboard App

This project is a React-based dashboard application created with [Create React App](https://github.com/facebook/create-react-app) and styled using [Chakra UI](https://chakra-ui.com/). The dashboard features interactive components, 3D text rendered in Babylon.js, and data simulation using Faker.js and MirageJS.

## Getting Started

After cloning the repository, navigate to the project directory and install the required packages:

`npm install`
To start the application in development mode:

`npm start`
Will run the app on http://localhost:3000 in your browser, with hot-reloading enabled for any code changes.

## Project Structure

The main files and folders in this project are as follows:

`public/` Contains the HTML template and static assets.

`src/` Contains the source code for the application, including components, pages, and assets.

`components/` Reusable UI components used across the application.
pages/: Application pages, including the dashboard list page and detailed view.

`App.js` Main application component where routes and global state providers are set up.

`index.js` Entry point for ReactDOM to render the application.
Libraries Used

## Core Dependencies

`React (v18.3.1)` JavaScript library for building user interfaces.

`React Router DOM (v6.28.0)` Provides routing and navigation in the app.

`Axios (v1.7.7)` For making HTTP requests to the backend.

`@chakra-ui/react (v2.8.2)` Component library for consistent UI elements.

`@chakra-ui/icons (v2.1.1)` Icon components for various UI elements.

`Babylon.js` Used to create 3D text in an iframe, providing a dynamic experience in the Details page.

#### Data Simulation

`Faker (v6.6.6)` Used for generating fake data, making it easier to simulate real application data in development.

`MirageJS (v0.1.48)` A mock server to simulate API requests and responses.

## Assisstance

`ChatGPT` To create this README.md and everytime I got stuck with creating the 3D text using Babylon.js
