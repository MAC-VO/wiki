---
title: IFrontend
---

# IFrontend

Provides a interface for jointly estimate flow and depth (and optionally their covariances).

**Why an additional layer of abstraction?**

Sometime the depth estimation and matching are tightly coupled, so we need a way to combine them. For instance, if depth (using disparity) and matching uses the same network with same weight, instead of inference twice in sequential mannor, we can compose a batch with size of 2 and inference once.

**How to use this?**

- If there's no specific need (e.g. for performance improvement mentioned above), just use the `FrontendCompose`
    to combine an IStereoDepth and an IMatcher. This should work just fine.

- Otherwise implement a new IFrontend and plug it in the pipeline.

## Interface

```python title="Module/Frontend/Frontend.py"
class IFrontend(ABC, Generic[T_Context], ConfigTestableSubclass):
    @property
    @abstractmethod
    def provide_cov(self) -> tuple[bool, bool]: ...
    
    @abstractmethod
    def init_context(self) -> T_Context: ...
    
    @overload
    @abstractmethod
    def estimate(self, frame_t1: None, frame_t2: SourceDataFrame) -> \
        tuple[torch.Tensor, torch.Tensor | None, None, None]: ...
    
    @overload
    @abstractmethod
    def estimate(self, frame_t1: SourceDataFrame, frame_t2: SourceDataFrame) -> \
        tuple[torch.Tensor, torch.Tensor | None, torch.Tensor, torch.Tensor | None]: ...
    
    @abstractmethod
    def estimate(self, frame_t1: SourceDataFrame | None, frame_t2: SourceDataFrame) -> \
        tuple[torch.Tensor, torch.Tensor | None, torch.Tensor | None, torch.Tensor | None]:
            ...
```

### Methods to Implement

* `IFrontend.estimate(frame_t1: SourceDataFrame, frame_t2: SourceDataFrame) -> (depth, depth_cov, match, match_cov)`

    Given two frames with imageL, imageR with shape of Bx3xHxW, return `output` where

    * `depth`   - Bx1xHxW shaped torch.Tensor, estimated depth map for **frame_t2**
    * `depth_cov`   - Bx1xHxW shaped torch.Tensor or None, estimated covariance of depth map (if provided) for **frame_t2**
    * `match`   - Bx2xHxW shaped torch.Tensor, estimated optical flow map from **frame_t1** to **frame_t2**
    * `match_cov`   - Bx2xHxW shaped torch.Tensor or None, estimated covariance of optical flow map (if provided) from **frame_t1** to **frame_t2**

    If frame_t1 is None, return only `depth` and `depth_cov` and leave `match` and `match_cov` as None.

    :::warning

    All outputs maybe padded with `nan` if model can't output prediction with same shape as input image.

    :::

* `IFrontend.provide_cov`

    Property revealing whether the current frontend model provides `flow` and `depth` covariance. Return `tuple[bool, bool]` where `0`-th element is for flow covariance and `1`-st element is for depth covariance.

* `IFrontend.init_context(self) -> T_Context`

    Works similar to the `__init__` method in python, where all used properties are stored in a dictionary and stored at `self.context`. This is for better static type inference on the property of each implementation of `IFrontend`.

    In this method you can access the configuration passed on initialization by `self.config`.

## Implementations

* `class FrontendCompose(IFrontend[ComposeContext])`

    A higher-order-module that creates an `IFrontend` module by combining an `IMatcher` and an `IStereoDepth` module.

* :star: `class FlowFormerCovFrontend(IFrontend[ModelContext])`

    Given two stereo images taken at time `t` and `t+1`, this module jointly estimates the flow between `(t+1.Left, t+1.Right)` and `(t.Left, t+1.Left)`. The first is used to compute the depth of frame `t+1` while the second is used to compute the flow (matching) between frame `t` and `t+1`.

    This module also implements various speedup & optimization techniques like `torch.jit.script`, `CUDAGraph` acceleration and (release in near future) the TensorRT acceleration.
