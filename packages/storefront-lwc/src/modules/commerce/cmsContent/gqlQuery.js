import gql from 'graphql-tag';

const QUERY = gql`
    query($contentId: String!, $contentType: String!) {
        cmsResolver(id: $contentId, contentType: $contentType) {
            ContentNodes {
                body {
                    value
                }
                bannerImage {
                    fileName
                }
                excerpt {
                    value
                }
            }
        }
    }
`;

export default QUERY;
