var PUBLIC_ALIAS_WIRE_KEY = 'pk_test_59a973aa4b8bf9fa80bea9fd9cbd4ec8bf619b7fc6720320e3424178';
var serverAPIEndpoint = null;

function __awGetToken(form) {

    /////////////////////////////////////////////////////////////////////////
    //// Collect Input Variables (using JavaScript or jQuery)
    ////////////////////////////////////////////////////////////////////////

    // -------------------------------------------------------------------
    // javascript style of getting value from form using id.
    // alert(document.getElementById('cardNo').value);

    //jquery style of getting value by id
    //alert($('#cardNo').val());
    // -------------------------------------------------------------------

    //get the credit card number, expiration, zip code, CVV etc values from html page
    var accountType = form.find('#AccountType').val();
    var accountNumber = form.find('#AccountNumber').val();
    var routingNumber = form.find('#RoutingNumber').val();

    /////////////////////////////////////////////////////////////////////////
    //// Build the API Object
    ////////////////////////////////////////////////////////////////////////

    //aliaswire javascript REST based api object
    var aw = new AWAPI.TS();

    //create credit card account token object
    var awTokenObject = aw.createAchAccountToken(accountNumber, routingNumber, accountType);

    /////////////////////////////////////////////////////////////////////////
    //// Send the request to get a token
    ////////////////////////////////////////////////////////////////////////

    // send the request using published key. The token is returned to the response handler
    aw.requestToken(
        awTokenObject,
        __awResponse,
        PUBLIC_ALIAS_WIRE_KEY,
        'aw-publishedkey');

}
function __awResponse(obj, resultCode, detailReason, str, httpStatus) {
    if (resultCode == "A000") {
        var token = obj.getToken();
        var data = {
            resultCode: resultCode,
            FundingAccount: {
                type: 'ACH',
                number: token.getNumber(),
                display: token.getDisplay(),
                address: token.getAddress()
            }
        };
        sendData(data);
    } else

    {
        $('#errmsg').html('<b>' + "Error: ResultCode[" + resultCode + "] DetailReason[" + detailReason + "]" + '</b>');
        $('#errmsg').css('display', 'block');
        $('#errmsg').delay(10000).fadeOut();
        //alert("Error: ResultCode[" + resultCode + "] DetailReason[" + detailReason + "]");
    }
}


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
        url: serverAPIEndpoint,
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

    serverAPIEndpoint = form.attr('action');
    var token = __awGetToken(form);
}

$(document).ready(function () {
    $('#ach-payment-form').submit(submitACHPayment);
});