const PARAMETER_LIMITS = {
  temperature: { min: 0, max: 45, message: 'Temperature is out of range!' },
  soc: { min: 20, max: 80, message: 'State of Charge is out of range!' },
  chargeRate: { min: 0, max: 0.8, message: 'Charge rate is out of range!' },
};

const WARNING_TOLERANCE = 0.05; 

const WARNING_MESSAGES = {
  temperature: { low: 'Warning: Approaching lower temperature limit!', high: 'Warning: Approaching upper temperature limit!' },
  soc: { low: 'Warning: Approaching discharge!', high: 'Warning: Approaching charge-peak!' },
  chargeRate: { low: 'Warning: Approaching minimum charge rate!', high: 'Warning: Approaching maximum charge rate!' },
};

function isWithinRange(value, { min, max }) {
  return value >= min && value <= max;
}

function checkWarnings(value, { min, max }, key) {
  const tolerance = max  * WARNING_TOLERANCE;
  if (value >= min && value <= min + tolerance) {
    console.log(WARNING_MESSAGES[key].low);
  } 
  if (value >= max - tolerance && value <= max) {
    console.log(WARNING_MESSAGES[key].high);
  }
}

function batteryIsOk(temperature, soc, chargeRate) {
  const parameters = { temperature, soc, chargeRate };
  let allOk = true;

  for (const [key, value] of Object.entries(parameters)) {
    if (!isWithinRange(value, PARAMETER_LIMITS[key])) {
      console.log(PARAMETER_LIMITS[key].message);
      allOk = false;
    } else {
      checkWarnings(value, PARAMETER_LIMITS[key], key);
    }
  }

  return allOk;
}

module.exports = { batteryIsOk };
