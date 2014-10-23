#!/bin/bash

node --debug-brk index.js &
COFFEE_PID=$!

node-inspector --no-preload&
INSPECTOR_PID=$!

wait $COFFEE_PID
kill -9 $INSPECTOR_PID
