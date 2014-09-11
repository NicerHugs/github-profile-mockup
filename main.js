function renderTemplate(templateId, location, array) {
  _.each(array, function(item){
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(item);
    $(location).append(renderedTemplate);
  });
}

var userData = _.map(userData, function(user) {
  return {
    image: user.avatar_url,
    name: user.name,
    username: user.login,
    location: user.location,
    email: user.email,
    joinedDate: moment(user.created_at).format("MMM D, YYYY"),
    followers: user.followers,
    following: user.following,
    starred: userStarredData.length,
    orgs: _.map(userOrgsData, function(org){
      return {orgName: org.login, orgAvatar: org.avatar_url
      };})
  };
});

var orgData = _.map(userOrgsData, function(org) {
  return {
    orgAvatar: org.avatar_url,
    orgName: org.login,
    orgUrl: org.url
  };
});

$.getJSON('https://api.github.com/users/NicerHugs').done(function(data) {
  var userData = _.map([data], function(i) {
    return {
      image: i.avatar_url,
      name: i.name,
      username: i.login,
      location: i.location,
      email: i.email,
      joinedDate: moment(i.created_at).format("MMM D, YYYY"),
      followers: i.followers,
      following: i.following};
    });
  renderTemplate('#templates-user-links', 'header .content', userData);
  $.getJSON('https://api.github.com/users/NicerHugs/starred').done(function(starredData) {
    userData[0].starred = starredData.length;
    renderTemplate('#templates-sidebar', '.sidebar', userData);
  });
});


renderTemplate('#templates-sidebar-orgs', '.sidebar', orgData);
