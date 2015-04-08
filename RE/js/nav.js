angular
	.module("requirements", [])
	//Alles ab hier controller
	.controller("NavCtrl", function($scope) {
	
		$('#main-nav li a').on('click', function() {
		$(this).parent().parent().find('.active').removeClass('active navlist');
		$(this).parent().addClass('active navlist');
	})
});