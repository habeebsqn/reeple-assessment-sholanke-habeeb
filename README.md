This is my reeple assessment app project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

it's important you follow the instructions for setting up a react native projects thus i left the initial configuration instructions

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding also have the latest version of andriod studio for better project bootstrapping

## Step 1: Start the Metro Server

First, you will need to start clone the project to your pc to have the project folder then open in andriod studio or vscode make to wait for the java compilation to complete.
To install all dependencies and libraries , run the following command from the _root_ of the project:

```bash
# using npm

1. Clone the repository:

   git clone < habeebsqn/reeple-assessment-habeeb-sholanke >


2. Install dependencies:

   npm install


3. Start the application:

   npm start


```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start the _Android_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see the app running in your _Android Emulator_ shortly, provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: project documentation

# Currency Converter Application

## Overview

The Currency Converter Application allows users to convert between different currencies, providing real-time exchange rates and user-friendly interface options.

## Features

- _Currency Conversion_: Users can convert a specified amount of one currency (base currency) into another currency (target currency).
- _Real-Time Exchange Rates_: Provides real-time exchange rates for selected currencies, with USD as the base currency.
- _Currency Selection_: Users can choose both base and target currencies from a list of supported currencies.
- _Currency Swap_: Allows users to invert base and target currencies with a single tap, facilitating quick conversion adjustments.

- _Technologies Used_: Utilizes Axios for API requests, TanStack Query for api state management, Redux for global state, React Native Navigation for navigation flows, and TypeScript for enhanced typing external npm library react native cli.
- _Security_: Implements secure handling of API keys and configurations to ensure data privacy with env file.

- _React Native CLI Configuration_: Configuring React Native CLI posed initial challenges, particularly compatibility with libraries and tools.
- _Compatibility Issues_: Faced compatibility issues with React Native Reanimated during development, requiring research and updates to resolve.

## File Structure

The project follows a structured file organization for clarity and maintainability:

- **/app**: Entry point of the application containing main routes and configurations.
- **/components**: Reusable UI components for consistent user interface elements.
- **/screens**: Individual screen components such as ConverterScreen.js, RatesScreen.js, etc.
- **/api**: Configuration files for API requests and additional data configurations.

## APK file

below is the link to the release apk file

https://drive.google.com/file/d/16-L3CDh7XSGNpAMs4Aphq8hSiDXpRymi/view?usp=drive_link
