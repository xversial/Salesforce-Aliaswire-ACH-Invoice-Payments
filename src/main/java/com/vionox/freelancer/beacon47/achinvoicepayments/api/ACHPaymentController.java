package com.vionox.freelancer.beacon47.achinvoicepayments.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Brandon Xversial
 */
@RestController
public class ACHPaymentController {
    private static final Logger LOG = LoggerFactory.getLogger(ACHPaymentController.class);

    @RequestMapping(value = "/api/v1.0/payments/make", method = {RequestMethod.POST})
    public String achMakePayment(@RequestBody String jsonString)
    {
        return null;
    }
}
