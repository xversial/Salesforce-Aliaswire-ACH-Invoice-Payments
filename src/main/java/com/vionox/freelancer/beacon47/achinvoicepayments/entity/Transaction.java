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

package com.vionox.freelancer.beacon47.achinvoicepayments.entity;

import com.google.gson.annotations.SerializedName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 * @author Brandon Xversial
 */

//@Entity
public class Transaction {
    private static final Logger LOG = LoggerFactory.getLogger(Transaction.class);

    @SerializedName("billingAccount")
    int billingAccount;

    @Id
    @SerializedName("invoiceNumber")
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
