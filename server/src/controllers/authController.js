import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';
import { recordAuditLog } from '../utils/audit.js';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid credentials' });
    }

    const { email, password } = parsed.data;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.COOKIE_SAME_SITE || (isProd ? 'none' : 'lax'),
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    if (process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res.cookie('token', token, cookieOptions);

    await recordAuditLog({
      userId: user._id,
      action: 'LOGIN',
      entityType: 'User',
      entityId: user._id,
      details: `${user.email} signed in`,
    });

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        slug: user.slug,
        email: user.email,
        role: user.role,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.COOKIE_SAME_SITE || (isProd ? 'none' : 'lax'),
    secure: isProd,
  };
  if (process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }
  res.clearCookie('token', cookieOptions);
  return res.json({ message: 'Logged out successfully' });
}

export async function getCurrentUser(req, res) {
  return res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      slug: req.user.slug,
      email: req.user.email,
      role: req.user.role,
      bio: req.user.bio,
    },
  });
}
