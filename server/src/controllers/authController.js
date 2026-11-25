// TODO: Implement bcrypt password verification, HTTP-only JWT cookie login, logout & session check
export async function login(req, res, next) {
  try {
    res.status(501).json({ message: 'Admin login endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
}

export async function getCurrentUser(req, res) {
  res.json({ user: req.user });
}
