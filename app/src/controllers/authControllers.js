const authModels = require("../models/authModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authControllers = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const existingUser = await authModels.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const newUser = await authModels.createUser({ email, password });

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" },
      );

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const user = await authModels.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await authModels.verifyPassword({
        plain_password: password,
        hashed_password: user.password,
      });

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" },
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = authControllers;
