/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause

    This implementation of Salesforce CMS is for reference only -- will require extensions & customizations for customer engagments.
*/
// SFRA Core Extension module
import { core, API_EXTENSIONS_KEY } from '@sfcc-core/core';
import { resolverFactory } from '@sfcc-core/core-graphql';
import { cmsTypeDefs } from './api/schema/cmsTypeDefs';
import { cmsResolvers } from './api/schema/cmsResolvers';

export class CmsApi {
    constructor(core) {
        this.core = core;
        this.core.logger.log('CMSAPI.constructor(core)');
    }

    get typeDefs() {
        core.logger.log('===========================');
        core.logger.log('===========================');
        core.logger.log(
            'CMSAPI.cmsTypeDefs()',
            cmsTypeDefs
        );
        core.logger.log('===========================');
        core.logger.log('===========================');
        return [cmsTypeDefs];
    }

    getResolvers(config) {
        core.logger.log('===========================');
        core.logger.log('===========================');
        core.logger.log('CMSAPI.getResolvers()', config);
        core.logger.log('===========================');
        core.logger.log('===========================');
        core.logger.log('CMSAPI.getResolvers()', cmsResolvers);
        return resolverFactory(config, [
            cmsResolvers
        ]);
    }
}

core.registerExtension(API_EXTENSIONS_KEY, function() {
    const CMSAPI = new CmsApi(core);
    return CMSAPI;
});
