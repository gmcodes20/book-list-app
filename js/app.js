// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td> <a href='#' class = 'delete'> X</a> </td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  //  create Div element
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));

  // get parent
  const container = document.querySelector(".container");
  // get form
  const form = document.querySelector("#book-form");
  // insert alert
  container.insertBefore(div, form);

  // timeout after 3 sec
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBooks = function (target) {
  if (target.className === "delete") {
    if (confirm("Are you sure you want to remove this book?")) {
      target.parentElement.parentElement.remove();
      const ui = new UI();
      ui.showAlert("Book Removed!", "success");
    }
  }
};

// clearfields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form Elements
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  // Instatiate UI

  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("please fill in all fields", "error");
  } else {
    //  Add book to list
    ui.addBookToList(book);
    ui.showAlert("Book added sucessfully", "success");

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// even listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instatiate UI

  const ui = new UI();

  ui.deleteBooks(e.target);
  // show message

  e.preventDefault();
});
