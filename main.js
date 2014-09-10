function renderTemplate(templateId, location, array) {
  _.each(array, function(item){
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(item);
    $(location).append(renderedTemplate);
  });
}


renderTemplate('#templates-sidebar', '.sidebar', users);
