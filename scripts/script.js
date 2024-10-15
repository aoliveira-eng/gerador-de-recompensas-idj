$(function () {
	$('#generateButton').click(function () {
		var ndSelector = parseInt($('#ndSelector').val());
		$.ajax({
			url: 'http://127.0.0.1:5000/generate',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ value: ndSelector }),
			success: function (response) {
				$('#result').text(response.result);
			},
			error: function (xhr) {
				$('#result').text('Erro: ' + xhr.responseJSON.error);
			},
		});
	});
});
