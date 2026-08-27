#!/usr/bin/env bash
# Git-Submodul laden
git submodule update --init --recursive

# Emscripten installieren und aktivieren
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# In den Code-Ordner wechseln und Makefile anpassen
cd ../code
sed -i 's/EXTRA_EXPORTED_RUNTIME_METHODS/EXPORTED_RUNTIME_METHODS/g' Makefile

# Den Build mit allen nötigen Flags starten
CFLAGS="-Wno-error=incompatible-pointer-types -Wno-error=implicit-int" \
EMCC_CFLAGS="-Wno-error=incompatible-pointer-types -Wno-error=implicit-int" \
LDFLAGS="-sDEFAULT_TO_CXX" \
EMCC_LDFLAGS="-sDEFAULT_TO_CXX" \
make
