/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause

    This implementation of Salesforce CMS is for reference only -- will require extensions & customizations for customer engagments.
*/
'use strict';

class CMSContent {
    constructor(cmsAPIResponse, id) {
        if(cmsAPIResponse && Array.isArray(cmsAPIResponse.items) && cmsAPIResponse.items.length){
            const itemsArray = cmsAPIResponse.items;
            itemsArray.forEach((item, index) => {
                if(item.managedContentId === id){
                    this.contentUrlName = item.contentUrlName;
                    this.language = item.language;
                    this.publishedDate = item.publishedDate;
                    this.title = item.title;
                    this.type = item.type;
                    this.typeLabel = item.typeLabel;
                    this.managedContentId = item.managedContentId;
                    this.ContentNodes = item.contentNodes;
                }
            });
        }
    }
}

export default CMSContent;
