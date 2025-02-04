const PARAMETER_LIMITS = {
  temperature: {min: 0, max: 45, message: 'Temperature is out of range!'},
  soc: {min: 20, max: 80, message: 'State of Charge is out of range!'},
  chargeRate: {min: 0, max: 0.8, message: 'Charge rate is out of range!'},
};

function isWithinRange(value, {min, max}) {
  return value >= min && value <= max;
}

function batteryIsOk(temperature, soc, chargeRate) {
  const parameters = {temperature, soc, chargeRate};
  let allOk = true;

  for (const [key, value] of Object.entries(parameters)) {
    if (!isWithinRange(value, PARAMETER_LIMITS[key])) {
      console.log(PARAMETER_LIMITS[key].message);
      allOk = false;
    }
  }

  return allOk;
}

module.exports = {batteryIsOk};
