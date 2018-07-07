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

import com.vionox.freelancer.beacon47.achinvoicepayments.entity.FundingAccount;
import com.vionox.freelancer.beacon47.achinvoicepayments.entity.TxnAmount;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.misc.BASE64Encoder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

/**
 * @author Brandon Xversial
 */
public class AliasWirePayment {
    private static final Logger LOG = LoggerFactory.getLogger(AliasWirePayment.class);

    public static String makePayment(
            FundingAccount fundingAccount, TxnAmount amount) {

        try {
            return getJsonResponse(amount, fundingAccount.getToken());
        } catch (IOException ex) {
            LOG.warn(ExceptionUtils.getStackTrace(ex));
        }

        return null;
    }


    public static String getJsonResponse(TxnAmount bamount, String btoken) throws IOException, ProtocolException {

        String output = "";
        StringBuilder retJson = new StringBuilder();

        String name = "nuapocapi";
        String password = "Abc123456";
        String authString = name + ":" + password;

        String authStringEnc = new BASE64Encoder().encode(authString.getBytes());

        URL url = new URL("https://staging.aliaswire.com/bills-staging/ws/rest/transactionservice/v3/payments");

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setDoOutput(true);

        conn.setRequestMethod("POST");

        // conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE
        // 6.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; .NET CLR
        // 1.2.30703)");

        // conn.setInstanceFollowRedirects(false);

        conn.setRequestProperty("Content-Type", "application/json");

        conn.setRequestProperty("Authorization", "Basic " + authStringEnc);

        conn.setRequestProperty("aw-authkey", "5a78f8433ffdde3023ccd49d8218bf9ff0f9418184ce20bc9c429ccace0d73a5");

        // java.lang.System.setProperty("https.protocols",
        // "TLSv1,TLSv1.1,TLSv1.2");

        String input =
                "{\"tv3.paymentTransaction\":{ \"billingAccount\":\"123456\", \"invoiceNumber\":\"\", " +
                "\"fundingAccount\": {\"@xsi.type\":\"tv3:tokenAccount\", \"number\":" +
                btoken + ", \"name\":\"\", }, \"txnAmount\": {\"amount\":" + bamount.getAmount() +
                " ,\"currency\":\""+ bamount.getCurrency() +"\"}, \"feeAmount\": {\"amount\":0.0, \"currency\":\"USD\"}, " +
                "\"deviceType\":\"WEB\", \"description\":\"\", \"partnerTxnId\":\"10022030\", \"fname\":\"John\", " +
                "\"lname\":\"Doe\", \"customerType\":\"B\", \"email\":\"jdoe@example.com\", " +
                "\"authUserId\":\"123456\", \"authUserRole\":\"ACCOUNTHOLDER\", }}";

        System.out.println(input);

        OutputStream os = conn.getOutputStream();

        os.write(input.getBytes());

        os.flush();

        BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

        // String output;

        System.out.println("Output from Server .... \n");

        while ((output = br.readLine()) != null) {

            System.out.println(output);
            retJson.append(output);

        }

        conn.disconnect();

        return retJson.toString();

    }
}
