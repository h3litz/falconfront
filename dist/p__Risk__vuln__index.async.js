(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{tn6I:function(e,t,a){e.exports={tableList:"antd-pro-pages-risk-vuln-index-tableList",tableListOperator:"antd-pro-pages-risk-vuln-index-tableListOperator",tableListForm:"antd-pro-pages-risk-vuln-index-tableListForm",submitButtons:"antd-pro-pages-risk-vuln-index-submitButtons",btn:"antd-pro-pages-risk-vuln-index-btn"}},"w9+3":function(e,t,a){"use strict";a.r(t);a("PLIw");var n,l,r,s,i=a("oGlb"),o=a("U1Sa"),c=a.n(o),d=(a("N95i"),a("PGq9")),u=(a("/OsC"),a("C9m5")),m=(a("poft"),a("WFYK")),p=(a("14R3"),a("0y9A")),h=(a("iBTD"),a("+TXG")),k=(a("pGly"),a("LNHK")),y=(a("mcVV"),a("1DQy")),f=a("smUt"),b=a.n(f),E=(a("vkTA"),a("3gFK")),v=(a("FTfq"),a("GZSP")),g=(a("hA+H"),a("4PMe")),D=(a("/eir"),a("OMgk")),w=a("Pjwa"),S=a.n(w),C=a("2cji"),V=a.n(C),x=a("sp3j"),I=a.n(x),O=a("vZkh"),R=a.n(O),B=a("+KCP"),L=a.n(B),F=(a("f+YK"),a("xrSm")),K=(a("sHWw"),a("Aywy")),T=a("ee5G"),N=a.n(T),P=(a("G/Cz"),a("LneV")),j=a("CkN6"),q=a("zHco"),G=a("ALo4"),M=a("tn6I"),A=a.n(M),z=K["a"].Item,H=F["a"].Option,_=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},J=["red","default","processing","green"],U=["\u672a\u63d0\u4ea4","\u8bef\u62a5","\u5df2\u63d0\u4ea4","\u5df2\u4fee\u590d"],W=["default","green","yellow","red"],Y=["\u4f4e\u5371","\u4e2d\u5371","\u9ad8\u5371","\u4e25\u91cd"],Z=(n=Object(P["connect"])(function(e){var t=e.risk,a=e.asset,n=e.loading;return{risk:t,asset:a,loading:n.models.risk}}),l=K["a"].create(),n(r=l((s=function(e){function t(){var e,a;S()(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=I()(this,(e=R()(t)).call.apply(e,[this].concat(l))),a.state={deleteVisible:!1,deleteDone:!1,bulkDeleteVisible:!1,bulkDeleteDone:!1,selectedRows:[],formValues:{},current:{},operateKey:"",operateId:""},a.columns=[{title:"name",dataIndex:"name"},{title:"\u5f71\u54cd",dataIndex:"affects"},{title:"\u516c\u53f8",dataIndex:"origin_domain"},{title:"\u7b49\u7ea7",dataIndex:"severity",render:function(e){return N.a.createElement(D["a"],{status:W[e],text:Y[e]})}},{title:"\u6f0f\u6d1e\u72b6\u6001",dataIndex:"status",render:function(e){return N.a.createElement(D["a"],{status:J[e],text:U[e]})}},{title:"\u64cd\u4f5c",render:function(e){return N.a.createElement(E["a"],{overlay:N.a.createElement(g["b"],{onClick:a.showDeleteModal,selectedKeys:[]},N.a.createElement(g["b"].Item,{key:"posted"},"\u63d0\u4ea4"),N.a.createElement(g["b"].Item,{key:"ignored"},"\u5ffd\u7565"),N.a.createElement(g["b"].Item,{key:"fixed"},"\u4fee\u590d"),N.a.createElement(g["b"].Item,{key:"delete"},"\u5220\u9664"))},N.a.createElement("a",{href:"#",onClick:a.setOperateId(e)},"\u64cd\u4f5c ",N.a.createElement(v["a"],{type:"down"})))}}],a.handleSearch=function(e){e.preventDefault();var t=a.props,n=t.dispatch,l=t.form,r=l.getFieldsValue();a.setState({formValues:{search:r.search,status:r.status,severity:r.severity,origin_domain:r.originDomain}}),n({type:"risk/fetchVuln",payload:b()({method:"vuln"},r)})},a.handleSearchFormReset=function(){var e=a.props.form;e.resetFields(),a.setState({formValues:{}})},a.showDeleteModal=function(e){a.setState({deleteVisible:!0,operateKey:e.key,deleteDone:!1})},a.handleDeleteCancel=function(){a.setState({deleteVisible:!1})},a.handleDeleteDone=function(){a.setState({deleteDone:!0,deleteVisible:!1})},a.setOperateId=function(e){a.setState({operateId:e.id})},a.handleSingleClick=function(){var e,t=a.props.dispatch,n=a.state,l=n.operateId,r=n.operateKey;switch(r){case"delete":break;case"ignored":e=1;break;case"posted":e=2;break;case"fixed":e=3;break;default:return}t("delete"===r?{type:"risk/bulkOperateVuln",payload:{ids:[l],method:"vuln"}}:{type:"risk/bulkOperateVuln",payload:{ids:[l],status:e,method:"vuln"}}),a.setState({deleteDone:!0}),t({type:"risk/fetchVuln",payload:{method:"vuln"}})},a.handleStandardTableChange=function(e,t,n){var l=a.props.dispatch,r=a.state.formValues,s=Object.keys(t).reduce(function(e,a){var n=b()({},e);return n[a]=_(t[a]),n},{}),i=b()({currentPage:e.current,pageSize:e.pageSize,method:"vuln"},r,s);n.field&&(i.sorter="".concat(n.field,"_").concat(n.order)),l({type:"risk/fetchVuln",payload:i})},a.showBuldDeleteVisible=function(){a.setState({bulkDeleteVisible:!0})},a.handleBulkDelete=function(){var e=a.props.dispatch,t=a.state.selectedRows;0!==t.length&&(a.setState({selectedRows:[],bulkDeleteDone:!0}),e({type:"risk/bulkOperateVuln",payload:{ids:t.map(function(e){return e.id}),method:"vuln"}}),y["a"].success("\u64cd\u4f5c\u6210\u529f"),e({type:"risk/fetchVuln",payload:{method:"vuln"}}))},a.handleBulkDeleteDone=function(){a.setState({bulkDeleteDone:!0,bulkDeleteVisible:!1})},a.handelBulkDeleteCancel=function(){a.setState({bulkDeleteVisible:!1})},a.handleMenuClick=function(e){var t,n=a.props.dispatch,l=a.state.selectedRows;if(0!==l.length){switch(e.key){case"undeal":t=0;break;case"ignored":t=1;break;case"posted":t=2;break;case"fixed":t=3;break;default:return}n({type:"risk/bulkOperateVuln",payload:{ids:l.map(function(e){return e.id}),status:t,method:"vuln"}}),a.setState({selectedRows:[]}),y["a"].success("\u64cd\u4f5c\u6210\u529f"),n({type:"risk/fetchVuln",payload:{method:"vuln"}})}},a.handleSelectRows=function(e){a.setState({selectedRows:e})},a}return L()(t,e),V()(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"risk/fetchVuln",payload:{method:"vuln"}}),e({type:"asset/fetchOriginDomain",payload:{method:"originDomain"}})}},{key:"render",value:function(){var e=this,t=this.props,a=t.risk.vuln,n=t.asset.originDomain,l=t.loading,r=t.form.getFieldDecorator,s=this.state,o=s.selectedRows,y=s.deleteVisible,f=s.bulkDeleteVisible,b=s.bulkDeleteDone,D=(s.current,s.deleteDone),w=void 0===D?{}:D,S=N.a.createElement(g["b"],{onClick:this.handleMenuClick,selectedKeys:[]},N.a.createElement(g["b"].Item,{key:"posted"},"\u6279\u91cf\u63d0\u4ea4"),N.a.createElement(g["b"].Item,{key:"ignored"},"\u6279\u91cf\u5ffd\u7565"),N.a.createElement(g["b"].Item,{key:"fixed"},"\u6279\u91cf\u4fee\u590d"),N.a.createElement(g["b"].Item,{key:"default"},"\u6279\u91cf\u91cd\u7f6e")),C=w?{footer:null,onCancel:this.handleDeleteDone}:{okText:"\u66f4\u65b0",onOk:this.handleSingleClick,onCancel:this.handleDeleteCancel},V=b?{footer:null,onCancel:this.handelBulkDeleteDone}:{okText:"\u5220\u9664",onOk:this.handleBulkDelete,onCancel:this.handelBulkDeleteCancel},x=function(){return w?N.a.createElement(G["a"],{type:"success",title:"\u66f4\u65b0\u6210\u529f",description:"\u66f4\u65b0\u6f0f\u6d1e\u6210\u529f",actions:N.a.createElement(k["a"],{type:"primary",onClick:e.handleDeleteDone},"\u77e5\u9053\u4e86"),className:A.a.formResult}):N.a.createElement("p",null,"\u786e\u5b9a\u66f4\u65b0\u8be5\u6f0f\u6d1e\uff1f")},I=function(){return b?N.a.createElement(G["a"],{type:"success",title:"\u5220\u9664\u6210\u529f",description:"\u5220\u9664\u6f0f\u6d1e\u6210\u529f",actions:N.a.createElement(k["a"],{type:"primary",onClick:e.handleBulkDeleteDone},"\u77e5\u9053\u4e86"),className:A.a.formResult}):N.a.createElement("p",null,"\u786e\u5b9a\u6279\u91cf\u5220\u9664\u6f0f\u6d1e\uff1f")};return N.a.createElement(q["a"],{title:"\u6f0f\u6d1e\u5217\u8868"},N.a.createElement(d["a"],{bordered:!1},N.a.createElement("div",{className:A.a.tableListForm},N.a.createElement(K["a"],{onSubmit:this.handleSearch,layout:"inline"},N.a.createElement(m["a"],{gutter:{md:6,lg:24,xl:48}},N.a.createElement(p["a"],{md:6,sm:24},N.a.createElement(z,{label:"\u641c\u7d22"},r("search",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165"}]})(N.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165",style:{width:"100%"}})))),N.a.createElement(p["a"],{md:4,sm:24},N.a.createElement(z,{label:"\u516c\u53f8"},r("originDomain",{rules:[{required:!1,message:"\u516c\u53f8"}]})(N.a.createElement(F["a"],{placeholder:"\u8bf7\u9009\u62e9",style:{width:"100%"}},n.results.map(function(e){return N.a.createElement(H,{key:e.id},e.name)}))))),N.a.createElement(p["a"],{md:4,sm:24},N.a.createElement(z,{label:"\u7b49\u7ea7"},r("severity",{rules:[{required:!1,message:"\u7b49\u7ea7"}]})(N.a.createElement(F["a"],{placeholder:"",style:{width:"100%"}},N.a.createElement(H,{value:"0"},"\u4f4e\u5371"),N.a.createElement(H,{value:"1"},"\u4e2d\u5371"),N.a.createElement(H,{value:"2"},"\u9ad8\u5371"),N.a.createElement(H,{value:"3"},"\u4e25\u91cd"))))),N.a.createElement(p["a"],{md:4,sm:24},N.a.createElement(z,{label:"\u72b6\u6001"},r("status",{rules:[{required:!1,message:"\u72b6\u6001"}]})(N.a.createElement(F["a"],{placeholder:"",style:{width:"100%"}},N.a.createElement(H,{value:"0"},"\u672a\u5904\u7406"),N.a.createElement(H,{value:"1"},"\u8bef\u62a5"),N.a.createElement(H,{value:"2"},"\u5df2\u63d0\u4ea4"),N.a.createElement(H,{value:"3"},"\u5df2\u4fee\u590d"))))),N.a.createElement(p["a"],{md:4,sm:24},N.a.createElement("span",{className:A.a.submitButtons},N.a.createElement(k["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),N.a.createElement(k["a"],{style:{marginLeft:8},onClick:this.handleSearchFormReset},"\u91cd\u7f6e"))))),N.a.createElement("div",{className:A.a.tableListOperator},o.length>0&&N.a.createElement("span",null,N.a.createElement(k["a"],{onClick:this.showBuldDeleteVisible},"\u6279\u91cf\u5220\u9664"),N.a.createElement(E["a"],{overlay:S},N.a.createElement(k["a"],null,"\u66f4\u591a\u64cd\u4f5c ",N.a.createElement(v["a"],{type:"down"}))))),N.a.createElement(j["a"],{selectedRows:o,loading:l,data:a,columns:this.columns,rowKey:function(e){return e.id},onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange,expandedRowRender:function(e){return N.a.createElement("div",{style:{margin:0,padding:0}},N.a.createElement("span",{style:{margin:0,whiteSpace:"pre-wrap"}},e.request),N.a.createElement(u["a"],null),N.a.createElement("span",{style:{margin:0}},"\u6f0f\u6d1e\u53d1\u73b0\u65f6\u95f4: ",e.created," ",N.a.createElement(u["a"],{type:"vertical"})," \u6f0f\u6d1e\u66f4\u65b0\u65f6\u95f4: ",e.modified))}}))),N.a.createElement(i["a"],c()({title:"\u6f0f\u6d1e\u66f4\u65b0",destroyOnClose:!0,visible:y},C),x()),N.a.createElement(i["a"],c()({title:"\u6279\u91cf\u5220\u9664",destroyOnClose:!0,visible:f},V),I()))}}]),t}(T["PureComponent"]),r=s))||r)||r);t["default"]=Z}}]);