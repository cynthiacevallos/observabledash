// import {csvFormat, tsvParse} from "d3-dsv";
// import {utcParse} from "d3-time-format";
import {FileAttachment} from "observablehq:stdlib";

file = FileAttachment("./enaho-gobernabilidad.csv").csv()

file.slice(0, 5)
