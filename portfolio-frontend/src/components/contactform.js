import React, { useState } from 'react';
import API from '../api';  // Make sure API is correctly configured with your backend baseURL

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      await API.post('/contact', form);
      setMsg('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMsg(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </form>
  );
};

export default ContactForm;
