---
slug: /
sidebar_position: 1
---


# Introduction

This document is for people who want to extend and redevelop based on the codebase of MAC-VO. The document is organized in the following order

1. First, we introduce the configuration's syntax.

2. We then introduce all the modules in current repo and provide their interface spec. The modularity of MAC-VO allows us to **compose a new visual odometry** purely by modifying config.

2. After that, we introduce how to extend the MAC-VO. For instance, adapting a new flow estimation model to demonstrate the performance on down-stream task; or replace the backend optimizer with more "traditional" GT-SAM.

3. Finally we introduce some minor utilities provided along with the codebase that might be helpful.


## Change Log

* `2024 Nov 11` - Adding notes on how to extend Dataset of MAC-VO. Finish `IObservationFilter` and `IObservationCov` documentation.

