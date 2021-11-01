const { User, Team, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    teams: async (parent, args) => {
      return Team.find();
    },

    checkout: async (parent, args, context) => {
      const order = new Order({ bets: args.bets });
      const { bets } = await order.populate("bets").execPopulate();
      const line_items = [];

      for (let i = 0; i < bets.length; i++) {
        // generate product id
        const bets = await stripe.bets.create({
          team: bets[i].team,
          amount: bets[i].amount,
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          bet: bets.id,
          unit_amount: bets[i].amount * 100,
          currency: "usd",
        });

        // add price id to the line items array
        line_items.push({
          amount: amount.id,
          quantity: 1,
        });
      }
      // this code should be OK as is
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url:
          "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://example.com/cancel",
      });

      return { session: session.id };
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);
      return { token, user };
    },

    saveBet: async (parent, { input }, context) => {
      console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { saveBet: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    updateBet: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { savedBets: { betId: input } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    removeBet: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.delete({ _id: betId });
        return updatedUser;
      }
    },

    removeAccount: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.delete({ _id: user.id });
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
