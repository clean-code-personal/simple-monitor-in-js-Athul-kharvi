function checkTemperature(temperature) {
  return temperature >= 0 && temperature <= 45;
}

function checkSoc(soc) {
  return soc >= 20 && soc <= 80;
}

function checkChargeRate(chargeRate) {
  return chargeRate <= 0.8;
}

function batteryIsOk(temperature, soc, chargeRate) {
  const isTemperatureOk = checkTemperature(temperature);
  const isSocOk = checkSoc(soc);
  const isChargeRateOk = checkChargeRate(chargeRate);

  if (!isTemperatureOk) {
    console.log('Temperature is out of range!');
  }
  if (!isSocOk) {
    console.log('State of Charge is out of range!');
  }
  if (!isChargeRateOk) {
    console.log('Charge rate is out of range!');
  }

  return isTemperatureOk && isSocOk && isChargeRateOk;
}

module.exports = {
  batteryIsOk,
};
s