package com.vionox.freelancer.beacon47.achinvoicepayments.entity;

import com.google.gson.annotations.SerializedName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Brandon Xversial
 */


public class Transaction {
    private static final Logger LOG = LoggerFactory.getLogger(Transaction.class);

    @SerializedName("billingAccount")
    int billingAccount;

    @SerializedName("billingAccount")
    int invoiceNumber;
    DeviceType deviceType;

    String description;
    int partnerTxnId;

    String fname;
    String lname;
    String customerType;
    String email;

    int authUserId;

    String ACCOUNTHOLDER;
}
