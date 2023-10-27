import { gql } from '@apollo/client';

export const GITHUB_COMMITS_QUERY = gql`
query GetCommits($owner: String!, $repo: String!, $startDate: GitTimestamp!, $endDate: GitTimestamp!) {
    repository(owner: $owner, name: $repo) {
      ref(qualifiedName: "${process.env.REACT_APP_GITHUB_BRANCH}") {
        target {
          ... on Commit {
            history(since: $startDate, until: $endDate) {
              totalCount
              nodes {
                oid
                message
                author {
                  name
                  email
                  date
                }
              }
            }
          }
        }
      }
    }
  }  
`;
