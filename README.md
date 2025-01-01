# Mobile Application Project

This project is a mobile application developed for the **BSM447 - Mobile Application Development** course at Sakarya University. It allows administrators to manage patient test(Immunoglobulin) guidelines and data while enabling users to view and track their medical test results.
## Technologies Used
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

- **React Native**: For building the mobile application.
- **Firebase Authentication**: For user authentication and secure login.
- **SQLite**: For local storage and offline data management.
- **Firebase Database**: For storing and managing patient test data in the cloud.
- **Expo**: For simplifying development and managing builds.

## Features

### Admin Features:
- **Login with: a@gmail.com pass:zxc123**
- **Search Patient Test Values:**
- **By Age:** Enter the patient’s age to directly add the test results to their database profile.
- **By Date of Birth:** Compare the entered test values (e.g., IgA, IgM, IgG) with all existing guidelines (kılavuzlar) and display the relevant results.
# mobilUygulama
- Manage test guidelines for IgA, IgM, IgG, and other values.
- View and analyze test trends and patient data.
### User you can do a sign up
### User Features:
- Sign up to create an account.
- Login to view personal test history.
- Submit new test results and compare them with past data.

## Performance Metrics
- Query execution times for database operations:
  - **Best case:** 0ms
  - **Worst case:** 2ms
- The app demonstrates high efficiency in processing and retrieving immunoglobulin (Ig) data from the database.

## How to Run
1. Open Expo Go and scan the following URL:
https://expo.dev/preview/update?message=Merge%20branch%20'main'%20of%20https%3A%2F%2Fgithub.com%2Famirbaseet%2FmobilUygulama&updateRuntimeVersion=1.0.0&createdAt=2025-01-01T11%3A28%3A38.585Z&slug=exp&projectId=e45348bf-32c7-4719-9be4-a21423e1b9ee&group=50368345-da80-4b6b-817f-f7e576c1b59d

![eas-update](https://github.com/user-attachments/assets/73e355e3-1f42-4194-9c1e-f6e377d72d3e)
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8C0 3.58172 3.58172 0 8 0H504C508.418 0 512 3.58172 512 8V504C512 508.418 508.418 512 504 512H8C3.58172 512 0 508.418 0 504V8Z" fill="white"/>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 61" shape-rendering="crispEdges" height="512" width="512" x="0" y="0"><path stroke="#000000" d="M4 4.5h7m1 0h2m2 0h4m2 0h1m3 0h2m3 0h1m2 0h2m2 0h1m4 0h1m1 0h2m3 0h7M4 5.5h1m5 0h1m1 0h2m1 0h1m3 0h1m6 0h2m1 0h1m3 0h1m2 0h1m2 0h1m1 0h2m2 0h3m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h2m1 0h1m1 0h4m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h1m2 0h1m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m1 0h2m4 0h1m3 0h3m2 0h1m1 0h1m1 0h6m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m5 0h5m3 0h1m3 0h7m3 0h1m6 0h2m3 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h2m2 0h1m1 0h6m1 0h1m3 0h1m2 0h2m1 0h2m1 0h2m3 0h1m3 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h2m4 0h1m1 0h2m1 0h1m1 0h1m2 0h1m3 0h2m2 0h3m4 0h2m1 0h3M6 12.5h3m1 0h1m1 0h1m3 0h2m2 0h3m2 0h1m1 0h6m1 0h5m1 0h1m1 0h1m2 0h1m2 0h4m2 0h3M5 13.5h2m2 0h1m1 0h1m3 0h2m3 0h1m1 0h1m1 0h1m3 0h1m2 0h1m1 0h1m2 0h4m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m1 0h4M4 14.5h1m2 0h1m1 0h10m4 0h2m1 0h1m2 0h1m2 0h1m9 0h1m1 0h2m1 0h2m3 0h2M4 15.5h2m7 0h1m4 0h1m2 0h1m4 0h2m1 0h1m1 0h3m2 0h1m1 0h1m4 0h3m1 0h3m5 0h2M4 16.5h1m1 0h2m2 0h3m2 0h4m1 0h1m1 0h1m3 0h3m4 0h1m1 0h9m1 0h3m2 0h1m2 0h3M7 17.5h1m1 0h1m2 0h1m1 0h1m2 0h1m1 0h3m2 0h1m1 0h4m2 0h1m1 0h3m1 0h3m3 0h3m2 0h1m1 0h1m1 0h1m1 0h2M10 18.5h1m1 0h1m1 0h2m2 0h1m2 0h2m1 0h4m2 0h1m1 0h1m2 0h1m1 0h1m2 0h1m2 0h2m2 0h2m2 0h3m1 0h1M4 19.5h1m1 0h2m4 0h2m2 0h1m1 0h3m1 0h1m4 0h1m4 0h3m1 0h3m5 0h3m1 0h2m1 0h1m4 0h1M4 20.5h1m5 0h1m1 0h1m3 0h1m2 0h1m2 0h1m4 0h2m4 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h2m2 0h1m2 0h3m1 0h1M4 21.5h1m1 0h1m1 0h1m2 0h1m2 0h1m2 0h1m2 0h1m1 0h2m3 0h2m4 0h6m1 0h2m2 0h1m1 0h4m5 0h2M4 22.5h1m1 0h5m1 0h5m3 0h1m2 0h2m1 0h1m1 0h2m1 0h1m1 0h3m1 0h2m1 0h1m1 0h3m2 0h1m2 0h1m1 0h1M4 23.5h1m3 0h2m4 0h1m1 0h2m1 0h4m2 0h2m1 0h1m1 0h2m1 0h2m3 0h3m2 0h2m1 0h1m1 0h1m6 0h1M5 24.5h2m3 0h1m1 0h1m1 0h2m5 0h4m1 0h3m2 0h1m2 0h2m4 0h1m2 0h1m2 0h1m1 0h1m2 0h2m1 0h1m1 0h1M6 25.5h1m1 0h1m3 0h4m1 0h1m4 0h1m2 0h1m4 0h1m2 0h1m2 0h2m1 0h2m3 0h2m2 0h1m6 0h2M4 26.5h3m2 0h4m3 0h1m3 0h2m2 0h3m1 0h4m3 0h2m1 0h1m1 0h1m2 0h2m3 0h1m1 0h1m1 0h5M4 27.5h2m1 0h2m2 0h4m1 0h2m1 0h1m2 0h2m1 0h4m3 0h1m2 0h2m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1M4 28.5h1m2 0h10m1 0h1m1 0h1m2 0h3m1 0h7m3 0h2m2 0h1m3 0h2m1 0h6m1 0h2M7 29.5h2m3 0h3m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m3 0h3m2 0h5m2 0h1m2 0h2m3 0h1m1 0h3M5 30.5h1m2 0h1m1 0h1m1 0h3m1 0h1m2 0h1m2 0h1m1 0h5m1 0h1m1 0h6m2 0h3m3 0h3m1 0h1m1 0h2m1 0h2M5 31.5h1m1 0h2m3 0h1m1 0h1m2 0h2m2 0h6m1 0h1m3 0h3m3 0h1m1 0h1m3 0h1m1 0h1m1 0h1m3 0h1m1 0h1M4 32.5h1m1 0h7m2 0h2m1 0h3m5 0h1m1 0h5m3 0h1m4 0h3m1 0h12M4 33.5h1m2 0h1m8 0h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h1m3 0h3m1 0h3m2 0h2m3 0h1m1 0h1m1 0h2M8 34.5h5m2 0h5m4 0h3m3 0h1m1 0h1m2 0h1m1 0h1m2 0h4m5 0h1m1 0h3m1 0h1M5 35.5h1m1 0h1m5 0h3m3 0h1m1 0h1m3 0h2m2 0h1m1 0h3m1 0h1m2 0h2m1 0h1m2 0h2m1 0h1m2 0h2m1 0h1m2 0h1M4 36.5h1m1 0h1m3 0h1m1 0h1m5 0h1m3 0h1m4 0h2m2 0h1m1 0h1m2 0h1m2 0h5m1 0h1m7 0h2m1 0h1M5 37.5h1m1 0h1m1 0h1m1 0h2m1 0h3m2 0h1m1 0h1m2 0h2m1 0h5m2 0h1m1 0h1m1 0h3m4 0h2m1 0h1m2 0h6M7 38.5h1m2 0h5m1 0h1m1 0h1m7 0h2m1 0h1m1 0h4m2 0h6m1 0h2m3 0h1m2 0h1m1 0h1M5 39.5h2m2 0h1m2 0h1m5 0h2m1 0h1m1 0h1m1 0h1m7 0h2m2 0h1m1 0h1m1 0h1m2 0h5m1 0h4m2 0h1M4 40.5h1m1 0h1m1 0h5m1 0h2m4 0h1m3 0h4m1 0h2m1 0h7m1 0h1m2 0h1m1 0h2m2 0h3m2 0h2M4 41.5h2m2 0h2m1 0h1m6 0h1m1 0h2m2 0h1m2 0h1m1 0h2m1 0h2m2 0h3m4 0h1m2 0h2m3 0h3m1 0h2M7 42.5h5m2 0h1m2 0h2m1 0h1m1 0h1m2 0h1m2 0h2m1 0h2m3 0h2m2 0h3m2 0h1m6 0h1m1 0h2M5 43.5h1m1 0h3m1 0h4m1 0h3m2 0h1m1 0h2m1 0h1m2 0h3m4 0h4m1 0h7m1 0h2M5 44.5h1m1 0h4m2 0h1m1 0h4m3 0h1m3 0h1m3 0h3m1 0h1m1 0h2m2 0h4m1 0h1m3 0h3m2 0h3M6 45.5h1m5 0h2m2 0h1m2 0h1m4 0h3m6 0h3m2 0h4m4 0h5m3 0h3M4 46.5h2m1 0h6m1 0h3m1 0h2m4 0h2m5 0h1m1 0h3m1 0h2m1 0h3m7 0h4M5 47.5h2m7 0h2m5 0h1m1 0h1m1 0h2m2 0h1m1 0h1m2 0h3m2 0h1m2 0h2m2 0h2m5 0h1m1 0h1M7 48.5h1m2 0h1m3 0h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h8m1 0h2m2 0h2m2 0h3m1 0h5m1 0h3M12 49.5h3m2 0h3m3 0h1m1 0h2m1 0h1m3 0h1m2 0h4m1 0h3m3 0h1m1 0h1m3 0h1m2 0h2M4 50.5h7m5 0h4m2 0h2m2 0h3m1 0h1m1 0h1m1 0h2m2 0h3m2 0h3m1 0h2m1 0h1m1 0h2M4 51.5h1m5 0h1m2 0h4m2 0h4m1 0h5m3 0h1m1 0h1m1 0h1m2 0h1m2 0h1m1 0h2m2 0h1m3 0h2m1 0h1M4 52.5h1m1 0h3m1 0h1m1 0h4m2 0h1m3 0h2m3 0h11m1 0h7m1 0h6m1 0h2M4 53.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h5m1 0h3m1 0h1m2 0h2m2 0h1m2 0h2m2 0h1m4 0h2m2 0h1m1 0h1m4 0h1M4 54.5h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m2 0h2m1 0h3m2 0h2m6 0h1m2 0h4m3 0h1m4 0h1m1 0h1M4 55.5h1m5 0h1m6 0h1m2 0h1m1 0h2m1 0h3m4 0h2m1 0h2m1 0h1m1 0h5m1 0h2m3 0h5M4 56.5h7m3 0h1m3 0h3m2 0h1m5 0h3m2 0h6m2 0h1m2 0h2m1 0h3m1 0h3"/></svg>

    <rect x="214.0327868852459" y="214.0327868852459" width="83.9344262295082" height="83.9344262295082" fill="black" stroke="white" stroke-width="8.89344262295082"/>
    <svg x="214.0327868852459" y="214.0327868852459" width="83.9344262295082" height="83.9344262295082" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.9114 35.4964L52.1135 35.4964L30.6671 76.3932L39.9023 81.2706L58.0329 46.7391L76.1169 81.2829L85.333 76.3847L63.9114 35.4964Z" fill="white"/>
    </svg>
  </svg>

3. Alternatively, you can clone the repository and run the app locally:
```bash
git clone https://github.com/amirbaseet/mobilUygulama.git
cd mobilUygulama
npm install
npm run start
