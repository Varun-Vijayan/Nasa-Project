const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require(`${__dirname}/../../models/launches.model`);

function httpGetAllLaunches(req, res) {
  console.log("Here");
  return res.status(200).json(getAllLaunches());
}
function httpAddNewLaunch(req, res) {
  let launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch properties/fields",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  console.log(launch.launchDate);

  if (launch.launchDate.toString() == "Invalid Date") {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  console.log("Here");
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  //if exists
  const aborted = abortLaunchById(launchId);
  return res.status(200).json({
    message: "Launch aborted",
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
