angular.module('noteeApp')
.directive('noteeDelete', ['$http', 'ENV', function($http, ENV) {
  function link(scope, element, attrs){
  	element.css({
  		position: 'absolute',
  		display: 'none',
  		top: '7px',
  		right: '10px',
  		zIndex: '999',
  		cursor: 'pointer'
  	});
  	element.bind('click', function(event){
  		event.stopPropagation();
  		if(confirm("Are you sure you want to delete the note?")){
	  		var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
	  		var deleteNoteUrl = API_NOTES_ENDPOINT + '/' + scope.note;
	  		$http.delete(deleteNoteUrl).then(function(response){  			
	  			console.log("delete successful");
	  			scope.$parent.loadData();
	  		}, function(response){
	  			console.log("delete failed");
	  		})
  		}
  	});
  	element.parent().bind('mouseenter', function() {
        element.show();
    });
    element.parent().bind('mouseleave', function() {
         element.hide();
    });
  }

  return {
  	scope: {
  		note: '='
  	},
  	transclude: true,
  	template: "<span class='glyphicon glyphicon-trash' ></span>",
  	link: link
  };
}]);