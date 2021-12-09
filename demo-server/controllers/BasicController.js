module.exports = {
  home: (req, res) => {
    res.send('This is the home page');
  },
  second: (req, res) => {
    const date = new Date();
    console.log(`${date.toLocaleDateString()} ${date.toLocaleTimeString()} - ${JSON.stringify(req.body)}`);
    res.send('This is the second page');
  },
};
