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
    username: user.login
  };
});

renderTemplate('#templates-sidebar', '.sidebar', sidebarModel);
