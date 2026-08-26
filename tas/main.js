let tasPaused = true;
let ModuleReady = false;

let frameIndex = 0;
let frameStates = [];

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
document.getElementById("pauseBtn").onclick = () => {
    tasPaused = !tasPaused;
    document.getElementById("pauseBtn").textContent = tasPaused ? "Resume" : "Pause";
};

// Frame +1
document.getElementById("frameForwardBtn").onclick = () => {
    if (!ModuleReady) return;

    Module._mainLoopStep();

    frameStates[frameIndex] = saveState();
    frameIndex++;
};

// Frame -1
document.getElementById("frameBackBtn").onclick = () => {
    if (!ModuleReady) return;
    if (frameIndex <= 0) return;

    frameIndex--;
    loadState(frameStates[frameIndex]);
};
