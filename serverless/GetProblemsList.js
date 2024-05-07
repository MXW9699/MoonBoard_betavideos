// Import required dependencies
const db = require('../model/database');

// Define the serverless function
module.exports = async (req, res) => {
  try {
    // Retrieve the value of the 'id' query parameter from the request
    const search = req.query.id || '';

    // Retrieve data from the database using the search parameter
    const data = await db.from('Problems_2019')
      .select('*')
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true });

    // Respond with the retrieved data as JSON
    res.status(200).json(data.data);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error at getting problems list:', error);
    res.status(500).json({ error: 'Error at getting problems list' });
  }
};
