function getToken()
{

}

function sendData(data)
{
    $.ajax({
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        url: form.attr('action'),
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
    }).done(function (response) {
        console.log(response);
    });
}

function submitACHPayment(event) {
    event.preventDefault();
    var form = $(this);
    var accountType = form.find('#AccountType');

    var data = {
        payment: {
            method: 'ACH',
            account: {
                type: accountType.val(),
            }
        },
        // email: email.val()
    };
    sendData(data);
}

$(document).ready(function () {
    $('#ach-payment-form').submit(submitACHPayment);
});