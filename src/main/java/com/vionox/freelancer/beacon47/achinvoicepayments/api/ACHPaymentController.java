package com.vionox.freelancer.beacon47.achinvoicepayments.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.vionox.freelancer.beacon47.achinvoicepayments.AliasWirePayment;
import com.vionox.freelancer.beacon47.achinvoicepayments.entity.AccountType;
import com.vionox.freelancer.beacon47.achinvoicepayments.entity.FundingAccount;
import com.vionox.freelancer.beacon47.achinvoicepayments.entity.TxnAmount;
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
            FundingAccount fundingAccount = mapper.readerFor(FundingAccount.class).readValue(node.get("FundingAccount"));
            LOG.info(fundingAccount.getToken());

            TxnAmount amount = new TxnAmount(119.99, "USD");

            String response = AliasWirePayment.makePayment(fundingAccount, amount);

            return response;
        } catch (IOException ex) {
            LOG.warn(ExceptionUtils.getStackTrace(ex));
        }
        return null;
    }
}
