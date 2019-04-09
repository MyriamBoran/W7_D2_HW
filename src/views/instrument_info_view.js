const PubSub = require("../helpers/pub_sub.js");

const InstrumentInfoView = function(container) {
  this.container = container;
};

InstrumentInfoView.prototype.bindEvents = function() {
  PubSub.subscribe("InstrumentFamily:instrument-ready", evt => {
    const instrumentObject = evt.detail;
    this.render(instrumentObject);
  });
};

InstrumentInfoView.prototype.render = function(instrument) {
  this.container.innerHTML = "";

  const infoList = this.createInfoList(instrument);

  this.container.appendChild(infoList);
};

InstrumentInfoView.prototype.createInfoList = function(instrument) {
  const infoList = document.createElement("ul");

  const liName = this.createLi(` ${instrument.name}`, infoList);
  const liDescription = this.createLi(` ${instrument.description}`, infoList);
  const liInstruments = this.createLi(
    `Instruments include:  ${instrument.instruments}`,
    infoList
  );

  return infoList;
  // console.log(infoList);
};

InstrumentInfoView.prototype.createLi = function(textContent, ul) {
  const li = document.createElement("li");
  li.textContent = textContent;
  ul.appendChild(li);
};

module.exports = InstrumentInfoView;
