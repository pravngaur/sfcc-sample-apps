/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause

    This implementation of Salesforce CMS is for reference only -- will require extensions & customizations for customer engagments.
*/
import { LightningElement, wire, track } from 'lwc';
import { useQuery } from '@lwce/apollo-client';
import { routeParams } from '@lwce/router';
import QUERY from './gqlQuery';
import { dispatchErrorEvent } from 'commerce/helpers';

export default class CmsContent extends LightningElement {

    variables = {
        contentId: '',
        contentType: '',
    };

    //TODO: Move this middleware path to config file
    imagePath = 'https://immense-reaches-30678.herokuapp.com/';

    @track cmsText = '';
    @track cmsImageName = '';
    @track cmsResolver = {};

    @wire(routeParams) params(params) {
        this.contentId = params.contentId;
        this.contentType = params.contentType;
    }
    set contentId(val) {
        this.variables = { ...this.variables, contentId: val };
    }
    get contentId() {
        return this.variables.contentId;
    }

    set contentType(val) {
        this.variables = { ...this.variables, contentType: val };
    }
    get contentType() {
        return this.variables.contentType;
    }
    @wire(useQuery, {
        query: QUERY,
        lazy: false,
        variables: '$variables',
    })
    updateCmsContent(response) {
        console.log('calling updateCmsContent: ', response.initialized);
        if (response.initialized) {
            if (response.error) {
                dispatchErrorEvent.call(this, response.error);
            } else {
                if (!response.loading) {
                    this.activeImage = 0;
                }
                this.cmsResolver = response.data.cmsResolver;
                this.cmsText = response.data.cmsResolver.ContentNodes.excerpt.value;
                var apiImageName = response.data.cmsResolver.ContentNodes.bannerImage.fileName;
                this.cmsImageName = '$imagePath' + apiImageName;
            }
        } else {
            console.log('Response not initialized');
        }
    }
}
