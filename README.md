## 📱 About the Project

A cross-platform mobile application built using **React Native** to manage employee information and attendance, supporting role-based access for **Admins** and **Employees**.

### 🎯 Key Features

- **User Roles:**
  - **Admin:** View and manage all employees and their details.
  - **Employee:** Access personal employment information only.

- **Authentication:**
  - User login with session persistence using **MMKV**.
  - Simple credential logic based on email structure.

- **Employee Management:**
  - Admins can **add** and **edit** employee records.
  - Smooth infinite scrolling with **frontend pagination**.

- **Attendance (Stubbed UI):**
  - Placeholder UI for biometric verification and GPS-based check-in logic.

- **Data Handling:**
  - Local data fetching using **TanStack Query** and **Axios**.
  - Mock API integration with static JSON files.

- **UI/UX:**
  - Splash screen and custom app icon.
  - Light/Dark mode support.
  - Fully responsive across devices and orientations.

### 🧪 Test Credentials

- **Username:** `john.doe`  
- **Password:** `john.doe123`

> 🔐 *Username = everything before `@` in email, Password = `username123`*

# Prerequisites

- App's local storage is seeded with the employees from [here](https://github.com/Atifsid/hrms/blob/master/src/api/employees_data.json)
- Any user can be admin or employee on the basis of role selection from login screen.
- For user login, username is everything before '@' in user's email and password is username + `123`
- The same assumptions are used while saving employees.

For instance:-

```
Email -> atif.siddiqui35@gmail.com
Username -> atif.siddiqui35
Password -> atif.siddiqui35123
```

# Screenshots
# Screenshots

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112411.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112415.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112441.png" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112446.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112453.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112506.png" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112510.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112512.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112519.png" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112525.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112530.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112535.png" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112551.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112554.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112558.png" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112601.png" width="250"/></td>
    <td><img src="https://raw.githubusercontent.com/Atifsid/hrms/refs/heads/master/snapshots/Screenshot_20250716-112603.png" width="250"/></td>
    <td></td>
  </tr>
</table>

# Getting Started with building

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
