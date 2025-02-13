//Setting the defautl language English
let LANGUAGE = 'en';

const PARAMETER_LIMITS = {
  temperature: { min: 0, max: 45},
  soc: { min: 20, max: 80},
  chargeRate: { min: 0, max: 0.8},
};

const WARNING_TOLERANCE = 0.05; 

const WARNING_MESSAGES = {
  en: {
    temperature: {
      warningLow: "Warning: Approaching lower temperature limit!",
      warningHigh: "Warning: Approaching upper temperature limit!",
      error: "Temperature is out of range!"
    },
    soc: {
      warningLow: "Warning: Approaching discharge!",
      warningHigh: "Warning: Approaching charge-peak!",
      error: "State of Charge is out of range!"
    },
    chargeRate: {
      warningLow: "Warning: Approaching minimum charge rate!",
      warningHigh: "Warning: Approaching maximum charge rate!",
      error: "Charge rate is out of range!"
    }
  },
  de: {
    temperature: {
      warningLow: "Warnung: Annäherung an die untere Temperaturgrenze!",
      warningHigh: "Warnung: Annäherung an die obere Temperaturgrenze!",
      error: "Die Temperatur liegt außerhalb des zulässigen Bereichs!"
    },
    soc: {
      warningLow: "Warnung: Annäherung an Entladung!",
      warningHigh: "Warnung: Annäherung an Ladungsspitze!",
      error: "Ladezustand ist außerhalb des zulässigen Bereichs!"
    },
    chargeRate: {
      warningLow: "Warnung: Annäherung an minimale Ladegeschwindigkeit!",
      warningHigh: "Warnung: Annäherung an maximale Ladegeschwindigkeit!",
      error: "Laderate liegt außerhalb des zulässigen Bereichs!"
    }
  }
};

function isWithinRange(value, { min, max }) {
  return value >= min && value <= max;
}

function checkWarnings(value, { min, max }, key) {
  const tolerance = max  * WARNING_TOLERANCE;
  if (value >= min && value <= min + tolerance) {
    console.log(WARNING_MESSAGES[LANGUAGE][key].warningLow);
  } 
  if (value >= max - tolerance && value <= max) {
    console.log(WARNING_MESSAGES[LANGUAGE][key].warningHigh);
  }
}

function batteryIsOk(temperature, soc, chargeRate) {
  const parameters = { temperature, soc, chargeRate };
  let allOk = true;

  for (const [key, value] of Object.entries(parameters)) {
    if (!isWithinRange(value, PARAMETER_LIMITS[key])) {
      console.log(WARNING_MESSAGES[LANGUAGE][key].error);
      allOk = false;
    } else {
      checkWarnings(value, PARAMETER_LIMITS[key], key);
    }
  }

  return allOk;
}

function setLanguage(lang) {
  if (WARNING_MESSAGES[lang]) {
    LANGUAGE = lang;
  } else {
    console.log("Setting back to English.");
    LANGUAGE = 'en';
  }
}

module.exports = { batteryIsOk, setLanguage };
