/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause

    This implementation of Salesforce CMS is for reference only -- will require extensions & customizations for customer engagments.
*/
'use strict';

import { gql } from 'apollo-server-core';

export const cmsTypeDefs = gql`
    extend type Query {
        cmsResolver(id: String!, contentType: String!): Item
    }

    type Item {
        ContentNodes: ContentNodes
        contentUrlName: String
        language: String
        managedContentId: String
        publishedDate: String
        title: String
        type: String
        typeLabel: String
    }

    type ContentNodes {
        bannerImage: bannerImage
        excerpt: excerpt
        body: body
        title: title
    }

    type bannerImage {
        altText: String
        fileName: String
        resourceUrl: String
    }

    type excerpt {
        nodeType: String!
        value: String
    }

    type body {
        nodeType: String
        value: String
    }

    type title {
        value: String
    }
`;
