// Don't execute any code until everything is on the DOM
// since we're manipulating the DOM
$(document).ready(function() {
    // Some starter code.
    // Sign out removes user info from localStorage
    $('#sign_out').on('click', function() {
        delete localStorage['auth'];
        delete localStorage['uname'];
        updateUserInfoUI();
    });
    githubAuth();
    updateUserInfoUI();

    // A call to getRepos should get repo data for each user and the execute
    // the function given as a parameter (the callback will accept to parameters,
    // repo data for each user)
    var data = getRepos("mkfreeman", "drstearns", buildBarGraph);
});

/*
 * Retrieves user data from github. We are just returning the AJAX call,
 * not the actual data
 *
 * returns a promise
 */
function getUser(username) {
    // Make a reqest to the Github REST api for data about the user
    // with a username stored in the parameter 'username'
}

/*
 * returns an AJAX promise (very slightly different from a normal promise)
 * which we will use to execute this same request for multiple users
 */
function getRepoCall(user) {
    // After getting the user info, use that data to request from the API
    // the user's github repositories (use a promise to do this) return $.ajax({
}

/*
 * Gets repo data with multiple AJAX calls using AJAX's 'when' function
 */
function getRepos(nameA, nameB, callback) {
    // Use $.when to run the getUser ajax call on each username
    // This will return two objects (one for each reponse). Use these
    // requests with another $.when call and getRepoCall to get user data.
    // Then call the callback that was passed with the repo data as a parameter
    //
    // Note: you will need to give the callback the data in the format
    // {
    //  name: "user",
    //  repos: repoData
    // } 
}

function formatRepoData(repoData) {
    // Make a dictionary mapping languages to total number of forks
    // for that language




    // Format the data so there are two arrays: a list of primary languages
    // and a list of the total forks for each language. This is necessary for
    // making plotly graphs.
    


    // Using plotly make a bar graph trace with languages on the x axis and
    // The number of forks for repositories with that language as the
    // primary language on the Y-axis. Your function should return this trace.



}

function buildBarGraph(data1, data2) {

    // call your formatRepoData function twice to get a trace for
    // each data object and put them in an array.


    // Using a layout object to set the title of the graph
    // and set the mode to be a grouped bar chart. You should
    // also use this to label the x- and y- axis



    // call Plotly.newPlot to draw a plotly graph in the dive with an
    // id myDiv with the traces array and layout object you made.

}

function githubAuth() {
    var auth;
    // Caches a hashed version of user's github credentials so
    // they don't have to log in every time the page reloads.
    if (localStorage['auth'] == undefined) {
        // Super quick/simple github user authorization
        var uname = prompt("Github username:");
        var pw = prompt("Github password:");
        auth = btoa(uname + ":" + pw); // Encodes string to base-64
        localStorage['auth'] = auth;
        localStorage['uname'] = uname;
    } else {
        auth = localStorage['auth'];
    }
    return auth;
}

/*
 * Shows and hides user info and sign out button as necessary
 */
function updateUserInfoUI() {
    if (localStorage['auth'] == undefined) {
        $('.links').hide();
    } else {
        $('.links').show();
        $('#username').text(localStorage['uname']);
    }
}
