import About from '../models/aboutme.js';

// Get for authenticated users (admin)
export const getAboutMe = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    if (!aboutData) {
      return res.status(404).json({ about: '' });
    }
    res.json({ about: aboutData.about });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get for public users (homepage)
export const getAboutPublic = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    if (!aboutData) {
      return res.json({ about: '' });
    }
    res.json({ about: aboutData.about });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Add this — used to update About Me (for admin)
export const updateAboutMe = async (req, res) => {
  const { about } = req.body;

  try {
    let aboutData = await About.findOne();

    if (aboutData) {
      aboutData.about = about;
      await aboutData.save();
    } else {
      aboutData = new About({ about });
      await aboutData.save();
    }

    res.json({ success: true, about: aboutData.about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update bio' });
  }
};
