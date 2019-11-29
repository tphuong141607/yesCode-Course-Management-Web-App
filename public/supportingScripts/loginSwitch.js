// CSS switch color

$('.student').click(function () {
	console.log("a");
 	$(this).addClass('accountSelected');
 	$('.faculty').removeClass('accountSelected');
});

$('.faculty').click(function () {
 	$(this).addClass('accountSelected');
 	$('.student').removeClass('accountSelected');
});