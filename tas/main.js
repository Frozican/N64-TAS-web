let tasPaused = true;
let ModuleReady = false;

let frameIndex = 0;
let frameStates = [];

// Controller-Input Zustand (noch ohne Logik)
const controllerState = {
    A: 0,
    B: 0,
    Z: 0,
    Start: 0,
    Up: 0,
    Down: 0,
    Left: 0,
    Right: 0,
    L: 0,
    R: 0,
    CUp: 0,
    CDown: 0,
    CLeft: 0,
    CRight: 0,
    StickX: 0,
    StickY: 0
};

// Buttons als Variablen
const pauseBtn = document.getElementById("pauseBtn");
const frameForwardBtn = document.getElementById("frameForwardBtn");
const frameBackBtn = document.getElementById("frameBackBtn");

Module.onRuntimeInitialized = () => {
    ModuleReady = true;
    console.log("N64Wasm connected.");
};

// Savestate speichern
function saveState() {
    const size = Module._state_get_size();
    const ptr = Module._malloc(size);
    Module._state_save(ptr);
    const data = Module.HEAPU8.slice(ptr, ptr + size);
    Module._free(ptr);
    return data;
}

// Savestate laden
function loadState(data) {
    const ptr = Module._malloc(data.length);
    Module.HEAPU8.set(data, ptr);
    Module._state_load(ptr);
    Module
