# TODO
### Commit everytime you believe you finish one of the features defined below. It's ok to not have the correct answer when you commit; adding a second commit later on to add onto or amend any issues is totally fine.

### Commit format:
```
feat (A: B): C
refactor (A: B): C
fix (A: B): C

A = <section number>, ex: "9"
B = <checkbox number(s)>, ex: "1,2,3"
C = <generic message>, ex: "fixed auth not auth-ing"
```

---

## 1. Axios Requests
See [backend documentation](../backend/README.md)
- [ ] Add backend `proxy` (`http://localhost:<port>`) to [package.json](package.json)
  - Enables you to only need to define the route endpoint for `axios` url
    ```js
    await axios.get('/some/route/endpoint', ...);
    ```
- [ ] Implement `axios` requests in [AuthContext](src/contexts/AuthContext.jsx)
- [ ] Implement `axios` requests in [TodoList](src/components/TodoList.jsx)
- [ ] Implement `axios` requests in [AdminDashboard](src/pages/AdminDashboard.jsx)

---

## 2. New Route Layouts
Route guarding. See [layouts](src/layouts) directory for guidance
- [ ] Make a layout for unauthorized only pages (`UnauthorizedLayout`) and apply where possible
- [ ] Make a layout for admin only pages (`AdminLayout`), and apply where possible

---

## 3. New Form Components
- [ ] Pull the login form (`LoginForm`) out of [Login](src/pages/Login.jsx) page (see [RegistrationForm](src/components/RegistrationForm.jsx))
- [ ] Make a generic form component (`GenericForm`), and apply it where possible
  - Error messages
  - Success messages
  - `handleChange()`

---

## 4. Edit AdminDashboard Table
In [AdminDashboard](src/pages/AdminDashboard.jsx)
- [ ] Enable sorting (ascending and descending) by ID
- [ ] Enable sorting (ascending and descending) by USERNAME
- [ ] Enable sorting (ascending and descending) by EMAIL
- [ ] Enable sorting (ascending and descending) by ADMIN STATUS (true > false)
- [ ] Fix alternating colors issue in the table: make heading have different color than 1st row
- [ ] Add refresh button
- [ ] Add column for TOTAL TASKS and enable sorting
- [ ] Add column for TOTAL TASKS COMPLETED and enable sorting

---

## 5. Profile Page
- [ ] Pull user data (USERNAME, EMAIL, ADMIN STATUS) out of [Home](src/pages/Home.jsx) and into a new profile (`Profile`) page

---

## 6. Login Page
- [ ] Indicate you can login using USERNAME or EMAIL

---

## 7. Not Found Page
- [ ] All invalid frontend urls should redirect to page declaring no content found

---

## 8. New Theme
See `Theme classes` in [styles.css](src/styles.css) and [ThemeContext](src/contexts/ThemeContext.jsx)
- [ ] Add a new theme
- [ ] Make sure the theme can be chosen in [ThemeContext](src/contexts/ThemeContext.jsx)
- [ ] Update `Toggle Theme` button in [Navbar](src/components/NavBar.jsx) to use the new theme via dropdown options OR cycle through each on button click

---

## 9. New Hook
- [ ] Implement new hook based on [useWindowWidth](src/hooks/useWindowWidth.js) for window height in [hooks](src/hooks) directory
- [ ] Display current window width and height in [Navbar](src/components/NavBar.jsx) when logged in as Admin

---

## 10. Button Component
- [ ] Make button component that takes in `handler callback` for on click behavior and `button text`
- [ ] Apply where possible (at least 3 places)