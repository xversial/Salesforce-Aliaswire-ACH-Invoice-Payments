<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">

    <!--
	<spring:url value="/css/main.css" var="springCss" />
	<link href="${springCss}" rel="stylesheet" />
	 -->
    <c:url value="/css/main.css" var="jstlCss"/>
    <link href="${jstlCss}" rel="stylesheet"/>

    <title>Hello, world!</title>

</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Spring Boot</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbar" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
        </ul>
    </div>
</nav>

<div class="container">

    <%--<div class="starter-template">--%>
        <%--<h1>Spring Boot Web JSP Example</h1>--%>
        <%--<h2>Message: ${message}</h2>--%>
    <%--</div>--%>

        <div id="response-container"></div>

    <form action="/api/v1.0/payments/make" method="post" id="ach-payment-form" enctype="application/json">

        <div class="form-group">
            <label for="AccountNumber">Account Number</label>
            <input type="number" class="form-control" id="AccountNumber" aria-describedby="AccountNumberHelp" placeholder="" value="000123456789" required>
            <small id="AccountNumberHelp" class="form-text text-muted"></small>
        </div>
        <div class="form-group">
            <label for="RoutingNumber">Routing Number</label>
            <input type="number" class="form-control" id="RoutingNumber" placeholder="" value="091000019" required>
        </div>
        <div class="form-group">
            <label for="AccountType">Account Type</label>
            <select name="AccountType" id="AccountType" class="custom-select" required>
                <option value="" disabled selected>Select bank account type</option>
                <option value="CHECKING">Checking</option>
                <option value="SAVINGS">Savings</option>
                <option value="BIZCHECKING">Business Checking</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</div>

<!-- Start Bootstrap Dependencies -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
        integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
        crossorigin="anonymous"></script>
<!-- End Bootstrap Dependencies -->

<!-- AliasWire Dependencies -->
<script src="https://staging.aliaswire.com/bills/script/awapi/transactionservice/v3.do"></script>

<!-- Application Script Dependencies -->
<c:url value="/js/app.js" var="jstlJS"/>
<script src="${jstlJS}"></script>

</body>

</html>
