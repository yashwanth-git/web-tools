# Demo of JS Shopping Cart Assignment

These files are from an office-hours demonstration of how to approach the js-cart assignment

Notably, this means:
- using webpack and babel to bundle and transpile front end JS
- Having all content be managed client-side
- Server-side only serves the static files

Because of time constraints visuals and CSS styling are not demonstrated in this sample

Key Lesson: Notice how the files separate concerns:
- our state (the role of model) is in a file
  - data structure
  - methods to modify the data structure representing actions the user takes
    - this is useful not just for this sort of assignment, but is a stepping stone to our upcoming React work
- Our render (the role of view/presentation) is in a file
  - We pass the state to the render() function, so that the render relies on state but it is a state that gets passed to it.  It is decoupled from everything except the DOM.
- Our main file (the role of controller) 
  - assembles the other parts
  - Attaches actions (state changes) to events (in this case, events the user triggers), and calls render() once they are complete

By separating our concerns, we reduce the cognitive requirement to work with any part of the application.  We simply don't have to know how the whole thing works at once.  Instead we know the general pattern (event to state change to render) and each part can be found and worked with in isolation.  (Example: If I'm just changing state, I don't need to worry about the render function at all, since it isn't different based on the specific action)

I didn't name the files after their MVC roles because in a more involved app I might have many files covering specific portions of the different roles.  My state might be made up of multiple files, I could have many render functions for different parts of the app, and/or I might have different parts attaching state changes to events from the DOM. I could also have many other helper files that separate concerns (as we will have when we add in service calls). You should understand the _role_ of the model, view, and controller more than a need to have files with those specific names.


