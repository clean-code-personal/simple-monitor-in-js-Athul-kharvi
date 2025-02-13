const {expect} = require('chai');
const { batteryIsOk, setLanguage } = require('../bms-monitor');

describe('BMS monitor', ()=> {
  it('reports ok when all parameters are in range', ()=> {
    setLanguage('en');
    expect(batteryIsOk(25, 70, 0.7)).to.be.true;
  });
  
  it('reports not ok when temperature is out of range', ()=> {
    setLanguage('de');
    expect(batteryIsOk(50, 85, 0)).to.be.false;
  });

  it('triggers a warning when temperature is approaching the limit', () => {
    expect(batteryIsOk(2, 70, 0.5)).to.be.true; 
    expect(batteryIsOk(44, 70, 0.5)).to.be.true; 
  });
});
