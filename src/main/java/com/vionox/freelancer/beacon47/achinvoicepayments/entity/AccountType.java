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
