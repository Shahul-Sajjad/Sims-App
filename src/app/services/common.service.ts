import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import * as JsonToXML from "js2xmlparser";
import SampleJson from "../../app.config.json";
import { Observable, of } from 'rxjs';


declare var $: any;

@Injectable()
export class CommonService {
    headers: any;
    public xmlItems: any;
    constructor(private http: HttpClient) {
    }
    // This will convert XML response to JSON
    parseXML(data) {
        return new Promise(resolve => {
            var k: string | number,
                arr = [],
                parser = new xml2js.Parser(
                    {
                        trim: true,
                        explicitArray: true
                    });
            parser.parseString(data, function (err, result) {
                resolve(result);
            });
        });
    }
    //Function to read App Config 
    getAppConfigJSON(key): Observable<any> {
        const wholeArray = SampleJson[key];
        return of(wholeArray);
    }
    // Function to return SOAP req in xml format
    getSoapBody(serviceName, nameSpace, dataRequest) {
        var soapRequest = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
            "<SOAP:Body>" +
            "<" + serviceName + " xmlns=\"" + nameSpace + "\"  qAccess=\"0\" qValues=\"\">" +
            dataRequest +
            "</" + serviceName + ">" +
            "</SOAP:Body>" +
            "</SOAP:Envelope>";
        var parser = new DOMParser();
        parser.parseFromString(soapRequest, "text/xml");
        return soapRequest;
    }
    

    getSoapupdateBody(serviceName, nameSpace, dataRequest) {
        var soapupdateRequest = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
            "<SOAP:Body>" +
            "<" + serviceName + " xmlns=\"" + nameSpace + "\"  reply=\"yes\" commandUpdate=\"no\" preserveSpace=\"no\" batchUpdate=\"no\">"+
            dataRequest +
            "</" + serviceName + ">" +
            "</SOAP:Body>" +
            "</SOAP:Envelope>";
        var parser = new DOMParser();
        parser.parseFromString(soapupdateRequest, "text/xml");
        return soapupdateRequest;
    }

    setSoapPerformTaskAction(serviceName, nameSpace, dataRequest){
        var sapPerformTaskAction = "<SOAP:Envelope xmlns:SOAP=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
            "<SOAP:Body>" +
            "<" + serviceName + " xmlns=\"" + nameSpace + "\"  reply=\"yes\" commandUpdate=\"no\" preserveSpace=\"no\" batchUpdate=\"no\">"+
            dataRequest +
            "</" + serviceName + ">" +
            "</SOAP:Body>" +
            "</SOAP:Envelope>";
        var parser = new DOMParser();
        parser.parseFromString(sapPerformTaskAction, "text/xml");
        return sapPerformTaskAction;
    }
    
}


