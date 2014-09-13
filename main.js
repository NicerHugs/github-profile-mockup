function renderTemplate(templateId, location, model) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(model);
    $(location).append(renderedTemplate);}

function renderAllTemplates() {
  makeHeader();
  makeSidebar();
  makeOrgs();
  makeReposTab('all');

}


//to use the sortByItem function each object in the array must contain a property called sort by that has a number value.
function sortByItem(array){
    array = array.sort(function(a, b) {
      if ((a.sortBy) > (b.sortBy)) {
        return -1;
      }
      if ((a.sortBy) < (b.sortBy)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
}

function makeHeader() {
  $.getJSON('https://api.github.com/users/NicerHugs').done(function(data) {
    var userData = {
      image: data.avatar_url,
      username: data.login,
    };
    //render header template
    renderTemplate('#templates-user-links', 'header .content', userData);
  });
}

function makeSidebar() {
  $.getJSON('https://api.github.com/users/NicerHugs').done(function(data) {
    var userData = {
      image: data.avatar_url,
      name: data.name,
      username: data.login,
      location: data.location,
      email: data.email,
      joinedDate: moment(data.created_at).format("MMM D, YYYY"),
      followers: data.followers,
      following: data.following,
    };
    //render header template
    renderTemplate('#templates-user-links', 'header .content', userData);
    //add starred data to user data model
    $.getJSON('https://api.github.com/users/NicerHugs/starred').done(function(starredData) {
      userData.starred = starredData.length;
      //render sidebar template
      renderTemplate('#templates-sidebar', '.sidebar-top', userData);
    });
  });
}

function makeOrgs() {  //make orgs data model
  $.getJSON('https://api.github.com/users/NicerHugs/orgs').done(function(data){
    var orgData = _.map(data, function(org) {
      return {
        orgAvatar: org.avatar_url,
        orgName: org.login
      };
    });
    orgData.forEach(function(orgDatum){
      renderTemplate('#templates-sidebar-orgs', '.org-imgs', orgDatum);
    });
  });
}

function makeReposTab(filterBy) {

//make repos model
  $.getJSON('https://api.github.com/users/NicerHugs/repos').done(function(data){
    var reposData = _.map(data, function(repo) {
      return {
        repoUrl: repo.html_url,
        repoName: repo.name,
        sortBy: Date.parse(repo.updated_at),
        lastUpdated: moment(repo.updated_at).fromNow(),
        forks: repo.forks_count,
        stargazers: repo.stargazers_count,
        repoLanguage: repo.language,
        private: repo.private,
        public: !repo.private,
        description: repo.description,
        fork: repo.fork,
        source: !repo.fork,
        mirror: repo.mirror_url,
        all: true
      };
    });
    sortByItem(reposData);
// filter data to show only that which is clicked on
    var filteredReposData = reposData.filter(function(repoDatum){
      return repoDatum[filterBy] === true;});
    filteredReposData.forEach(function(repoDatum){
      renderTemplate('#templates-repos', '.repos', repoDatum);
    });
  });
}

function makeContributionsTab() {
  $.getJSON('https://api.github.com/users/NicerHugs/repos').done(function(data){
    var contributionsData = _.map(data, function(repo) {
      return {
        repoUrl: repo.html_url,
        repoName: repo.name,
        sortBy: repo.stargazers_count,
        stargazers: repo.stargazers_count,
        description: repo.description
      };
    });
    sortByItem(contributionsData);
    contributionsData = contributionsData.slice(0,5);
    contributionsData.forEach(function(contrDatum){
      renderTemplate('#popular-repos', '.popular-repos', contrDatum);
    });
  });
}

makeContributionsTab();

  $('.filter li').on('click', function(){
  var clickedID = $(this).attr('id');
  var filterBy = clickedID.slice(7);
  $('.repo').remove();
  makeReposTab(filterBy);
});

//click action to make clicked elements active
function makeActiveMultiItem(element) {
  $(element).on('click', function(){
    $(element).removeClass("active");
    $(this).addClass("active");
  });
}

makeActiveMultiItem('.filter li');
makeActiveMultiItem('.tabs span');

function makeActiveUniqueItem(className){
  $(className).siblings().removeClass('active');
  $(className).addClass('active');
}

function displaySelectedTab(){
  $('.tabs span').on('click', function(){
    var tabString = $(this).text();
    tabString = tabString.toLowerCase();
    var tabArray = tabString.split(" ");
    var tabID = "#" + tabArray.join("-") + "-tab";
    var tabClass = "." + tabArray.join("-") + "-tab";
    $(tabID).on('click', makeActiveUniqueItem(tabClass));
  });
}


renderAllTemplates();

displaySelectedTab();
