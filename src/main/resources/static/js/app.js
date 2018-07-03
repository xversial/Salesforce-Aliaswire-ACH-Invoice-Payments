function submitACHPayment(event) {
    event.preventDefault();
    var form = $(this);

    $.ajax({
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        url: form.attr('action'),
        data: {email: email.val()},
        dataType: "json"
    }).done(function (response) {
        console.log(response);
    });
}

$(document).ready(function () {
    $('#ach-payment-form').submit(submitACHPayment);
});