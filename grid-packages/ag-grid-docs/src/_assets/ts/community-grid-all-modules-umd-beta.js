// for js examples that just require community functionality (landing pages, vanilla community examples etc)

const  ModuleRegistry = require("../../../../../grid-community-modules/core/src/ts/main").ModuleRegistry;
export * from "../../../../../grid-community-modules/core/src/ts/main";
export * from "../../../../../charts-community-modules/ag-charts-community/src/main";

/* MODULES - Don't delete this line */
const ClientSideRowModelModule = require("../../../../../grid-community-modules/client-side-row-model/dist/esm/es6/clientSideRowModelModule").ClientSideRowModelModule;
const CsvExportModule = require("../../../../../grid-community-modules/csv-export/dist/esm/es6/csvExportModule").CsvExportModule;
const InfiniteRowModelModule = require("../../../../../grid-community-modules/infinite-row-model/dist/esm/es6/infiniteRowModelModule").InfiniteRowModelModule;
ModuleRegistry.register(ClientSideRowModelModule);
ModuleRegistry.register(CsvExportModule);
ModuleRegistry.register(InfiniteRowModelModule);
ModuleRegistry.setIsBundled();