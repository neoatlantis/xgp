import postal from "postal";

// for "desktop" alike events
const $desktop$ = postal.channel("desktop");

// for emergency shutdown, coordinating with different program parts
const $emergency$ = postal.channel("emergency");

export {
    $desktop$,
    $emergency$,
}
