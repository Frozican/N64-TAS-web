let tasPaused = true;
let ModuleReady = false;

let frameIndex = 0;
let frameStates = [];

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
    Module._free(ptr);
}

// Pause
pauseBtn.onclick = () => {
    tasPaused = !tasPaused;
    pauseBtn.textContent = tasPaused ? "Resume" : "Pause";
};

// Frame +1
frameForwardBtn.onclick = () => {
    if (!ModuleReady) return;

    Module._mainLoopStep();

    frameStates[frameIndex] = saveState();
    frameIndex++;
};

// Frame -1
frameBackBtn.onclick = () => {
    if (!ModuleReady) return;
    if (frameIndex <= 0) return;

    frameIndex--;
    loadState(frameStates[frameIndex]);
};
