import GraphQLToolTypes from 'graphql-tools-types';
import uuid from 'uuid/v4';
import { User, Poll, PollOption, UserSelection } from '../models';

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
    createUserSelection: async (_, { userId, pollOptionId }) => {
      await UserSelection.create({ userId, pollOptionId });
    },
    updateUserSelection: async (_, { id, pollOptionId }) => {
      const userSelection = await UserSelection.findById(id);
      await userSelection.update({ pollOptionId });
    },
    deleteUserSelection: async (_, { id }) => {
      await UserSelection.destroy({ where: { id } });
      //  GenericResponse
    },
    createPoll: async (_, { userId, prompt }) => {
      const id = uuid();
      await Poll.create({ id, userId, prompt });
    },
    updatePoll: async (_, { id, prompt }) => {
      const poll = await Poll.findById(id);
      poll.prompt = prompt;
      await poll.save();
    },
    deletePoll: async (_, { id }) => {
      //  GenericResponse
      await Poll.destroy({ where: { id } });
    },
    createPollOption: async (_, { pollId, option }) => {
      const poll = await PollOption.create({ pollId, option });
      return poll;
    },
    updatePollOption: async (_, { id, option }) => {
      const pollOption = PollOption.findById(id);
      await pollOption.update({ option });
    },
    deletePollOption: async (_, { id }) => {
      //  GenericResponse
      await PollOption.destroy({ where: { id } });
    },
  },
  Poll: {
    pollOptions: async (poll, {
      limit, order, where, offset,
    }) => {
      await poll.getPollOptions({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
    },
  },
  PollOption: {
    userSelections: async (pollOption, {
      limit, order, where, offset,
    }) => {
      const selections = await pollOption.getUserSelections({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
      return selections;
    },
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
    userSelections: async (_, {
      limit, order, where, offset,
    }) => {
      await UserSelection.findAll({
        limit, order: parseOrder(order), where: parseWhere(where), offset,
      });
    },
    userSelection: async (_, {
      id, where,
    }) => {
      await User.findById(id, { where: parseWhere(where) });
    },
    polls: async (_, {
      limit, order, where, offset,
    }) => {
      console.log(where);
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
  UserSelection: {
    pollOption: async (userSelection) => {
      await userSelection.getPollOption();
    },
    poll: async (userSelection) => {
      await userSelection.getPolls();
    },
  },
};
