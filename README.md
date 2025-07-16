# Restaurant Ordering App

This is a solo project for the [Scrimba Frontend Career Essentials Course](https://scrimba.com/learn/frontend).  
It is a simple restaurant ordering web app that allows users to browse a menu, add items to their order, remove items, and complete their order with a payment form.

---

## Project Idea

The goal of this project is to simulate a real-world restaurant ordering experience:

- Users can view a menu of items (with emoji, name, ingredients, and price).
- Users can add items to their order and adjust quantities.
- Users can remove items from their order.
- When ready, users can complete their order by filling out a payment form in a modal.
- After successful payment, a confirmation modal is shown.

---

## Tools & Technologies Used

- **JavaScript (ES6+)**: Core logic, DOM manipulation, classes, constructors, and event handling.
- **HTML5**: Markup structure.
- **CSS3**: Styling, Flexbox for layout, and responsive design with mobile-first approach and media queries.
- **Vite**: Development server and build tool.
- **Font Awesome**: For icons.

---

## What I Learned

### JavaScript Concepts

- **Classes & Constructors**: Used to encapsulate menu and order logic, making the code modular and reusable.
- **Setting Functions in Constructors**: Methods like `renderMenu`, `renderOrder`, and `showModal` are defined in the class for clear structure.
- **Form Handling & Verification**: Implemented a payment form inside a modal, with required fields and basic validation before submission.
- **Event Handling**: Added event listeners for adding/removing items and handling form submission.
- **Dynamic DOM Manipulation**: Created and updated HTML elements dynamically based on user actions.

### CSS & Layout

- **Flexbox**: Used for flexible and responsive layouts, aligning menu items and order summary.
- **Mobile-First Design**: Base styles are optimized for mobile, with media queries for tablets and desktops.
- **Custom Modals**: Built custom modal overlays for payment and confirmation messages.

---

## How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. Open your browser and go to the local server address (usually `http://localhost:5173`).

---

## About Scrimba

At Scrimba, our goal is to create the best possible coding school at the cost of a gym membership! 💜  
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

---

Happy Coding!
