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

package com.vionox.freelancer.beacon47.achinvoicepayments.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

/**
 * @author Brandon Xversial
 */
@Controller
public class WelcomeController {
    private static final Logger LOG = LoggerFactory.getLogger(WelcomeController.class);

    @RequestMapping(value = "/", method = {RequestMethod.GET})
    public String welcome(Map<String, Object> model) {
        return "welcome";
    }
}
