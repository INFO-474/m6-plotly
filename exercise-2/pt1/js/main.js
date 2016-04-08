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

    var dialog = $('#dialog').dialog();
    if (isAuth()) {
        dialog.dialog("close");
        updateUserInfoUI();
        getRepos("mkfreeman", "drstearns", buildBarGraph);
    }
    $("#form-submit").on("click", function() {
        githubAuth();
        dialog.dialog("close");
        // A call to getRepos should get repo data for each user and the execute
        // the function given as a parameter (the callback will accept to parameters,
        // repo data for each user)
        getRepos("mkfreeman", "drstearns", buildBarGraph);
    })
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
    var userURL = "https://api.github.com/users/" + username;
    return $.ajax({
        url: userURL,
        method: "GET",
        headers: {Authorization: "Basic " + githubAuth()}
    });
}

/*
 * returns an AJAX promise (very slightly different from a normal promise)
 * which we will use to execute this same request for multiple users
 */
function getRepoCall(user) {
    // After getting the user info, use that data to request from the API
    // the user's github repositories (use a promise to do this) return $.ajax({
    return $.ajax({
        url: user.repos_url,
        method: "GET",
        headers: {Authorization: "Basic " + githubAuth()}
    });
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
    $.when(getUser(nameA), getUser(nameB))
        .done(function (user1, user2) {
            $.when(getRepoCall(user1[0]), getRepoCall(user2[0]))
            .done(function (repos1, repos2) {
                var data1 = {
                    name: nameA,
                    repos: repos1[0]
                };

                var data2 = {
                    name: nameB,
                    repos: repos2[0]
                };
                callback(data1, data2);
            });
        });
}

function formatRepoData(repoData) {
    // Make a dictionary mapping languages to total number of forks
    // for that language
    var boxData = {};
    repoData.repos.forEach(function(d) {
        if (d.language != null) {
            if (boxData[d.language] != undefined) {
                boxData[d.language] += d.forks;
            } else {
                boxData[d.language] = d.forks;
            }
        }
    });

    // Format the data so there are two arrays: a list of primary languages
    // and a list of the total forks for each language. This is necessary for
    // making plotly graphs.
    var keys = Object.keys(boxData);
    keys.sort();
    var values = keys.map(function(l) {
        return boxData[l];
    });

    // Using plotly make a bar graph trace with languages on the x axis and
    // The number of forks for repositories with that language as the
    // primary language on the Y-axis. Your function should return this trace.
    bars = {
        x: keys,
        y: values,
        type: 'bar',
        name: repoData.name
    };
    return bars;
}

function buildBarGraph(data1, data2) {

    // call your formatRepoData function twice to get a trace for
    // each data object and put them in an array.
    var traces = [formatRepoData(data1), formatRepoData(data2)];

    // Using a layout object to set the title of the graph
    // and set the mode to be a grouped bar chart. You should
    // also use this to label the x- and y- axis
    var layout = {
        title: 'Forks vs Github Repository Primary Language',
        barmode: 'group',
        xaxis: {
            title: "Primary Programming Languages"
        },
        yaxis: {
            title: "# of Forks"
        },
        hovermode: 'closest'
    }

    // call Plotly.newPlot to draw a plotly graph in the dive with an
    // id myDiv with the traces array and layout object you made.
    Plotly.newPlot('myDiv', traces, layout);
}

function isAuth() {
    if (localStorage['auth'] == undefined) {
        return false;
    } else {
        return true;
    }
}

function githubAuth() {
    var auth;
    // Caches a hashed version of user's github credentials so
    // they don't have to log in every time the page reloads.
    if (localStorage['auth'] == undefined) {
        // Super quick/simple github user authorization
        var uname = $("#uname").val();
        var pw = $("#pass").val();
        auth = btoa(uname + ":" + pw); // Encodes string to base-64
        localStorage['auth'] = auth;
        localStorage['uname'] = uname;
        $("#uname").val("");
        $("#pass").val("");
    } else {
        auth = localStorage['auth'];
    }
    updateUserInfoUI();
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
