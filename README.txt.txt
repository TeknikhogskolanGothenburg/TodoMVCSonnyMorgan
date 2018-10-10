Documentation for the TodoMVC project by Sonny Aasen and Morgan Berglund

Our project is built using standard HTML, CSS, Javascript. 
No frameworks were used during the developement.

We use one file for each language as it is a fairly small application.

We used a function heavy design in the javascript
where we separate heavily repeated tasks into functions we can call.
We use a global enum to separate and keep track of current chosen sort method.

For the CSS we used a Desktop-first approach with different media queries,
one query is used for bigger screens and two regulate the smaller screen designs.

Our application differs from the todomvc only visually, we used simple css
tricks to style most of the elements. One button to toggle-all checkboxes has
an image source contained within the app folder.
We chose not to use many images because the defaults have good styling options and do not
need fallback incase of incompatability.

