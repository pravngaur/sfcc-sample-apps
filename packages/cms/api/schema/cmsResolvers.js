/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause

    This implementation of Salesforce CMS is for reference only -- will require extensions & customizations for customer engagments.
*/
'use strict';


import { getCommerceClientConfig } from '@sfcc-core/apiconfig';
import CMSContent from '../models/CMSContent';
let SalesforceConnection = require("node-salesforce-connection");

const getCMSContent = async (config, id, contentType, context) => {
    try{

        let sfConn = new SalesforceConnection();
        let tokenRequest = {
          grant_type: config.CMS_GRANT_TYPE,
          client_id: config.CMS_CLIENT_ID,
          client_secret: config.CMS_CLIENT_SECRET,
          username: config.CMS_USERNAME,
          password: config.CMS_PASSWORD,
        };
        let hostname = "login.salesforce.com";
        await sfConn.oauthToken(hostname, tokenRequest); 
        
        let cmsAPIResponse = await sfConn.rest(`/services/data/v48.0/connect/cms/delivery/channels/0ap2x000000L4C4AAK/contents/query?managedContentType=${contentType}`);
        let contentObj = new CMSContent(cmsAPIResponse, id);
        return contentObj;
      }
      catch(ex){
        console.error(ex.stack);
      }
};

export const cmsResolvers = config => {
    return {
        Query: {
            cmsResolver: async (_, {id, contentType}, context) => {
                const cmsContentObj = await getCMSContent(config, id, contentType, context);
                return cmsContentObj;
            },
        },
    };
};

