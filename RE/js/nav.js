angular
	.module("requirements", [])
	//Alles ab hier controller
	.controller("NavCtrl", function($scope) {
	var oldActive;
			$('#main-nav li a').on('click', function() {
				if($(this).attr('id') != "download_reqs") {
					$(this).parent().parent().find('.active').removeClass('active');
					$(this).parent().addClass('active');
				}
			});
});