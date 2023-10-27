import moment from 'moment';
import client from '../config/apollo-client';
import { GITHUB_COMMITS_QUERY } from '../queries/githubQueries';

const fetchEvents = async (owner, repo, startDate, endDate) => {
  try {
    const startOfMonth = moment(startDate).startOf('month');
    const endOfMonth = moment(endDate).endOf('month');

    const { data } = await client.query({
      query: GITHUB_COMMITS_QUERY,
      variables: {
        owner,
        repo,
        startDate: startOfMonth.toISOString(),
        endDate: endOfMonth.toISOString(),
      },
    });

    const commitNodes = data?.repository?.ref?.target?.history?.nodes || [];

    const newEvents = commitNodes.map((commit) => {
      const event = {
        title: commit.author.name,
        start: moment(commit.author.date).toDate(),
        end: moment(commit.author.date).toDate(),
        allDay: false,
        commitData: commit,
      };

      return event;
    });

    return newEvents;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { fetchEvents };
