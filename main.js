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

renderTemplate('#templates-user-links', 'header .content', userData);

renderTemplate('#templates-sidebar', '.sidebar', userData);
renderTemplate('#templates-sidebar-orgs', '.sidebar', orgData);
