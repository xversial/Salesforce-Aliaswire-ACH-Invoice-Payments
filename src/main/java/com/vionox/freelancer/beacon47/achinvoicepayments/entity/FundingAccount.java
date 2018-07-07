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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

/** @author Brandon Xversial */
public class FundingAccount implements Serializable {
  private static final Logger LOG = LoggerFactory.getLogger(FundingAccount.class);

  @JsonIgnoreProperties(ignoreUnknown = true)
  @SerializedName("type")
  @JsonProperty("type")
  private final AccountType type;

  @SerializedName("number")
  @JsonProperty("number")
  private final String token;

  @SerializedName("display")
  @JsonProperty("display")
  private final String name;

  @SerializedName("address")
  @JsonProperty("address")
  private final Address address;

  @JsonCreator
  public FundingAccount(
      @JsonProperty("type") AccountType type,
      @JsonProperty("number") String token,
      @JsonProperty("display") String name,
      @JsonProperty("address") Address address) {
    this.type = type;
    this.token = token;
    this.name = name;
    this.address = address;
  }

  public String getToken() {
    return token;
  }

  public String getName() {
    return name;
  }

  public Address getAddress() {
    return address;
  }

  public AccountType getType() {
    return type;
  }
}
