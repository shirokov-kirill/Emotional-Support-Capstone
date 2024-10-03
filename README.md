# 🌿 Harmony App: Mood-Tracking Calendar

Welcome to **Harmony App**, your personal mood-tracking calendar! With Harmony, you can monitor your emotions daily, leave notes about how you're feeling, and communicate directly with your doctor for real-time support and psychiatric care. Harmony helps you take control of your mental health and makes it easy for your doctor to keep track of your well-being.

## 📖 Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [User Data Privacy](#user-data-privacy)
- [Deployment](#deployment)
- [Design document](#design-document)
- [Work Done](#work-done)

---

## 🌟 Introduction

Harmony App is a simple, easy-to-use tool designed to help you monitor your mood daily. With the app, you can log how you feel, write notes, and allow your doctor to keep an eye on your mood patterns. Doctors can then use this information to schedule new psychiatric sessions directly through the app, making it easier to manage your mental health care.

---

## 🚀 Key Features

- **Mood Tracking Calendar:** Easily track your mood every day with simple mood icons.
- **Daily Notes:** Leave detailed notes on how you're feeling each day to provide context for your doctor.
- **Doctor Monitoring:** Your doctor can monitor your mood history and schedule new psychiatric sessions based on your logged data.
- **Built-in Chat:** Communicate directly with your doctor through a secure chat within the app.
- **Session Scheduling:** Doctors can schedule new sessions directly in the app, based on your mood and notes.

---

## 📲 Getting Started

All you need is to simply follow the [link](https://emotionalsupport.life/) and start using it right now! For more detailed instructions on use, please refer to the [user manual]((USER_MANUAL.md))


## 🔒 User Data Privacy

Your privacy is important to us. The Harmony App ensures that all of your data is encrypted and stored securely. You have full control over your data, including the ability to review, download, or delete it at any time. Only your doctor, whom you authorize, will have access to your mood logs and notes.

Key privacy features:
- **End-to-end encryption** for all messages and data.
- **User-controlled permissions** for doctor access and data sharing.
- **Secure storage** of all personal and health-related data.

Thank you for using Harmony! We’re here to help you manage your mental well-being with ease.


## 🛠️ Deployment instruction

If you want to use a local version of the application, you can deploy our application. 
To deploy the application in Docker containers on a Linux machine with Docker installed, follow these steps:

1. Navigate inside the repository.
2. Execute: `chmod +x deploy.sh`.
3. Run the deploy script: `./deploy.sh`.

The script deploys 3 Docker containers:

- **Web app with Nginx**: The Nginx serves the web app requests and proxies API requests sent to `/api` to the backend container.
- **Backend**: The backend processes data and interacts with the database.
- **DB**: The database container that stores all app-related data.

**Recommended minimal configuration for the Linux machine**:  
2 Cores and 4 GB RAM.

## Design document
Design doc for this project can be found using this [link](https://docs.google.com/document/d/1tLmdbdnuuRnF7SUbGfO45MOjKO2PW5i-jn86VXZddpE/edit) 

---

## 📝 Work Done

A list of all the work completed during the implementation sprints is available [here](https://docs.google.com/presentation/d/1uyN3Xe7WYpE58yw565GDzBhU4o4cmOs2Ut65KAcG2X8/edit?usp=sharing).

