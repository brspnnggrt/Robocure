# ROBO-CURE

## Introduction

Look at the other blogpost for more background from a functional point of view.

The choice to do pepper development using TypeScript might sound a little daunting, but in retrospect it was a good choice.
One of the main reasons is that the tablet on pepper is quite outdated when it comes to recent javascript functionalities.
Since typescript can be compiled to be compatible with Ecmascript5, there is no possibility to end up with incompatible code.
One of the drawbacks of transpiling javascript is that the debugging is not quite as straightforward, even if you use source maps.
Since javascript development on the tablet of pepper is already difficult, this is not really a concern.
A much more interesting approach in my opinion, is to use a flag that indicates whether or not tracing should be enabled, and log messages using alerts. If this is too of an inconvenience, you can also send the errors back to your host or server environment.
In any case, it is a breeze to work with async/await, template literals on peppers tablet, without worrying wether everything will break.



