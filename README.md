# Jayway Robot Exercise

This is a simple programmable robot with a minimalistic GUI made in AngularJS. It can be configured to accept commands using English or Swedish (FLR or GVH) and moves in a user defined two dimensional space. Any command which would put the robot outside the defined area is ignored (the robot hits the wall). 

## Project layout

There's basically no layout. JS and CSS are in the src/ directory, tests in spec/. The main application is run from the index.html file, while tests are run from SpecRunner.html. The dependencies (lodash and AngularJS) are in /lib.

## Architecture

AngularJS is simply used to render the form used for configurations and commands, which are then passed on to the separate robot code found in `robot.js`. This code is written in an immutable style, with an application state object being replaced with a modified version in each iteration of the robot command list. This means the main loop of the application is a clean lodash reduce expression: `_.reduce(translatedCommands, getNextState, initState)` whoch resolves into the final application state.

The robot application is not wrapped in a module, but no internal values are exposed, and there are no global variables (outside of the function references themselves). All relevant data is contained in the application state object.
