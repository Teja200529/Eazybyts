// server/routes/project.js

import express from 'express';       // ✅ import express
const router = express.Router();     // ✅ create router

// ✅ define your route(s)
router.get('/', (req, res) => {
  res.send('Project route is working');
});

// ✅ export the router as default
export default router;
