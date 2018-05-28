import uuid from 'uuid/v4';
import { user as User } from './models';

export default async function processLogin(req, res, next) {
  try {
    const { firstName, name, email } = req.body;

    const token = Math.random().toString(36).substr(2, 100);
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        id: uuid(),
        displayName: firstName,
        name,
        email,
      });
    }

    res.cookie('token', `${user.id}|${token}`, { signed: true, httpOnly: true });
    console.log('redirect');
    res.redirect(302, '/');
  } catch (err) {
    next(err);
  }
}
