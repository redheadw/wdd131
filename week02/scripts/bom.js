// Basic page init: footer year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/*
    Declare variables referencing the input, button, and list.
  */
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // copied from activity

// Example: create elements (li + delete button) and set their content/attributes.
// This is shown as a function for clarity.
function buildChapterItem(text) {
  // Create the list item
  const li = document.createElement('li');

  // Set text content 
  li.textContent = text;

  // Create a delete button and set its label
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('aria-label', `Delete ${text}`);

  // Demonstrate classList and style manipulation 
  li.classList.add('chapter-item');
  li.style.textAlign = 'left'; // example inline style

  // Append button to li, then li to the list
  li.append(deleteButton);
  list.append(li);

  // Return the li so it’s easy to wire up events next time
  return li;
}


