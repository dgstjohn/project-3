const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // MUST adjust code below for Bet model

        checkout: async (parent, args, context) => {
            const order = new Order({ products: args.products });
            const { products } = await order.populate('products').execPopulate();
            const line_items = [];

            for (let i = 0; i < products.length; i++) {
                // generate product id
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description
                });

                // generate price id using the product id
                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                // add price id to the line items array
                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }
            // this code should be OK as is
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: 'https://example.com/cancel'
              });
              
              return { session: session.id };
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
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
            console.log(context.user)
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { saveBet: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
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
            throw new AuthenticationError('Not logged in');
        },

        removeAccount: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.delete({ _id: user.id });
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;