function renderTemplate(templateId, location, array) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(array);
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
