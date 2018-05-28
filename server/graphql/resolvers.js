import GraphQLToolTypes from 'graphql-tools-types';
import { User, Poll, PollOption, UserSelection } from '../models';

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
      await Poll.create({ userId, prompt });
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
      await PollOption.create({ pollId, option });
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
        limit, order, where, offset,
      });
    },
  },
  PollOption: {
    userSelections: async (pollOption, {
      limit, order, where, offset,
    }) => {
      await pollOption.getUserSelections({
        limit, order, where, offset,
      });
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
        limit, order, where, offset,
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
        limit, order, where, offset,
      });
    },
    userSelection: async (_, {
      id, where,
    }) => {
      await User.findById(id, { where });
    },
    polls: async (_, {
      limit, order, where, offset,
    }) => {
      await Poll.findAll({
        limit, order, where, offset,
      });
    },
    poll: async (_, {
      id, where,
    }) => {
      await Poll.findById(id, { where });
    },
    pollOptions: async (_, {
      limit, order, where, offset,
    }) => {
      await PollOption.findAll({
        limit, order, where, offset,
      });
    },
    pollOption: async (_, {
      id, where,
    }) => {
      await PollOption.findById(id, { where });
    },
  },
  User: {
    userSelections: async (user, {
      limit, order, where, offset,
    }) => {
      await user.getUserSelections({
        limit, order, where, offset,
      });
    },
    polls: async (user, {
      limit, order, where, offset,
    }) => {
      await user.getPolls({
        limit, order, where, offset,
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
