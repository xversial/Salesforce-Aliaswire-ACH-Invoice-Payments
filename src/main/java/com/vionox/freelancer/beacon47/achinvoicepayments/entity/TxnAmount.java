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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Brandon Xversial
 */
public class TxnAmount {
    private static final Logger LOG = LoggerFactory.getLogger(TxnAmount.class);

    private final double amount;
    private final String currency;

    public TxnAmount(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public double getAmount() {
        return amount;
    }

    public String getCurrency() {
        return currency;
    }
}
