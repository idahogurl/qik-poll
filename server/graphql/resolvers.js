import GraphQLToolTypes from 'graphql-tools-types';
import uuid from 'uuid/v4';
import { User, Poll, PollOption } from '../models';

const parseOrder = function parseOrder(order) {
  if (order) {
    const columns = order.split(', ');
    const columnOrder = columns.map(c => c.split(' '));
    return columnOrder;
  }
  return [];
};

const parseWhere = function parseWhere(where) {
  if (where) {
    return JSON.parse(where);
  }
  return {};
};

export default {
  UUID: GraphQLToolTypes.UUID({ name: 'UUID', storage: 'string' }),
  JSON: GraphQLToolTypes.JSON({ name: 'JSON' }),
  Date: GraphQLToolTypes.Date({ name: 'Date' }),
  Void: GraphQLToolTypes.Void({ name: 'Void' }),
  Mutation: {
    createUser: async (_, { input }) => {
      await User.create(input);
    },
    updateUser: async (_, { id, input }) => {
      const user = User.findById(id);
      await user.update(input);
    },
    deleteUser: async (_, { id }) => {
      await User.destroy({ where: { id } });
      // GenericResponse
    },
    createPoll: async (_, { input: { userId, question, options } }) => {
      const id = uuid();
      const poll = await Poll.create({ id, userId, question });

      // split newline
      const pollOptions = options.split('\n').map(m => ({ option: m, pollId: poll.id }));
      await PollOption.bulkCreate(pollOptions);

      return poll;
    },
    updatePoll: async (_, { id, question }) => {
      const poll = await Poll.findById(id);
      poll.question = question;
      await poll.save();
    },
    deletePoll: async (_, { id }) => {
      //  GenericResponse
      await Poll.destroy({ where: { id } });
      return true;
    },
    createPollOption: async (_, { pollId, option }) => {
      const poll = await PollOption.create({ pollId, option });
      return poll;
    },
    updatePollOption: async (_, { id, option }) => {
      const pollOption = await PollOption.findById(id);
      pollOption.update({ option });
      return pollOption;
    },
    deletePollOption: async (_, { id }) => {
      //  GenericResponse
      await PollOption.destroy({ where: { id } });
    },
    vote: async (_, { id, input }) => {
      const pollOption = await PollOption.findById(id);

      if (!pollOption) {
        const { pollId, option } = input;
        const newOption = await PollOption.create({
          id, pollId, option, votes: 1,
        });
        return newOption;
      }
      const votes = pollOption.votes + 1;
      pollOption.update({ votes });
      return pollOption;
    },
  },
  Poll: {
    pollOptions: async (poll, {
      limit, order, where, offset,
    }) => {
      const pollOptions = await poll.getPollOptions({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
      return pollOptions;
    },
  },
  PollOption: {
    poll: async (pollOption) => {
      await pollOption.getPoll();
    },
  },
  Query: {
    users: async (_, {
      limit, order, where, offset,
    }) => {
      await User.findAll({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
    },
    user: async (_, {
      id, where,
    }) => {
      await User.findById(id, { where });
    },
    polls: async (_, {
      limit, order, where, offset,
    }) => {
      const polls = await Poll.findAll({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
      return polls;
    },
    poll: async (_, {
      id, where,
    }) => {
      const poll = await Poll.findById(id, { where });
      return poll;
    },
    pollOptions: async (_, {
      limit, order, where, offset,
    }) => {
      await PollOption.findAll({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
    },
    pollOption: async (_, {
      id, where,
    }) => {
      await PollOption.findById(id, { where });
    },
  },
  User: {
    polls: async (user, {
      limit, order, where, offset,
    }) => {
      await user.getPolls({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
    },
  },
};
