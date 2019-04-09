const PubSub = require("../helpers/pub_sub.js");

const InstrumentSelectView = function(select) {
  this.select = select;
};

InstrumentSelectView.prototype.bindEvents = function() {
  PubSub.subscribe("Instruments:all-instruments-ready", evt => {
    const allInstruments = evt.detail;
    this.populate(allInstruments);
  });
  this.select.addEventListener("change", evt => {
    const selectedInstrumentName = evt.target.value;
    PubSub.publish("InstrumentFamilyView:selected", selectedInstrumentName);
  });
};

InstrumentSelectView.prototype.populate = function(instrumentData) {
  instrumentData.forEach((instrument, index) => {
    const option = document.createElement("option");
    option.textContent = instrument.name;
    option.value = index;
    this.select.appendChild(option);
  });
};

module.exports = InstrumentSelectView;
