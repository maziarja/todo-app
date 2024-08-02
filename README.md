# Frontend Mentor - Todo app solution

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This project is a Todo app designed to help users efficiently manage their tasks and stay organized. It caters to individuals who need a simple yet effective tool for tracking their daily activities.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![desktop-dark](./images/Screenshot%20desktop-dark.png)
![desktop-light](./images/Screenshot%20desktop-light.png)
![mobile-dark](./images/Screenshot%20mobile-dark.png)
![mobile-light](./images/Screen%20Shot%20mobile-light.png)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- JavaScript

### What I learned

I learned how to implement drag and drop functionality

```js
_getDragAfterElement(e) {
    const draggableElements = [
      ...this._parentEl.querySelectorAll(".todo-list:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
  _DragAndDrop() {
    const draggables = document.querySelectorAll(".todo-list");
    //// drag start
    draggables.forEach((draggable) => {
      return draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });
    });
    //// drag end
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });
    //// dragover on container
    this._parentEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = this._getDragAfterElement(e);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        this._parentEl.appendChild(draggable);
      } else {
        this._parentEl.insertBefore(draggable, afterElement);
      }
    });
  }
```

### Useful resources

- [resource](https://www.youtube.com/watch?v=jfYWwQrtzzY&t=7s) - This helped me for implementing drag and drop feature

## Author

- Frontend Mentor - [@maziarja](https://www.frontendmentor.io/profile/maziarja)
- Twitter - [@maz_alem](www.https://x.com/maz_alem)
- Instagram - [@maziar_jamalialem](https://www.instagram.com/maziar_jamalialem)

## Acknowledgments

I appreciate Jonas Schmedtmann for his awesome courses on Udemy,
Also 'Web Dev Simplified' on youtube where I learned about drag and drop functionality.
