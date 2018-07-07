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
