import express from 'express';
import Profile from '../models/profile.js';

const router = express.Router();

// Get full profile (about + skills)
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile', error: err.message });
  }
});

// Create or update full profile (about + skills)
router.post('/', async (req, res) => {
  try {
    const { about, skills } = req.body;
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile({ about, skills });
    } else {
      profile.about = about;
      profile.skills = skills;
    }

    await profile.save();
    res.json({ msg: 'Profile updated', profile });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating profile', error: err.message });
  }
});


// ✅ New: Get only skills
router.get('/skills', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile?.skills || []);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching skills', error: err.message });
  }
});

// ✅ New: Update only skills
router.post('/skills', async (req, res) => {
  try {
    const { skills } = req.body;
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile({ skills });
    } else {
      profile.skills = skills;
    }

    await profile.save();
    res.json({ msg: 'Skills updated successfully', skills: profile.skills });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating skills', error: err.message });
  }
});

export default router;
