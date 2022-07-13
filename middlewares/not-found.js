const notFound = (req, res) => res.status(404).send("Route Doesnot Exists");

module.exports = notFound;
