"use strict";(self.webpackChunksrc=self.webpackChunksrc||[]).push([[54],{1096:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>s,metadata:()=>d,toc:()=>c});var t=o(4848),i=o(8453);const s={},r="IMotionModel",d={id:"Modules/IMotionModel",title:"IMotionModel",description:"A motion model class receives informations (e.g. frames, estimated flow and depth) and produce an initial guess to the pose of incoming frame under global coordinate.",source:"@site/docs/02-Modules/05-IMotionModel.md",sourceDirName:"02-Modules",slug:"/Modules/IMotionModel",permalink:"/wiki/Modules/IMotionModel",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"IKeypointSelector",permalink:"/wiki/Modules/IKeypointSelector"},next:{title:"IObservationFilter",permalink:"/wiki/Modules/IObservationFilter"}},l={},c=[{value:"Interface",id:"interface",level:2},{value:"Methods to Implement",id:"methods-to-implement",level:3},{value:"Implementations",id:"implementations",level:2}];function a(e){const n={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"imotionmodel",children:"IMotionModel"})}),"\n",(0,t.jsxs)(n.p,{children:["A motion model class receives informations (e.g. frames, estimated flow and depth) and produce an initial guess to the pose of incoming frame ",(0,t.jsx)(n.strong,{children:"under global coordinate"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"interface",children:"Interface"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",metastring:'title="Module/MotionModel.py"',children:"class IMotionModel(ABC, ConfigTestableSubclass):\r\n    def __init__(self, config: SimpleNamespace):\r\n        self.config : SimpleNamespace = config\r\n    \r\n    @abstractmethod\r\n    def predict(self, frame: SourceDataFrame, flow: torch.Tensor | None, depth: torch.Tensor | None) -> pp.LieTensor:\r\n        ...\r\n    \r\n    @abstractmethod\r\n    def update(self, pose: pp.LieTensor) -> None:\r\n        ...\n"})}),"\n",(0,t.jsx)(n.h3,{id:"methods-to-implement",children:"Methods to Implement"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"IMotionModel.predict(...) -> pp.LieTensor"})}),"\n",(0,t.jsx)(n.p,{children:"Estimate the pose of next frame given current frame, estimated depth and flow."}),"\n",(0,t.jsxs)(n.p,{children:["Returns ",(0,t.jsx)(n.code,{children:"pose"}),", a ",(0,t.jsx)(n.code,{children:"(7,)"})," shaped pypose.LieTensor (SE3 ltype) under world coordinate predicted pose of next frame."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"IMotionModel.update(self, pose: pp.LieTensor) -> None"})}),"\n",(0,t.jsx)(n.p,{children:"Receive a feedback (optimized pose) and may (or may not) use this method to refine next prediction."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"implementations",children:"Implementations"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"class GTMotionwithNoise(IMotionModel)"})}),"\n",(0,t.jsxs)(n.p,{children:["Apply GT motion with noise (can be disabled by setting ",(0,t.jsx)(n.code,{children:"noise_std"})," to 0.0 in config) on previous optimized pose to predict next pose."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"class TartanMotionNet(IMotionModel)"})}),"\n",(0,t.jsx)(n.p,{children:"Apply motion estimated by MotionNet adapted from TartanVO on previously optimized pose to predict next pose."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"class StaticMotionModel(IMotionModel)"})}),"\n",(0,t.jsx)(n.p,{children:"Assumes the camera is static and simply record and returns the pose of previous frame."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"class ReadPoseFile(IMotionModel)"})}),"\n",(0,t.jsx)(n.p,{children:"Use an external file of Nx7 SE3 poses as motion model output poses."}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["Specifically, the module will ",(0,t.jsx)(n.em,{children:"not"})," output these poses directly but calculate the motion\r\nand apply motion on modified poses (potentially by optimizer) iteratively."]})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>d});var t=o(6540);const i={},s=t.createContext(i);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);