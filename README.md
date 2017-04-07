# giftr

Create a Cordova Android App that lets people store gift ideas.

There will be two mains screens and two modal popups. The first screen is the list of people that you have added to the app along with their birthdays. Each person will have an arrow to navigate to the second page, a list of gift ideas for that person. The person screen will also have a button to open a modal popup to add a new person. Clicking on a person's name from the list, will also open the same modal popup but it allows the user to edit the person instead of adding a new one.

On the gift page there will be a button for adding a new idea to the list. The modal popup for adding gifts will ask for the idea, the location where it can be bought, a URL where it can be found online, and a cost. The list of gifts will display the idea and then optionally the other three things about the idea. If any of the other fields are empty then they are not displayed in the list. There will also be a delete button for each idea so it can be removed.

All the data needs to be saved in localStorage. Use the key "giftr-abcd0001", but replace the abcd0001 with your own username.
