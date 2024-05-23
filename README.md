# HaHaHub

## Table of Contents

- [About the Project](#about-the-project)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Design](#design)
- [License](#license)
- [Contributors](#contributors-)

## About The Project

HaHaHub is a project created as part of a challenge for Greencode.

The app retrieves random jokes from [icanhazdadjoke](https://icanhazdadjoke.com/) API that the user can either share or liked to save it in localStorage.

## Installation

1. Clone the repo

```sh
git clone https://github.com/gmfacundo/hahahub-challenge
```

2. Instal dependencies

```sh
npm install
```

3. Launch the app

```sh
npm run dev
```

4. Navigate to http://localhost:3000 to see the app in action.

## Technologies Used

- Next.js
- Material-UI
- Emotion
- TypeScript

## Context

This project utilizes React Context to manage state across the application, including features such as liked jokes and the current joke being viewed.

## Design

You can view the complete design on Figma:

[HaHaHub - Design](https://www.figma.com/design/e33XvmyyMqOwWJsZy2FNWT/HaHaHub?t=BUS93CKRdxOhsocU-7)

## Notes

## Notes

In the desktop view, users can drag and reorder jokes as they prefer. Unfortunately, I was unable to replicate this functionality on mobile view due to an incompatibility issue between [dnd-kit](https://docs.dndkit.com/) and [react-swipeable-list](https://github.com/marekrozmus/react-swipeable-list). Therefore, I chose to retain the swipe functionality and omitted draggable cards on mobile, as I believe it provides a better user experience.

Thank you for checking out HaHaHub!
