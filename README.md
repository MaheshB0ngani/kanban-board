# KanbanBoard
![GitHub repo size](https://img.shields.io/github/repo-size/MaheshB0ngani/KanbanBoard)
![GitHub stars](https://img.shields.io/github/stars/MaheshB0ngani/KanbanBoard?style=social)
![GitHub forks](https://img.shields.io/github/forks/MaheshB0ngani/KanbanBoard?style=social)

## Description
kanbanboard is an Angular PWA powered by Firebase. The application is about where logged users can create their own boards with tasks, only owned boards are showed and can be modified/ removed. User can drag n drop to set the order of the tasks and boards. Guests can preview server side rendered html and data. This application is inspired from Trello.  

![](https://firebasestorage.googleapis.com/v0/b/angular-voxer.appspot.com/o/demo-gif.gif?alt=media&token=dadcdb72-eb58-4903-b6b8-c741c27a08c4)

## Features
- Angular 10 + Firebase
- Responsive UI
- Installable PWA
- OAuth and Email/Password Signup with Firebase
- Drag & drop Kanban demo with Firestore
- Angular Universal SSR with Nest.js deployed to Google Cloud Run
- Optional SSR Prerendering Script

## Usage
1.  Run

- `git clone https://github.com/MaheshB0ngani/kanbanboard.git kanbanboard`
- `cd kanbanboard`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

![](https://firebasestorage.googleapis.com/v0/b/kanbanboard-96e46.appspot.com/o/project-config.PNG?alt=media&token=5eabb205-7ba2-4fc3-905f-e9547055e754)

3.  Add the config to your Angular environment

#### src/environments/
Update the `environment.prod.ts` and `environment.ts` files. 

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: '...........',
    authDomain: '...........',
    databaseURL: '...........',
    projectId: '...........',
    storageBucket: '...........',
    messagingSenderId: '...........',
    appId: '...........',
  }
};
```

5.  Run `ng serve`
"# kanban-board" 
