# QikPoll Website

**Description**
Unregistered users can vote on polls and share them via Facebook. Registered users can view, create or delete their polls.

**User Stories**
- As an authenticated user, I can keep my polls and come back later to access them.
- As an authenticated user, I can share my polls with my friends.
- As an authenticated user, I can see the aggregate results of my polls.
- As an authenticated user, I can delete polls that I decide I don't want anymore.
- As an authenticated user, I can create a poll with any number of possible items.
- As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
- As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
- As an authenticated user, if I don't like the options on a poll, I can create a new option.

**Backend**:
- Express (v4)
- Babel (v6 with presets env, react, stage-2)
- Sequelize (v4)
- Apollo GraphQL Server (v1.3)

**Database**:
- Development: SQLITE
- Production: Postgres on Heroku

**Frontend**:
- React (v16.4)
- React Router (v4)
- React-Facebook to integrate Facebook Login
- Apollo GraphQL Client (v2.1)
- Bootstrap (v4)
- FontAwesome (v4)
- Fela
- Awesome Notifications
