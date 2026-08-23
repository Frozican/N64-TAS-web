```
# N64‑TAS Web

A simple browser-based Nintendo 64 emulator compiled to WebAssembly using Emscripten.  
This project provides a minimal web interface for loading ROMs, remapping controls, and running N64 games directly in the browser.

## Features
- Runs N64 games in the browser (WebAssembly)
- Drag & drop ROM loading
- Button remapping
- Fullscreen & zoom options
- Lightweight and clean UI

## Build Instructions

### 1. Activate Emscripten
```bash
source ./emsdk/emsdk_env.sh
```

### 2. Configure the project
```
cd N64Wasm/code
mkdir build
cd build
emcmake cmake ..
```

### 3. Build
```
emmake make
```

### 4. Run locally
```
cd ../dist
python3 -m http.server 8080
```

Open in your browser:
```
http://localhost:8080
```

## Usage
1. Open the web interface.
2. Click **Browse** or drag a ROM file into the window.
3. Remap buttons if needed.
4. Play.

Supported ROM formats:
- `.z64`
- `.n64`
- `.v64`

## License
MIT License.
