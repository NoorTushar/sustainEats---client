# Sustain-Eats: Community Food Sharing and Surplus Reduction Platform

Welcome to the client-side repository of our Community Food Sharing and Surplus Reduction Platform! This README provides an overview of our project and its key features.

# Live link of the web application:

https://sustaineats-4027a.web.app/

# Project Overview

Our platform aims to facilitate the sharing of surplus food within the community, reducing food waste and supporting those in need. Built using modern technologies such as React, Firebase, and Tailwind CSS, our platform offers a user-friendly interface and seamless user experience.

# Key Features

1. **Efficient Food Management**: Developed full **CRUD** operations for managing food listings, ensuring easy updating and removal of surplus items using **REST APIs**.

2. **Donation and Payment System**: Integrated _Stripe_ for secure donation and payment transactions, enabling users to contribute financially to the cause.

3. **User Authentication and Security**: Utilized _Firebase_ and _JWT_ for secure user authentication, safeguarding user data, and ensuring a trusted environment.

4. **Search and Sort Functionality**: Users can easily search for specific foods by name and sort them based on expiration date

5. **Private Routes**: Certain routes, such as adding food and managing user-specific data, are protected and accessible only to authenticated users, ensuring data privacy and security.

# If you want to clone

1. Make sure to install the npm packages after downloading the repository.

Open the project terminal and write `npm i`

2. Make sure to have firebase installed and then create `.env.local` file in the root directory. In the `.env.local` file write like this:

```
VITE_APIKEY=xyz

VITE_AUTHDOMAIN=xyz

VITE_PROJECTID=xyz

VITE_STORAGEBUCKET=xyz

VITE_MESSAGINGSENDERID=xyz

VITE_APPID=xyz
```

replace the xyz with your actual firebase auth configuration

3. add the server URL in the `.env.local` file.

```
VITE_API_URL= `here give your server URL
```

4. add payment gateway primary key in the `.env.local` file

VITE_Payment_Gateway_PK= `your primary key`

-  ! Now make sure to clone the server repository and follow the readme of that repository
