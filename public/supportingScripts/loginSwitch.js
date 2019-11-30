// CSS switch color

$('.student').click(function () {
 	$(this).addClass('accountSelected');
 	$('.faculty').removeClass('accountSelected');
    $('#account_type').val('student');
});

$('.faculty').click(function () {
 	$(this).addClass('accountSelected');
 	$('.student').removeClass('accountSelected');
	$('#account_type').val('faculty');
});