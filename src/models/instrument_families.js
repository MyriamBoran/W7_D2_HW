const PubSub = require("../helpers/pub_sub.js");

const InstrumentFamilies = function(instrument) {
  this.instrument = instrument;
};

InstrumentFamilies.prototype.bindEvents = function() {
  PubSub.publish("Instruments:all-instruments-ready", this.instrument);

  PubSub.subscribe("InstrumentFamilyView:selected", evt => {
    const chosenInstrument = evt.detail;
    this.publishInstrumentDetail(chosenInstrument);
  });
};

InstrumentFamilies.prototype.publishInstrumentDetail = function(
  instrumentIndex
) {
  const selectedInstrument = this.instrument[instrumentIndex];
  PubSub.publish("InstrumentFamily:instrument-ready", selectedInstrument);
};

module.exports = InstrumentFamilies;
