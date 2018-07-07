package com.vionox.freelancer.beacon47.achinvoicepayments.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @author Brandon Xversial
 */
@RestController
public class ACHPaymentController {
    private static final Logger LOG = LoggerFactory.getLogger(ACHPaymentController.class);
    ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "/api/v1.0/payments/make", method = {RequestMethod.POST})
    public String achMakePayment(@RequestBody String jsonString)
    {
        try {
            ObjectNode node = mapper.readValue(jsonString, ObjectNode.class);
            JsonNode payment = node.get("payment");
            String token = payment.get("token").asText();
            LOG.info(token);
        } catch (IOException ex) {
            LOG.warn(ExceptionUtils.getStackTrace(ex));
        }
        return null;
    }
}