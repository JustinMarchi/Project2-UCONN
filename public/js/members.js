// var dotenv = require("dotenv").config();
var bookTitle = "";

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  $("#bookSearchBtn").on("click", function (event) {
    event.preventDefault();

    bookTitle = $("#bookSearch").val().trim();
    if (bookTitle === "") {
      return false;
    } else {
      renderBookList();
    }
  });

  async function renderBookList() {
    var bookURL = "https://www.googleapis.com/books/v1/volumes?q=" + bookTitle + "&printType=books&projection=lite&filter=paid-ebooks&key=AIzaSyBVpRTlm_pSLFlxrxmLLBohmyeG2R8QbWQ";

    var response = await $.ajax({
      url: bookURL,
      method: "GET",
    })
    console.log(response.items);

    var displayBookDiv = $("<div id=booksFound>");
    var bookTable = $("<table class=highlight>");
    var bookTableHead = $("<thead>");
      bookTable.append(bookTableHead);
    var headTableRow = $("<tr>");
    var headTableImg = $("<th>").text("Cover Image");
      headTableRow.append(headTableImg);
    var headTableTitle = $("<th>").text("Title");
      headTableRow.append(headTableTitle);
    var headTableReview = $("<th>").text("Review");
      headTableRow.append(headTableReview);
      bookTableHead.append(headTableRow);
    var bookTableBody = $("<tbody>");
      bookTable.append(bookTableBody);

      // if(response.length === 0){
      //   var noBooks = $("<tr>").text("**NO MATCHING BOOKS FOUND**");
      //   noBooks.addClass("noBooks");
      //   bookTable.empty();
      //   bookTable.append(noBooks);
      // }

    let i=0;
      while (i<response.items.length){
        var getBookImage = response.items[i].volumeInfo.imageLinks.smallThumbnail;
        var getTitle = response.items[i].volumeInfo.title;

        var bodyTableRow = $("<tr>");
        var bodyShowImage = $("<td>").html("<img src='"+getBookImage+"'/>");
          bodyTableRow.append(bodyShowImage);
        var bodyShowTitle = $("<td>").text(getTitle);
          bodyTableRow.append(bodyShowTitle)
        var bodyReviewButton = $("<td>").html("<a href='/writereviews.html' class='waves-effect waves-light btn-small cyan lighten-1 review'><i class='material-icons left'>border_color</i>Write a review</a>");
          bodyTableRow.append(bodyReviewButton);

        i++;
        bookTableBody.append(bodyTableRow);
      }
    displayBookDiv.append(bookTable);
    $(".bookList").html(displayBookDiv);

  }
});