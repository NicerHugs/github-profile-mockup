function renderTemplate(templateId, location, model) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(model);
    $(location).append(renderedTemplate);}




$.getJSON('https://api.github.com/users/NicerHugs').done(function(data) {
  var userData = {
      image: data.avatar_url,
      name: data.name,
      username: data.login,
      location: data.location,
      email: data.email,
      joinedDate: moment(data.created_at).format("MMM D, YYYY"),
      followers: data.followers,
      following: data.following};
  renderTemplate('#templates-user-links', 'header .content', userData);
  $.getJSON('https://api.github.com/users/NicerHugs/starred').done(function(starredData) {
    userData.starred = starredData.length;
    renderTemplate('#templates-sidebar', '.sidebar-top', userData);
  });
});


$.getJSON('https://api.github.com/users/NicerHugs/orgs').done(function(data){
  var orgData = _.map(data, function(org) {
    return {
      orgAvatar: org.avatar_url,
      orgName: org.login,
      orgUrl: org.url
    };
  });
  orgData.forEach(function(orgDatum){
    renderTemplate('#templates-sidebar-orgs', '.orgs', orgDatum);
  });
});

$.getJSON('https://api.github.com/users/NicerHugs/repos').done(function(data){
  var reposData = _.map(data, function(repo) {
    return {
      repoUrl: repo.html_url,
      repoName: repo.name,
      sortByDate: Date.parse(repo.updated_at),
      lastUpdated: moment(repo.updated_at).fromNow(),
      forks: repo.forks_count,
      stargazers: repo.stargazers_count,
      repoLanguage: repo.language
    };
  });
  //SORT BY DATE
  reposData = reposData.sort(function(a, b) {
    if ((a.sortByDate) > (b.sortByDate)) {
      return -1;
    }
    if ((a.sortByDate) < (b.sortByDate)) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
  reposData.forEach(function(repoDatum){
    renderTemplate('#templates-repos', '.repos', repoDatum);
  });
});

$('.filter li').on('click', function(){
  $(this).siblings().removeClass("active");
  $(this).addClass("active");
});

$('.tabs span').on('click', function(){
  $('.tabs span').removeClass("active");
  $(this).addClass("active");
});
