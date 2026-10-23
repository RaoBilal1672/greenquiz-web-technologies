const QUESTION_BANK = {

  HTML: [
    {
      q: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Link", "Home Tool Markup Language"],
      answer: 0
    },
    {
      q: "Which tag is used to create a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: 0
    },
    {
      q: "Which tag defines the largest heading?",
      options: ["<h6>", "<head>", "<h1>", "<title>"],
      answer: 2
    },
    {
      q: "Which attribute gives alternative text for an image?",
      options: ["title", "alt", "src", "href"],
      answer: 1
    },
    {
      q: "Which tag inserts a single line break?",
      options: ["<lb>", "<break>", "<nl>", "<br>"],
      answer: 3
    },
    {
      q: "Which tag defines an unordered (bullet) list?",
      options: ["<ul>", "<ol>", "<li>", "<dl>"],
      answer: 0
    },
    {
      q: "Which element contains the visible content of a web page?",
      options: ["<head>", "<body>", "<html>", "<title>"],
      answer: 1
    },
    {
      q: "Which input type creates a checkbox?",
      options: ["type=\"check\"", "type=\"tick\"", "type=\"checkbox\"", "type=\"box\""],
      answer: 2
    },
    {
      q: "Which tag defines a table row?",
      options: ["<tr>", "<td>", "<th>", "<row>"],
      answer: 0
    },
    {
      q: "Which HTML5 tag is meant for a block of navigation links?",
      options: ["<navigate>", "<links>", "<menu-bar>", "<nav>"],
      answer: 3
    },
    {
      q: "Which attribute makes a form field compulsory?",
      options: ["required", "mandatory", "validate", "needed"],
      answer: 0
    },
    {
      q: "Which tag is used to include JavaScript in a page?",
      options: ["<js>", "<script>", "<javascript>", "<code>"],
      answer: 1
    },
    {
      q: "Which tag sets the title shown on the browser tab?",
      options: ["<header>", "<meta>", "<head>", "<title>"],
      answer: 3
    },
    {
      q: "Which tag creates a dropdown list?",
      options: ["<select>", "<dropdown>", "<list>", "<option>"],
      answer: 0
    },
    { q: "What is the correct first line of every HTML5 document?",
      options: ["<html5>", "<!DOCTYPE html>", "<!HTML>", "<doctype>"], answer: 1 }
  ],

  CSS: [
    {
      q: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      answer: 2
    },
    {
      q: "Which property changes the text color?",
      options: ["color", "font-color", "text-color", "foreground"],
      answer: 0
    },
    {
      q: "Which property adds space INSIDE an element's border?",
      options: ["margin", "padding", "spacing", "gap-inside"],
      answer: 1
    },
    {
      q: "Which property adds space OUTSIDE an element's border?",
      options: ["padding", "outline", "margin", "border-space"],
      answer: 2
    },
    {
      q: "How do you select the element with id=\"main\"?",
      options: ["#main", ".main", "main", "*main"],
      answer: 0
    },
    {
      q: "How do you select all elements with class=\"box\"?",
      options: ["#box", "box", "*box", ".box"],
      answer: 3
    },
    {
      q: "Which property makes text bold?",
      options: ["font-style", "font-weight", "text-bold", "bold"],
      answer: 1
    },
    {
      q: "Which declaration turns an element into a flex container?",
      options: ["display: flex;", "flex: container;", "layout: flex;", "position: flex;"],
      answer: 0
    },
    {
      q: "Which property sets the background color?",
      options: ["bgcolor", "color-background", "background-color", "back-color"],
      answer: 2
    },
    {
      q: "Which property rounds the corners of an element?",
      options: ["corner-radius", "border-radius", "round", "border-curve"],
      answer: 1
    },
    {
      q: "Which unit is relative to the font size of the parent element?",
      options: ["px", "cm", "pt", "em"],
      answer: 3
    },
    {
      q: "Which property controls the stacking order of overlapping elements?",
      options: ["z-index", "stack", "order-index", "layer"],
      answer: 0
    },
    {
      q: "Which position value keeps an element fixed relative to the browser window?",
      options: ["static", "relative", "fixed", "sticky-window"],
      answer: 2
    },
    {
      q: "What are CSS media queries mostly used for?",
      options: ["Playing videos", "Responsive design", "Adding images", "Writing JavaScript"],
      answer: 1
    },
    { q: "Which property aligns text to the center?",
      options: ["text-align: center;", "align-text: middle;", "font-align: center;", "text-center: true;"], answer: 0 }
  ],

  JavaScript: [
    {
      q: "Which keyword declares a constant in JavaScript?",
      options: ["var", "let", "const", "static"],
      answer: 2
    },
    {
      q: "Which symbol starts a single-line comment in JavaScript?",
      options: ["#", "//", "<!--", "**"],
      answer: 1
    },
    {
      q: "Which statement prints a message to the browser console?",
      options: ["print('Hi')", "echo('Hi')", "console.write('Hi')", "console.log('Hi')"],
      answer: 3
    },
    {
      q: "Which operator checks both value and type equality?",
      options: ["==", "=", "===", "!="],
      answer: 2
    },
    {
      q: "Which of these is a correct way to write an array?",
      options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
      answer: 0
    },
    {
      q: "Which array method adds an item to the END of an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      answer: 1
    },
    {
      q: "What does typeof \"hello\" return?",
      options: ["\"text\"", "\"char\"", "\"word\"", "\"string\""],
      answer: 3
    },
    {
      q: "Which function converts a string into an integer?",
      options: ["parseInt()", "toInteger()", "int()", "Number.string()"],
      answer: 0
    },
    {
      q: "Which method selects an element by its id?",
      options: ["document.getElement('id')", "document.getElementById()", "document.selectId()", "document.findById()"],
      answer: 1
    },
    {
      q: "Which event fires when a user clicks a button?",
      options: ["onpress", "hover", "click", "tap"],
      answer: 2
    },
    {
      q: "Which loop is normally used to repeat code a fixed number of times?",
      options: ["for", "if", "switch", "try"],
      answer: 0
    },
    {
      q: "What does NaN stand for?",
      options: ["No answer name", "Not a Number", "New array number", "Null and None"],
      answer: 1
    },
    {
      q: "Which method converts a JSON string into a JavaScript object?",
      options: ["JSON.stringify()", "JSON.object()", "JSON.parse()", "JSON.convert()"],
      answer: 2
    },
    {
      q: "Which is the correct way to define a function?",
      options: ["function myFunc() {}", "def myFunc() {}", "func myFunc() {}", "create myFunc() {}"],
      answer: 0
    },
    { q: "Which array method creates a NEW array by transforming every element?",
      options: ["forEach()", "map()", "splice()", "reverse()"], answer: 1 }
  ],

  Bootstrap: [
    {
      q: "What is Bootstrap?",
      options: ["A database", "A programming language", "A CSS framework for responsive websites", "A web browser"],
      answer: 2
    },
    {
      q: "Which class creates a fixed-width responsive container?",
      options: [".container", ".wrapper", ".box-fixed", ".page"],
      answer: 0
    },
    {
      q: "How many columns are there in the Bootstrap grid system?",
      options: ["6", "10", "16", "12"],
      answer: 3
    },
    {
      q: "Which classes create a blue primary button?",
      options: ["btn btn-blue", "btn btn-primary", "button primary", "btn-main"],
      answer: 1
    },
    {
      q: "Which class makes an image scale responsively?",
      options: ["img-responsive", "img-auto", "img-fluid", "img-resize"],
      answer: 2
    },
    {
      q: "Which class prefix is used for columns on medium screens?",
      options: ["col-md-", "col-m-", "col-medium-", "md-col-"],
      answer: 0
    },
    {
      q: "Which class makes a container span the full width of the screen?",
      options: ["container-full", "container-fluid", "container-wide", "full-container"],
      answer: 1
    },
    {
      q: "Which class turns an element into a flex container?",
      options: ["flex-box", "flex-on", "make-flex", "d-flex"],
      answer: 3
    },
    {
      q: "Which class adds a medium top margin (spacing level 3)?",
      options: ["mt-3", "margin-top-3", "m-top-3", "top-3"],
      answer: 0
    },
    {
      q: "Which class centers text?",
      options: ["align-center", "text-center", "center-text", "text-middle"],
      answer: 1
    },
    {
      q: "Which class is used for a dismissible message box?",
      options: [".popup", ".notice", ".alert", ".message-box"],
      answer: 2
    },
    {
      q: "Which class hides an element on all screen sizes?",
      options: ["d-none", "hidden-all", "hide", "invisible-all"],
      answer: 0
    },
    {
      q: "Which class creates a card component?",
      options: [".panel", ".tile", ".box", ".card"],
      answer: 3
    },
    {
      q: "Which class gives a table Bootstrap styling?",
      options: ["table", "grid-table", "bs-table", "data-table"],
      answer: 0
    },
    { q: "How do you add Bootstrap's CSS to a page using a CDN?",
      options: ["With a <style> tag", "With a <link> tag pointing to the CSS file", "With an <img> tag", "With a <meta> tag"], answer: 1 }
  ]
};
