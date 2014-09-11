function renderTemplate(templateId, location, array) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(array);
    $(location).append(renderedTemplate);}

var userData = {
    image: userData.avatar_url,
    name: userData.name,
    username: userData.login,
    location: userData.location,
    email: userData.email,
    joinedDate: moment(userData.created_at).format("MMM D, YYYY"),
    followers: userData.followers,
    following: userData.following,
    starred: userStarredData.length
  };

var orgData = _.map(userOrgsData, function(org) {
  return {
    orgAvatar: org.avatar_url,
    orgName: org.login,
    orgUrl: org.url
  };
});

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
    });
  renderTemplate('#templates-user-links', 'header .content', userData);
  $.getJSON('https://api.github.com/users/NicerHugs/starred').done(function(starredData) {
    userData.starred = starredData.length;
    renderTemplate('#templates-sidebar', '.sidebar', userData);
  });

orgData.forEach(function(orgDatum){
  renderTemplate('#templates-sidebar-orgs', '.sidebar', orgDatum);
});
