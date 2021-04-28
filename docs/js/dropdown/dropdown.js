/* Kindly donated from: https://www.w3schools.com/howto/howto_js_dropdown.asp
*/

//----------------------------------------------------------------------
// Name: Alan Poblette
// File: dropdown.js
// Date: Spring 2021
// Desc: A collection of functions to implement a dropdown menu for my A* search
//   project. I used the above link for help.
//----------------------------------------------------------------------


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function handleDrop(event) {
    document.getElementById("graphDropdown").classList.toggle("show");
}

/* Sets the text of the selected graph based on what was clicked. */
function handleGraphSelection(event) {
    // change dropdown menu text
    var label = document.getElementById('dropdownLabel');
    label.innerHTML = "Selected Graph: " + event.target.innerText;
}

// Close the dropdown if the user clicks outside of it
// and also handle graph selection
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        if (event.target.matches('a')) {
            handleGraphSelection(event);
        }

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;

        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];

            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}