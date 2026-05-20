import './util/polyfills';
import merge from './util/merge';
import configuration from './configuration/index';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function safetyResultsOverTime(element, settings) {
    const mergedSettings = merge(configuration.defaultSettings, settings); //Merge user settings onto default settings.
    const syncedSettings = configuration.syncSettings(mergedSettings); //Sync properties within merged settings, e.g. data mappings.
    const syncedControlInputs = configuration.syncControlInputs(
        configuration.controlInputs(),
        syncedSettings
    ); //Sync merged settings with controls.

    //Define controls.
    const controls = createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });

    //Define chart.
    const chart = createChart(element, syncedSettings, controls);

    //Attach callbacks to chart.
    for (const callback in callbacks)
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    return chart;
}
