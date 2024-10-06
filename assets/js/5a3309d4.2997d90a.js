"use strict";(self.webpackChunksrc=self.webpackChunksrc||[]).push([[178],{6099:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var i=n(4848),r=n(8453);const o={title:"Backend Optimizer",description:"Swap the backend optimizer for different residual or graph formulation."},a="Extending Optimizer in MAC-VO",s={id:"Redevelop/NewOptimizer",title:"Backend Optimizer",description:"Swap the backend optimizer for different residual or graph formulation.",source:"@site/docs/03-Redevelop/01-NewOptimizer.md",sourceDirName:"03-Redevelop",slug:"/Redevelop/NewOptimizer",permalink:"/Redevelop/NewOptimizer",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Backend Optimizer",description:"Swap the backend optimizer for different residual or graph formulation."},sidebar:"tutorialSidebar",previous:{title:"Frontend Network",permalink:"/Redevelop/NewFrontend"},next:{title:"Utility",permalink:"/category/utility"}},l={},c=[{value:"The <code>IOptimizer</code> Interface",id:"the-ioptimizer-interface",level:2}];function d(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"extending-optimizer-in-mac-vo",children:"Extending Optimizer in MAC-VO"})}),"\n",(0,i.jsxs)(t.h2,{id:"the-ioptimizer-interface",children:["The ",(0,i.jsx)(t.code,{children:"IOptimizer"})," Interface"]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"IOptimizer"})," is the interface for the optimizer used in MAC-VO. It is the most complex interface in this project since it allows running any optimizer in sequential/parallel mode according to the config."]}),"\n",(0,i.jsxs)(t.p,{children:["The Optimizer runs in two modes but the user only need to implement a single set of interface, which contains ",(0,i.jsx)(t.em,{children:"four methods"})," and ",(0,i.jsx)(t.em,{children:"three data (message) types"})]}),"\n",(0,i.jsx)(t.p,{children:"Data:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"init_context"}),' - initialize the "context" of the optimizer. Essentially, context is like the ',(0,i.jsx)(t.code,{children:"self"})," in Python but is represented as a separate instance since ",(0,i.jsx)(t.code,{children:"self"})," cannot be sent directly to the child process."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"_get_graph_args"})," - given the map constructed by odometry and some frames to optimize on, this method extracts all information required to build the optimization problem."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"_optimize"})," - Given context and argument, construct the optimization problem, solve it, and return the updated context and result."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"_write_map"})," - Given the result returned from ",(0,i.jsx)(t.code,{children:"_optimize"}),", update the map (write the result back to the map)"]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Data (Message) Type:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"T_Context"})," - an arbitrary class that stores the optimizer state accumulated/modified across frames."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"T_GraphInput"})," - a ",(0,i.jsxs)(t.strong,{children:["subclass of ",(0,i.jsx)(t.code,{children:"ITransferable"})]})," since this message may be communicated across processes. Contains all the data required to construct the optimization problem."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"T_GraphOutput"})," - a ",(0,i.jsxs)(t.strong,{children:["subclass of ",(0,i.jsx)(t.code,{children:"ITransferable"})]})," since this message may be communicated across processes. Contains results (of interest) for the optimization problem."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Detailed specification of methods to be implemented is provided below:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'class IOptimizer(ABC, Generic[T_GraphInput, T_Context, T_GraphOutput], SubclassRegistry):\r\n    """\r\n    Interface for optimization module. When config.parallel set to `true`, will spawn a child process\r\n    to run optimization loop in "background".\r\n    \r\n    `IOptimizer.optimize(global_map: TensorMap, frames: BatchFrames) -> None`\r\n    \r\n    * In sequential mode, will run optimization loop in blocking mannor and retun when optimization is finished.\r\n    \r\n    * In parallel mode, will send optimization job to child process and return immediately (non-blocking).\r\n    \r\n    `IOptimizer.write_back(global_map: TensorMap) -> None`\r\n    \r\n    * In sequential mode, will write back optimization result to global_map immediately and return.\r\n    \r\n    * In parallel mode, will wait for child process to finish optimization job and write back result to global_map. (blocking)\r\n\r\n    `IOptimizer.terminate() -> None`\r\n    \r\n    Force terminate child process if in parallel mode. no-op if in sequential mode.\r\n    """\r\n    ### Internal interface to be implemented\r\n    @abstractmethod\r\n    def _get_graph_args(self, global_map: TensorMap, frames: BatchFrame) -> T_GraphInput:\r\n        """\r\n        Given current global map and frames of interest (actual meaning depends on the implementation),\r\n        return T_GraphArgs that will be used by optimizer to construct optimization problem.\r\n        """\r\n        ...\r\n\r\n    @staticmethod\r\n    @abstractmethod\r\n    def init_context(config) -> T_Context:\r\n        """\r\n        Given config, initialize a *mutable* context object that is preserved between optimizations.\r\n        \r\n        Can also be used to avoid repetitive initialization of some objects (e.g. optimizer, robust kernel).\r\n        """\r\n        ...\r\n    \r\n    @staticmethod\r\n    @abstractmethod\r\n    def _optimize(context: T_Context, graph_args: T_GraphInput) -> tuple[T_Context, T_GraphOutput]:\r\n        """\r\n        Given context and argument, construct the optimization problem, solve it and return the \r\n        updated context and result.\r\n        """\r\n        ...\r\n    \r\n    @staticmethod\r\n    @abstractmethod\r\n    def _write_map(result: T_GraphOutput | None, global_map: TensorMap) -> None:\r\n        """\r\n        Given the result, write back the result to global_map.\r\n        """\r\n        ...\n'})}),"\n",(0,i.jsx)(t.p,{children:"Below we demonstrate how the internal interfaces mentioned above are orchestrated in sequential and parallel optimization mode."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:"Parallel Mode"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"ParallelMode",src:n(9252).A+"",width:"1734",height:"391"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:"Sequential Mode"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"SequentialMode",src:n(9536).A+"",width:"1717",height:"268"})})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},9252:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/parallel_optimization-7758cfa65d6b34e7cacc8a8d1843e194.png"},9536:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/sequential_optimization-33141ac698a11dd8c8dd4ce0f88173d0.png"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>s});var i=n(6540);const r={},o=i.createContext(r);function a(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);