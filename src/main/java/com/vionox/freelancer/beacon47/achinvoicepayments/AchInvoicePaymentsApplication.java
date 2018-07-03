package com.vionox.freelancer.beacon47.achinvoicepayments;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class AchInvoicePaymentsApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(AchInvoicePaymentsApplication.class, args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(AchInvoicePaymentsApplication.class);
  }
}
