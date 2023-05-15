const {
  getAllLaunches,
  addNewLaunch,
  existsWithLaunchId,
  abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  console.log('here');
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: 'Missing required properties',
    });
  }
  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }
  addNewLaunch(req.body);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsWithLaunchId(launchId)) {
    //if launch doesnt exist, 404
    return res.status(404).json({
      error: 'Launch not found',
    });
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
