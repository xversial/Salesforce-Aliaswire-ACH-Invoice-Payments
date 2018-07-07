
















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

AWAPI = function AWAPI() {
  var self = this;
  var resultCode = 'I001_07/06/2018 20:10:21';
  self.checkInitialization = function () {
    if (resultCode!='' && resultCode!='null') return resultCode;
    return 'F000';
  }
};


AWAPI.TS = function TS(defaultCallback) {
  var self = this;
  var tsDefaultCallback = isSet(defaultCallback) ? defaultCallback : null;
  
  var tsServiceURL = 'https://staging.aliaswire.com/bills/ws/rest/transactionservice/v3';
  var tsKey = '';
  var tsKeyHeader = '';

  self.setPublishedKey = function(key) {
    tsKeyHeader = 'aw-publishedkey';
    tsKey = key;
  };
  self.setKey = function(key, keyHeader) {
    tsKey = key;  
    if (isSet(keyHeader))tsKeyHeader = keyHeader;
  };

  function isSet(obj) {
    return !(obj===null || obj==null || typeof obj==='undefined' || typeof obj=='undefined');
  };
  
  self.requestToken = function(token, callback, key, keyHeader) {
    var json =  '{"tv3.tokenRequest":' + token.stringify() + '}';
    sendJSON('/tokens', json, callback, key, keyHeader);
  };
  
  self.createCreditCardAccountToken = function(number, expirationMonth, expirationYear) {
    if (!isSet(number) || !isSet(expirationMonth) || !isSet(expirationYear)) {
      return false;
    }
    var token = new Token();
    token.setJsonObj(new Object(), new CreditCardAccount());
    token.getFundingAccount().setNumber(number);
    token.getFundingAccount().setExpirationMonth(expirationMonth);
    token.getFundingAccount().setExpirationYear(expirationYear);
    return token;
  };

  self.createAchAccountToken = function(number, bankRoutingNumber, bankAccountType) {
    if (!isSet(number) || !isSet(bankRoutingNumber) || !isSet(bankAccountType)) {
      return false;
    }
    var token = new Token();
    token.setJsonObj(new Object(), new AchAccount());
    token.getFundingAccount().setNumber(number);
    token.getFundingAccount().setBankRoutingNumber(bankRoutingNumber);
    token.getFundingAccount().setBankAccountType(bankAccountType);
    return token;
  };

  function sendJSON(path, json, callback, key, keyHeader) {
    var req = new XMLHttpRequest();
    var awCallback = isSet(callback) ? callback : tsDefaultCallback;
    
    var isXdr = (!("withCredentials" in req) && typeof XDomainRequest != "undefined");
    var isXhr = "withCredentials" in req;
    if (isXhr) {
      req.onreadystatechange = function() { _internal(req, awCallback); };
      req.open("post", tsServiceURL+path, true);
      req.setRequestHeader('Content-Type','application/json');
      req.setRequestHeader('Accept','application/json');
    } else if (isXdr) {
      req = new XDomainRequest();
      req.onload = function() { _internal(req, awCallback); };
      req.onprogress = function() {};
      var k = isSet(key) ? key : tsKey;
      var kh = isSet(keyHeader) ? keyHeader : tsKeyHeader;
      //since for XDR custom headers are not allowed, send the published key as a query param instead.
      var xdrUrl = tsServiceURL+path;
      xdrUrl += (xdrUrl.indexOf("?") == -1 ? "?" : "&") + kh + "=" + k;
      req.open("post", xdrUrl); 
    }
    
    if (key instanceof Thumbprint) {
      var tobj = key.getJsonObj();
      for (var th in tobj) {
			  if (tobj.hasOwnProperty(th)) {
			    req.setRequestHeader(th, tobj[th]);
			  };
			};
    } else { 
	    var k = isSet(key) ? key : tsKey;
	    var kh = isSet(keyHeader) ? keyHeader : tsKeyHeader;
      if (isXhr) {
        	req.setRequestHeader(kh, k);
	    }
    }

    req.send(json);
  };
  
  function _internal(req, awCallback){
  	  var isXdr = (!("withCredentials" in req) && typeof XDomainRequest != "undefined");
  	  var isXhr = (("withCredentials" in req) && req.readyState === XMLHttpRequest.DONE);
      if (isXdr || isXhr) {
        var status = req.status;
        var resultCode = 'F044';
        var detailReason = null;
        var rJson = req.responseText;
        var rJsonObj = null;
        var base = null;
        try {
          try { 
	          if (isSet(rJson) && rJson!='') {
	          	 //TODO: JSON.parse(rJson) is the recommended way for modern browsers, use eval if something does not work here
	             rJsonObj = JSON.parse(rJson);//eval("("+rJson+")"); 
	             if (isSet(rJsonObj['tv3.baseTokenResponse'])) {
	               base = new BaseResponse();
	               base.setJsonObj(rJsonObj['tv3.baseTokenResponse']);
	               resultCode = base.getResultCode();
	               detailReason = base.getDetailReason();
	             };   
	          };
	        } catch(serr) {
	          base = serr;
	        }
          if (!isXdr && (!isSet(resultCode) || resultCode == 'F044' || resultCode == '')) resultCode = req.getResponseHeader('aw-resultcode'); 
          if (!isXdr && (!isSet(detailReason) || detailReason == '')) detailReason = req.getResponseHeader('aw-detailreason');
          if (!isSet(resultCode) || resultCode == '') resultCode = 'F044';
          if (!isSet(detailReason) || detailReason == '') detailReason = null;
          if (status == 0) {
            if (!isSet(resultCode) || resultCode == 'F044' || resultCode == '')  resultCode = 'F030';
            if (!isSet(detailReason) || detailReason == '') detailReason = 'Webservice[JS] is being accessed from an unauthorized origin[].';
          }
          awCallback(base, resultCode, detailReason, rJson, status);
        } catch(err) {
          awCallback(err, resultCode, detailReason, rJson, status);
        };
      };  
  }
  
  
  self.createThumbprint = function(thumbprint, timestamp, hashkey, userid, nonce) {
    var t = new Thumbprint();
    if (isSet(thumbprint)) t.setThumbprint(thumbprint);
    if (isSet(timestamp)) t.setTimestamp(timestamp);
    if (isSet(hashkey)) t.setHashkey(hashkey);
    if (isSet(userid)) t.setUserid(userid);
    if (isSet(nonce)) t.setNonce(nonce);
    return t;
  }
  
  function Thumbprint() {
    var self = this;
    var jsonObj = new Object();
    self.stringify = function() {
      var s = JSON.stringify(jsonObj);
      if (s=='{}') s=null;
      return s;
    };
    self.getJsonObj = function() {return jsonObj;};
    self.getHashkey=function(){return jsonObj['aw-hashkey'];};
    self.setHashkey=function(v){if (v==null)delete jsonObj['aw-hashkey'];else jsonObj['aw-hashkey']=v;};
    self.getUserid=function(){return jsonObj['aw-userid'];};
    self.setUserid=function(v){if (v==null)delete jsonObj['aw-userid'];else jsonObj['aw-userid']=v;};
    self.getTimestamp=function(){return jsonObj['aw-timestamp'];};
    self.setTimestamp=function(v){if (v==null)delete jsonObj['aw-timestamp'];else jsonObj['aw-timestamp']=v;};
    self.getThumbprint=function(){return jsonObj['aw-thumbprint'];};
    self.setThumbprint=function(v){if (v==null)delete jsonObj['aw-thumbprint'];else jsonObj['aw-thumbprint']=v;};
    self.getNonce=function(){return jsonObj['aw-nonce'];};
    self.setNonce=function(v){if (v==null)delete jsonObj['aw-nonce'];else jsonObj['aw-nonce']=v;};
  };

  function BaseResponse() {
    var self = this;
    var jsonObj;
    var token=null;//BaseTokenResponse
    var metadata=null;
    self.setJsonObj=function(v){
      jsonObj=v;
      if (isSet(jsonObj.token)) {
        token=new TokenAccount();
        token.setJsonObj(jsonObj.token);
      }
      if (isSet(jsonObj.metadata)) {
        metadata = new DataMap();
        metadata.setJsonObj(jsonObj.metadata);
      }
    };
    self.getResultCode=function(){return jsonObj.resultCode;};
    self.getDetailReason=function(){return jsonObj.detailReason;};
    self.getToken=function(){return token;};
    self.getMetaData=function(){return metadata;};
  };
  
  function DataMap() {
    var self = this;
    var jsonObj;
    self.setJsonObj=function(v){
      jsonObj=v;
      if (!isSet(jsonObj.entry)) jsonObj['entry']=[];
    };
    self.stringify = function() {
      var s = JSON.stringify(jsonObj);
      var flag = true;
      if (jsonObj.entry.length > 0) {
        for (var i = jsonObj.entry.length-1; i >= 0; i--) {
          if (this.getEntry(i).stringify() != null) {
            flag = false;          
            break;
          };  
        };
      }
      if (flag) s=null;
      this.setJsonObj(jsonObj);
      return s;
    };
    self.getLength=function(){
      return isSet(jsonObj.entry.length) ? jsonObj.entry.length : 1;
    };
    self.getEntry=function(i){
      if (!isSet(jsonObj.entry.length)) {
        if (!isSet(i) || i>0) return null;
        var entry = new Entry();
	      entry.setJsonObj(jsonObj.entry);
	      return entry;    
      }
      if (!isSet(i) || i>=jsonObj.entry.length) return null;
      var entry = new Entry();
      entry.setJsonObj(jsonObj.entry[i]);
      return entry;    
    };
    self.add=function(){
      jsonObj.entry.push(new Object());
      return jsonObj.entry.length - 1;    
    };
    self.remove=function(i){
      delete jsonObj.entry[i];
    };
  };
   
  function Entry() {
    var self = this;
    var jsonObj;
    self.setJsonObj=function(v){
      jsonObj=v;
    };
    self.stringify = function() {
      var s = JSON.stringify(jsonObj);
      if (s=='{}') s=null;
      this.setJsonObj(jsonObj);
      return s;
    };
    self.getKey=function(){return jsonObj.key;};
    self.setKey=function(v){if (v==null)delete jsonObj.key;else jsonObj['key']=v;};
    self.getValue=function(){return jsonObj.value;};
    self.setValue=function(v){if (v==null)delete jsonObj.value;else jsonObj['value']=v;};  
  };

  function TokenAccount() {
    var self = this;
    var jsonObj;
    var address;
    self.setJsonObj=function(v){
    try{
      jsonObj=v;
      address = new Address();
      if (!isSet(jsonObj.address)) jsonObj['address']=new Object();      
      address.setJsonObj(jsonObj.address);
      }catch(err){}
    };
    self.stringify = function() {
      if (address.stringify()==null) delete jsonObj.address;
      var s = JSON.stringify(jsonObj);
      if (s=='{}') s=null;
      this.setJsonObj(jsonObj);
      return s;
    };
    self.getAddress=function(){return address;};
    self.getCvv=function(){return jsonObj.cvv;};
    self.setCvv=function(v){if (v==null)delete jsonObj.cvv;else jsonObj['cvv']=v;};
    self.getNumber=function(){return jsonObj.number;};
    self.setNumber=function(v){if (v==null)delete jsonObj.number;else jsonObj['number']=v;};    
    self.getName=function(){return jsonObj.name;};
    self.setName=function(v){if (v==null)delete jsonObj.name;else jsonObj['name']=v;}; 
    self.getDisplay=function(){return jsonObj.display;};
    self.setDisplay=function(v){if (v==null)delete jsonObj.display;else jsonObj['display']=v;};
  };

  function Address() {
    var self = this;
    var jsonObj;
    self.setJsonObj=function(v){
      jsonObj=v;
    };
    self.stringify = function() {
      var s = JSON.stringify(jsonObj);
      if (s=='{}') s=null;
      this.setJsonObj(jsonObj);
      return s;
    };
    self.getStreet=function(){return jsonObj.street;};
    self.setStreet=function(v){if (v==null)delete jsonObj.street;else jsonObj['street']=v;};
    self.getLine2=function(){return jsonObj.line2;};
    self.setLine2=function(v){if (v==null)delete jsonObj.line2;else jsonObj['line2']=v;};
    self.getCity=function(){return jsonObj.city;};
    self.setCity=function(v){if (v==null)delete jsonObj.city;else jsonObj['city']=v;};
    self.getState=function(){return jsonObj.state;};
    self.setState=function(v){if (v==null)delete jsonObj.state;else jsonObj['state']=v;};
    self.getCountry=function(){return jsonObj.country;};
    self.setCountry=function(v){if (v==null)delete jsonObj.country;else jsonObj['country']=v;};
    self.getZipcode=function(){return jsonObj.zipcode;};
    self.setZipcode=function(v){if (v==null)delete jsonObj.zipcode;else jsonObj['zipcode']=v;};  
  };
  
  function Token() {
    var self = this;
    var jsonObj;
    var fundingAccount;
    var metadata;
    self.setJsonObj=function(v, f){
      jsonObj=v;
      fundingAccount = f;
      if (!isSet(jsonObj.fundingAccount)) jsonObj['fundingAccount']=new Object();      
      fundingAccount.setJsonObj(jsonObj.fundingAccount);
      metadata = new DataMap();
      if (!isSet(jsonObj.metadata)) jsonObj['metadata']=new Object();      
      metadata.setJsonObj(jsonObj.metadata);
    };
    self.stringify = function() {
      if (fundingAccount.stringify()==null) delete jsonObj.fundingAccount;
      if (metadata.stringify()==null) delete jsonObj.metadata;
      var s = JSON.stringify(jsonObj);
      if (s=='{}') s=null;
      this.setJsonObj(jsonObj, fundingAccount);
      return s;
    };
    self.isCreditCardAccount=function(){return fundingAccount instanceof CreditCardAccount;};
    self.isAchAccount=function(){return fundingAccount instanceof AchAccount;};
    self.getFundingAccount=function(){return fundingAccount;};
    self.getMetaData=function(){return metadata;};
    self.getDivision=function(){return jsonObj.division;};
    self.setDivision=function(v){if (v==null)delete jsonObj.division;else jsonObj['division']=v;};
  };

  function CreditCardAccount() {
    var self = this;
    var jsonObj;
    var xsiType = '@xsi.type';
    var xsiTypeValue = 'tv3:creditCardAccount';
    var address;
    self.setJsonObj=function(v){
      jsonObj=v;
      jsonObj[xsiType]=xsiTypeValue;
      address = new Address();
      if (!isSet(jsonObj.address)) jsonObj['address']=new Object();      
      address.setJsonObj(jsonObj.address);
    };
    self.stringify = function() {
      if (address.stringify()==null) delete jsonObj.address;  
      var s = JSON.stringify(jsonObj);
      if (s=='{"'+xsiType+'":"'+xsiTypeValue+'"}') s=null;
      this.setJsonObj(jsonObj);
      return s;
    };
    self.getAddress=function(){return address;};
    self.getExpirationMonth=function(){return jsonObj.expirationMonth;};
    self.setExpirationMonth=function(v){if (v==null)delete jsonObj.expirationMonth;else jsonObj['expirationMonth']=v;};
    self.getExpirationYear=function(){return jsonObj.expirationYear;};
    self.setExpirationYear=function(v){if (v==null)delete jsonObj.expirationYear;else jsonObj['expirationYear']=v;};
    self.getCvv=function(){return jsonObj.cvv;};
    self.setCvv=function(v){if (v==null)delete jsonObj.cvv;else jsonObj['cvv']=v;};
    self.getNumber=function(){return jsonObj.number;};
    self.setNumber=function(v){if (v==null)delete jsonObj.number;else jsonObj['number']=v;};
    self.getName=function(){return jsonObj.name;};
    self.setName=function(v){if (v==null)delete jsonObj.name;else jsonObj['name']=v;};
    self.getDisplay=function(){return jsonObj.display;};
    self.setDisplay=function(v){if (v==null)delete jsonObj.display;else jsonObj['display']=v;};    
  };

  function AchAccount() {
    var self = this;
    var jsonObj;
    var xsiType = '@xsi.type';
    var xsiTypeValue = 'tv3:achAccount';
    var address;
    self.setJsonObj=function(v){
      jsonObj=v;
      jsonObj[xsiType]=xsiTypeValue;
      address = new Address();
      if (!isSet(jsonObj.address)) jsonObj['address']=new Object();      
      address.setJsonObj(jsonObj.address);
    };
    self.stringify = function() {
      if (address.stringify()==null) delete jsonObj.address;  
      var s = JSON.stringify(jsonObj);
      if (s=='{"'+xsiType+'":"'+xsiTypeValue+'"}') s=null;
      this.setJsonObj(jsonObj);
      return s;
    };
    self.getAddress=function(){return address;};
    self.getBankRoutingNumber=function(){return jsonObj.bankRoutingNumber;};
    self.setBankRoutingNumber=function(v){if (v==null)delete jsonObj.bankRoutingNumber;else jsonObj['bankRoutingNumber']=v;};
    self.getBankAccountType=function(){return jsonObj.bankAccountType;};
    self.setBankAccountType=function(v){if (v==null)delete jsonObj.bankAccountType;else jsonObj['bankAccountType']=v;};
    self.getBankName=function(){return jsonObj.bankName;};
    self.setBankName=function(v){if (v==null)delete jsonObj.bankName;else jsonObj['bankName']=v;};
    self.getNumber=function(){return jsonObj.number;};
    self.setNumber=function(v){if (v==null)delete jsonObj.number;else jsonObj['number']=v;};
    self.getName=function(){return jsonObj.name;};
    self.setName=function(v){if (v==null)delete jsonObj.name;else jsonObj['name']=v;};
    self.getDisplay=function(){return jsonObj.display;};
    self.setDisplay=function(v){if (v==null)delete jsonObj.display;else jsonObj['display']=v;};     
  };
};
