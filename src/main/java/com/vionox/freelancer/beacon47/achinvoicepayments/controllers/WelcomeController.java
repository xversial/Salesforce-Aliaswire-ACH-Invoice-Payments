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
