---
title: IKeypointSelector
---

# IKeypointSelector

This module selects keypoint given current frame and (optionally) estimated depth, depth_cov, and flow_cov.

The selector also receives an argument `numPoint` as hint to how many keypoints to select. 

:::info
The `numPoint` hint may *not* be followed strictly by the selector. Number of keypoint will fluctuate based on different selection strategy and the input conditions.
:::

:::warning
    Keypoints in this codebase are always arranged in (u, v) format. This means that you need to output the index of keypoints in **different** coordinate system as pytorch. Use `image[kp[..., 1], kp[..., 0]]` to read value of image on all u-v coords of keypoints.
:::

## Interface

```python title="Module/IKeypointSelector.py"
class IKeypointSelector(ABC, ConfigTestableSubclass):
    @abstractmethod
    def select_point(
        self,
        frame: SourceDataFrame,
        numPoint: int,
        depth_map: torch.Tensor | None,
        depth_cov_map: torch.Tensor | None,
        flow_cov_map: torch.Tensor | None,
    ) -> torch.Tensor:
        ...
```

### Methods to Implement

* `IKeypointSelector.select_point`

    Select keypoint for tracking using given frame, (optionally) estimated depth, depth_cov, and flow_cov.
    Return keypoint as a `torch.Tensor` with `dtype=torch.float` and shape (N, 2) where keypoints are arranged in (u, v) format.


## Implemenations

* `class SelectorCompose(IKeypointSelector)`

    A higher-order module that combines multiple `IKeypointSelector` instances with a relative weight. This module distribute keypoint selection to all "sub-selectors" according to the provided weight on every `select_point` call.

    :::warning
    The distribution of keypoint selection is achieved by estimating and setting `numPoint` for each selector included. Therefore, it might not be an accurate split, and the module makes no guarantee to the number of keypoints selected.
    :::

* `class RandomSelector(IKeypointSelector)`

    Uniformly random select keypoints within the scope of [mask_width : -mask_width]. `mask_width` is the width of image border that we don't want to select keypoint from. 

* `class GradientSelector(IKeypointSelector)`

    Select keypoint based on gradient information. Will random select points with sufficiently large local image gradient (calculated by Sobel filter).

* `class SparseGradienSelector(IKeypointSelector)`

    Select keypoint based on gradient information. Will random select points with sufficiently large local image gradient (calculated by Sobel filter).
    
    Ensured sparsity of keypoint by applying non-maximum suppresion (NMS) on image gradient
    of keypoint candidates.

* `class GridSelector(IKeypointSelector)`

    Select keypoint following the grid - strictly uniform across the entire image.
    
    The requested `numPoint` will be used to estimate the spacing between keypoints, but the 
    selector may not generate exactly `numPoint` amount of keypoints.

    :::info
    This selector is deterministic and is used for internal benchmarking when we want reproducible results.
    :::

* `class CovAwareSelector(IKeypointSelector)`

    The keypoint selector used by the MAC-VO.
    
    Selecting keypoints based on estimated depth, depth_cov, and flow_cov. See sect III.B 
    of paper for detail.

* `class CovAwareSelector_NoDepth(IKeypointSelector)`

    Selecting keypoints based on estimated flow_cov. 
    
    The main difference with CovAwareSelector is dropping filters related with depth (i.e. `max_depth` and `depth_cov`).

