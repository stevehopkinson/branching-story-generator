# Multi-path story generator: design report

## Approach to design

The application consists of three parts:

- A _model_, which keeps track of the story so far and provides an interface to the rest of the app.

- A _view_, which displays selected sentences and their paths to the user and allows them to create new sentences and view existing paths.

- A _controller_, which receives user inputs entered through the view and updates the model accordingly.

### The model

The model needs to provide an interface - a way that the rest of the app can access sentences and create new ones. This interface will require three functions:

- ```getSentence```: Retrieve a specific sentence from the model when given a unique id.
- ```getChildId```: Retrieve the id of one of the sentences branching off from a previous one, given the id of the parent and the 'compass direction' of the 'child'.
- ```addSentence```: Add a new branching sentence to a previous sentence, given a text string, the id of the previous sentence, and the 'compass direction' that it branches off in.

By defining the model in terms of these three interface functions, it is possible to easily change the inner working of the model without affecting the app as a whole.

### The view

The view needs to display information about a selected sentence and its four branches (whether they currently have sentences assigned or not) in a three-by-three grid. It also needs to act as an interface to create new branching sentences or navigate to a branch that has already been created.

To do this, it needs to receive specific data about the currently selected ('parent') sentence and each of its four potential paths ('children'):

- __Parent__: The id of the parent sentence and its text string (to display in the central cell of the view grid.)
- __Child__: The 'compass point' of the parent sentence it branches from (expressed as a lower-case ```n```, ```e```, ```s``` or ```w```). If this branch has already been created, then it should also include the its text content (so it can be displayed in the child cell) and the child's id (so the user can select it).

### The controller

The controller sits between the model and the view, and performs two functions:

- Receiving requests to see a specific sentence from the user, and passing the relevant data from the model to the view.
- Receiving requests to create new sentences from the user, and updating the model accordingly.

## Approach to implementation

### The model

As described in the brief, the model needs to record a number of _sentences_, and each sentence also needs record references to the multiple sentences that the user could select next.

The first decision was whether to store the model in a separate _database_ or in an object on the _server_. As the application is relatively simple and is not require to persist data, storing data on the server was chosen as the cleaner solution to implement.

The second implementation decision was whether to use a _nested_ structure, where each parent child contains its children, or a _flat_ structure, where all sentences sit at the same level and the parent only records a unique id for each child.

This app uses a flat structure. By adopting a flat structure, it is easier to retrieve specific sentences from the model no matter how deep the story. In contrast, a nested structure makes sentences more difficult to retrieve as they grow 'deeper' - both in performance and ease of identification.

Another key decision was whether the model should hold _all of data about each sentence and its children necessary to show it in the view_, or only the _minimum amount needed to describe the current state of the story_.

For this app, only the minimum relevant data is stored in the model. While this makes it necessary for the controller to perform additional process on each 'sentence' to add additional data before displaying it to the user, the pros outweigh the cons: it makes it simpler to update the model, and makes the model _independent of the view_. This means that the view can be updated in future without requiring changes to the model.

### The view

When implementing the view to the design described above, it was necessary to decide whether to write _custom logic_ to build the view from the model data, or to make use of a pre-built _templating engine_ that can generate views from data simply. To save spending unnecessary time writing custom logic, and take advantage of more advanced features, this app uses the templating engine __Handlebars__.

The second decision was whether to use _a single template to build the entire view_, or to _use a separate template to build the child cells_ and use those to assemble the full view. As each child cell uses identical logic, the app uses a separate template to build each of their views, which guarantees that each one will have the same appearance and behaviour.

It was also important to decide how the view would communicate the user's actions to the controller, without using JavaScript on the client side. This app uses simple HTML functionality for those actions: requesting a sentence is handled through a link pointing to that sentence's unique id, and creating a new sentence is handled through an HTML form.

Finally, to ensure that the interface matches the design shown in the brief, a stylesheet is applied to the main table element. Rather than adding styling within the code of the view itself, which would clutter the appearance and make it harder to update, a separate stylesheet was created on the server.

### The controller

To handle requests from the view, the app uses the __Express__ server framework. Express features pre-built modules to handle interactions with the view - dynamically showing the user different views for different ids, building templates using Handlebars, and sending the user the stylesheet file. This meant it could be set up quickly without having to write additional code.


## Shortcuts

The server will only run on a single port (8000). If that port isn't open when the user tries to run the application, the server will crash and the application won't start.

The project was built without automated tests. This meant that functionality had to be tested manually after every change. This was manageable for a project of this size, but if the project was ever expanded in future then this would make it more difficult to identify and isolate changes that break the functionality.

The project doesn't use a linter to ensure consistent code styling. While this was fine while working as an individual on a relatively small body of code, it would quickly lead to inconsistencies when working with a team or at larger scales.

The project also uses default settings for Express's middleware (serve-static and express-handlebars), resulting in an overly complex folder structure given the size of the project.


## What this challenge is testing

I believe that this code challenge tests the candidate's ability to:
- Create a dynamic web application.
- Write simple APIs.
- Build appropriate data models.
- Choose the right tools for the job.
- Avoid over-engineering or over-optimisation.
- Communicate technical decisions to a non-technical client.
- Write clear documentation.
