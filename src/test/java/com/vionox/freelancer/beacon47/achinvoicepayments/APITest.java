/*
 * Part of the ach-invoice-payments project.
 *
 * NOTICE OF LICENSE
 *
 * Copyright (C) Brandon Donaly - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Brandon Xversial <xversial@vionox.com>, July 2018
 */

package com.vionox.freelancer.beacon47.achinvoicepayments;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.junit.Test;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

/** @author Brandon Xversial */
public class APITest {
  private static final Logger LOG = LoggerFactory.getLogger(APITest.class);
  private static final String AUTH_KEY =
      "5a78f8433ffdde3023ccd49d8218bf9ff0f9418184ce20bc9c429ccace0d73a5";
  final String NAME = "nuapocapi";
  final String PASSWORD = "Abc123456";
  final String AUTH_STRING = NAME + ":" + PASSWORD;
  final URI PAYMENT_ENDPOINT =
      URI.create(
          "https://staging.aliaswire.com/bills-staging/ws/rest/transactionservice/v3/payments");

  @Test
  public void testAPICall() throws IOException {
    CloseableHttpClient client = this.buildClient();

    HttpPost req = new HttpPost();

    req.setURI(PAYMENT_ENDPOINT);


    String input =
        "{\"tv3.paymentTransaction\":{" +
        "\"billingAccount\":\"123456\"," +
        "\"invoiceNumber\":\"\"," +
        "\"fundingAccount\":" +
        "{\"@xsi.type\":\"tv3:tokenAccount\"," +
        "\"number\":\"d582ba4edf9b44d6ae4d2deaeb3a39d3\", " +
        " \"name\":\"\",}," +
        "\"txnAmount\": " +
        "{\"amount\":369.38 " +
        ",\"currency\":\"USD\"}," +
        "\"feeAmount\":" +
        "{\"amount\":0.0," +
        "\"currency\":\"USD\"}," +
        "\"deviceType\":\"WEB\"," +
        "\"description\":\"\"," +
        "\"partnerTxnId\":\"10022030\"," +
        "\"fname\":\"John\"," +
        "\"lname\":\"Doe\"," +
        "\"customerType\":\"B\"," +
        "\"email\":\"jdoe@example.com\"," +
        "\"authUserId\":\"123456\"," +
        "\"authUserRole\":\"ACCOUNTHOLDER\",}}";

    req.setEntity(new StringEntity(input));
//    req.setEntity(buildBasicRequest());

    CloseableHttpResponse response = client.execute(req);

    LOG.debug("Got a {} response", response.getStatusLine().getStatusCode());

    HttpEntity responseEntity = response.getEntity();
    Gson gson = new GsonBuilder().create();

//    JsonElement tree = gson.toJsonTree(responseEntity);
    // The EntityUtils provides useful methods to read the response content.
    // I also use the Gson lib to easily convert Json to Java objects and vise versa.
//    return gson.newJsonReader(EntityUtils.toString(responseEntity));

//    LOG.debug(String.valueOf(tree));
    StringWriter writer = new StringWriter();
    IOUtils.copy(responseEntity.getContent(), writer, Charset.forName("UTF-8"));
    LOG.debug(writer.toString());

  }

  private StringEntity buildBasicRequest()
  {
    String data = "";



    try {
      return new StringEntity(data);
    } catch (UnsupportedEncodingException ex) {
      LOG.warn(ExceptionUtils.getStackTrace(ex));
    }
    return null;
  }

  private CloseableHttpClient buildClient() {

    String authStringEnc = new BASE64Encoder().encode(AUTH_STRING.getBytes());

    HttpClientBuilder httpclient = HttpClients.custom();
    List<Header> headers = new ArrayList<Header>();

    headers.add(new BasicHeader("Content-Type", "application/json"));
    headers.add(new BasicHeader("Authorization", "Basic " + authStringEnc));
    headers.add(new BasicHeader("aw-authkey", AUTH_KEY));
    httpclient.setDefaultHeaders(headers);

    return httpclient.build();
  }
}
