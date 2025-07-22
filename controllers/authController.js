// controllers/authController.js
exports.googleLogin = (req, res, next) => {
  // Handled by Passport middleware, no logic here
  next();
};

exports.googleCallback = (req, res) => {
  if (req.user) {
    res.redirect('/auth/success');
  } else {
    res.redirect('/auth/failure');
  }
};

exports.loginSuccess = (req, res) => {
  if (req.user) {
    res.json({ message: '🎉 You are authenticated!', user: req.user });
  } else {
    res.status(401).json({ message: '❌ Not authenticated' });
  }
};

exports.loginFailure = (req, res) => {
  res.status(401).json({ message: '❌ Login failed.' });
};

exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: '👋 You have logged out successfully.' });
    });
  });
};
