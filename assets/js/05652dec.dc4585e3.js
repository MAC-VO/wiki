"use strict";(self.webpackChunksrc=self.webpackChunksrc||[]).push([[127],{7953:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var o=t(4848),r=t(8453);const i={title:"IFrontend"},s="IFrontend",d={id:"Modules/IFrontend",title:"IFrontend",description:"Provides a interface for jointly estimate flow and depth (and optionally their covariances).",source:"@site/docs/02-Modules/03-IFrontend.md",sourceDirName:"02-Modules",slug:"/Modules/IFrontend",permalink:"/wiki/Modules/IFrontend",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"IFrontend"},sidebar:"tutorialSidebar",previous:{title:"IStereoDepth",permalink:"/wiki/Modules/IStereoDepth"},next:{title:"IKeypointSelector",permalink:"/wiki/Modules/IKeypointSelector"}},c={},a=[{value:"Interface",id:"interface",level:2},{value:"Methods to Implement",id:"methods-to-implement",level:3},{value:"Implementations",id:"implementations",level:2}];function l(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"ifrontend",children:"IFrontend"})}),"\n",(0,o.jsx)(n.p,{children:"Provides a interface for jointly estimate flow and depth (and optionally their covariances)."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Why an additional layer of abstraction?"})}),"\n",(0,o.jsx)(n.p,{children:"Sometime the depth estimation and matching are tightly coupled, so we need a way to combine them. For instance, if depth (using disparity) and matching uses the same network with same weight, instead of inference twice in sequential mannor, we can compose a batch with size of 2 and inference once."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"How to use this?"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["If there's no specific need (e.g. for performance improvement mentioned above), just use the ",(0,o.jsx)(n.code,{children:"FrontendCompose"}),"\r\nto combine an IStereoDepth and an IMatcher. This should work just fine."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Otherwise implement a new IFrontend and plug it in the pipeline."}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",metastring:'title="Module/Frontend/Frontend.py"',children:"class IFrontend(ABC, Generic[T_Context], ConfigTestableSubclass):\r\n    @property\r\n    @abstractmethod\r\n    def provide_cov(self) -> tuple[bool, bool]: ...\r\n    \r\n    @abstractmethod\r\n    def init_context(self) -> T_Context: ...\r\n    \r\n    @overload\r\n    @abstractmethod\r\n    def estimate(self, frame_t1: None, frame_t2: SourceDataFrame) -> \\\r\n        tuple[torch.Tensor, torch.Tensor | None, None, None]: ...\r\n    \r\n    @overload\r\n    @abstractmethod\r\n    def estimate(self, frame_t1: SourceDataFrame, frame_t2: SourceDataFrame) -> \\\r\n        tuple[torch.Tensor, torch.Tensor | None, torch.Tensor, torch.Tensor | None]: ...\r\n    \r\n    @abstractmethod\r\n    def estimate(self, frame_t1: SourceDataFrame | None, frame_t2: SourceDataFrame) -> \\\r\n        tuple[torch.Tensor, torch.Tensor | None, torch.Tensor | None, torch.Tensor | None]:\r\n            ...\n"})}),"\n",(0,o.jsx)(n.h3,{id:"methods-to-implement",children:"Methods to Implement"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"IFrontend.estimate(frame_t1: SourceDataFrame, frame_t2: SourceDataFrame) -> (depth, depth_cov, match, match_cov)"})}),"\n",(0,o.jsxs)(n.p,{children:["Given two frames with imageL, imageR with shape of Bx3xHxW, return ",(0,o.jsx)(n.code,{children:"output"})," where"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"depth"}),"   - Bx1xHxW shaped torch.Tensor, estimated depth map for ",(0,o.jsx)(n.strong,{children:"frame_t2"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"depth_cov"}),"   - Bx1xHxW shaped torch.Tensor or None, estimated covariance of depth map (if provided) for ",(0,o.jsx)(n.strong,{children:"frame_t2"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"match"}),"   - Bx2xHxW shaped torch.Tensor, estimated optical flow map from ",(0,o.jsx)(n.strong,{children:"frame_t1"})," to ",(0,o.jsx)(n.strong,{children:"frame_t2"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"match_cov"}),"   - Bx2xHxW shaped torch.Tensor or None, estimated covariance of optical flow map (if provided) from ",(0,o.jsx)(n.strong,{children:"frame_t1"})," to ",(0,o.jsx)(n.strong,{children:"frame_t2"})]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["If frame_t1 is None, return only ",(0,o.jsx)(n.code,{children:"depth"})," and ",(0,o.jsx)(n.code,{children:"depth_cov"})," and leave ",(0,o.jsx)(n.code,{children:"match"})," and ",(0,o.jsx)(n.code,{children:"match_cov"})," as None."]}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsxs)(n.p,{children:["All outputs maybe padded with ",(0,o.jsx)(n.code,{children:"nan"})," if model can't output prediction with same shape as input image."]})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"IFrontend.provide_cov"})}),"\n",(0,o.jsxs)(n.p,{children:["Property revealing whether the current frontend model provides ",(0,o.jsx)(n.code,{children:"flow"})," and ",(0,o.jsx)(n.code,{children:"depth"})," covariance. Return ",(0,o.jsx)(n.code,{children:"tuple[bool, bool]"})," where ",(0,o.jsx)(n.code,{children:"0"}),"-th element is for flow covariance and ",(0,o.jsx)(n.code,{children:"1"}),"-st element is for depth covariance."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"IFrontend.init_context(self) -> T_Context"})}),"\n",(0,o.jsxs)(n.p,{children:["Works similar to the ",(0,o.jsx)(n.code,{children:"__init__"})," method in python, where all used properties are stored in a dictionary and stored at ",(0,o.jsx)(n.code,{children:"self.context"}),". This is for better static type inference on the property of each implementation of ",(0,o.jsx)(n.code,{children:"IFrontend"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["In this method you can access the configuration passed on initialization by ",(0,o.jsx)(n.code,{children:"self.config"}),"."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"implementations",children:"Implementations"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"class FrontendCompose(IFrontend[ComposeContext])"})}),"\n",(0,o.jsxs)(n.p,{children:["A higher-order-module that creates an ",(0,o.jsx)(n.code,{children:"IFrontend"})," module by combining an ",(0,o.jsx)(n.code,{children:"IMatcher"})," and an ",(0,o.jsx)(n.code,{children:"IStereoDepth"})," module."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"class FlowFormerCovFrontend(IFrontend[ModelContext])"})}),"\n",(0,o.jsxs)(n.p,{children:["Given two stereo images taken at time ",(0,o.jsx)(n.code,{children:"t"})," and ",(0,o.jsx)(n.code,{children:"t+1"}),", this module jointly estimates the flow between ",(0,o.jsx)(n.code,{children:"(t+1.Left, t+1.Right)"})," and ",(0,o.jsx)(n.code,{children:"(t.Left, t+1.Left)"}),". The first is used to compute the depth of frame ",(0,o.jsx)(n.code,{children:"t+1"})," while the second is used to compute the flow (matching) between frame ",(0,o.jsx)(n.code,{children:"t"})," and ",(0,o.jsx)(n.code,{children:"t+1"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["This module also implements various speedup & optimization techniques like ",(0,o.jsx)(n.code,{children:"torch.jit.script"}),", ",(0,o.jsx)(n.code,{children:"CUDAGraph"})," acceleration and (release in near future) the TensorRT acceleration."]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>d});var o=t(6540);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);