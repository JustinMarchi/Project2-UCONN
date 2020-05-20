// var dotenv = require("dotenv").config();
var bookTitle = "";

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $("#bookSearchBtn").on("click", function(event) {
    event.preventDefault();

    bookTitle = $("#bookSearch").val().trim();
    if (bookTitle ===""){
      return false;
    } else {
      renderBookList();
    }
  });

  async function renderBookList() {
    var bookURL = "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key=UBE8gwrtQDEM0cjUh0luQ&q=" + bookTitle;

    var response = await $.ajax({
      url: bookURL,
      method: "GET"
    })
    console.log(response);
    
  }
});


