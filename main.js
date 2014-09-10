function renderTemplate(templateId, location, array) {
  _.each(array, function(item){
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(item);
    $(location).append(renderedTemplate);
  });
}

var sidebarModel = _.map(users, function(user) {
  return {
    image: user.avatar_url,
    name: user.name,
    username: user.login,
    location: user.location,
    email: user.email,
    joinedDate: moment(user.created_at).format("MMM D, YYYY")
  };
});

renderTemplate('#templates-sidebar', '.sidebar', sidebarModel);
