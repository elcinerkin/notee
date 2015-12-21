angular.module('noteeApp')
.directive('noteeDelete', ['$http', 'ENV', '$rootScope', function($http, ENV, $rootScope) {
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
	  			$rootScope.$emit('noteDeleted');	  			
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
}])
.directive('noteeEdit', ['$http', 'ENV', '$rootScope', function($http, ENV, $rootScope) {
  function link(scope, element, attrs){
    element.css({
      position: 'absolute',
      display: 'none',
      top: '7px',
      left: '10px',
      zIndex: '999',
      cursor: 'pointer'
    });
    element.bind('click', function(event){
      event.stopPropagation();
      $rootScope.$emit('toggleEditMode');
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
    template: "<span class='glyphicon glyphicon-edit' ></span>",
    link: link
  };
}])
.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});