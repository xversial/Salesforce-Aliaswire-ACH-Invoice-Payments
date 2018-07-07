package com.vionox.freelancer.beacon47.achinvoicepayments.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Brandon Xversial
 */
public enum AccountType {
    @JsonProperty("ACH") ACH(),
    @JsonProperty("CREDIT_CARD") CREDIT_CARD();

    AccountType() {
    }
}
