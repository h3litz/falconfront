(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"Y0/X":function(e,t,a){"use strict";a.r(t);var n,l,s,i,r=a("U1Sa"),c=a.n(r),o=(a("N95i"),a("PGq9")),d=(a("vkTA"),a("3gFK")),u=(a("FTfq"),a("GZSP")),m=(a("poft"),a("WFYK")),p=(a("14R3"),a("0y9A")),h=(a("pGly"),a("LNHK")),f=(a("hA+H"),a("4PMe")),b=(a("mcVV"),a("1DQy")),w=a("smUt"),v=a.n(w),y=(a("/OsC"),a("C9m5")),g=(a("/eir"),a("OMgk")),E=a("Pjwa"),k=a.n(E),D=a("2cji"),C=a.n(D),V=a("sp3j"),S=a.n(V),F=a("vZkh"),O=a.n(F),M=a("+KCP"),A=a.n(M),B=(a("PLIw"),a("oGlb")),R=(a("iBTD"),a("+TXG")),x=(a("f+YK"),a("xrSm")),U=(a("sHWw"),a("Aywy")),L=a("ee5G"),I=a.n(L),T=a("G/Cz"),N=a("LneV"),j=a("CkN6"),P=a("zHco"),G=a("ALo4"),K=a("gp8+"),q=a.n(K),z=U["a"].Item,H=x["a"].Option,Y=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},J=["error","success"],W=["\u79bb\u7ebf","\u5728\u7ebf"],X=U["a"].create()(function(e){var t=e.current,a=e.form,n=e.createUpdateVisible,l=e.handleCreateUpdateModalVisible,s=e.handleSubmit,i=function(){a.validateFields(function(e,n){e||(a.resetFields(),s(t,n))})},r=function(){a.resetFields(),l()};return I.a.createElement(B["a"],{destroyOnClose:!0,title:"awvs api".concat(t.name?"\u7f16\u8f91":"\u6dfb\u52a0"),className:q.a.standardListForm,visible:n,onOk:i,onCancel:r},I.a.createElement(z,{label:"url"},a.getFieldDecorator("url",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165url"}],initialValue:t.url})(I.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165",style:{width:"100%"}}))),I.a.createElement(z,{label:"secret"},a.getFieldDecorator("secret",{rules:[{required:!0,message:"api key"}],initialValue:t.secret})(I.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165",style:{width:"100%"}}))),I.a.createElement(z,{label:"status"},a.getFieldDecorator("status",{rules:[{required:!0,message:"\u72b6\u6001"}],initialValue:t.status})(I.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9",style:{width:"100%"}},I.a.createElement(H,{value:"0"},"\u79bb\u7ebf"),I.a.createElement(H,{value:"1"},"\u5728\u7ebf")))))}),Z=(n=Object(N["connect"])(function(e){var t=e.scansettings,a=e.loading;return{scansettings:t,loading:a.models.scansettings}}),l=U["a"].create(),n(s=l((i=function(e){function t(){var e,a;k()(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return a=S()(this,(e=O()(t)).call.apply(e,[this].concat(l))),a.state={createUpdateVisible:!1,deleteVisible:!1,deleteDone:!1,bulkDeleteVisible:!1,bulkDeleteDone:!1,selectedRows:[],formValues:{},current:{}},a.columns=[{title:"\u5730\u5740",dataIndex:"url"},{title:"apikey",dataIndex:"secret"},{title:"\u72b6\u6001",dataIndex:"status",render:function(e){return I.a.createElement(g["a"],{status:J[e],text:W[e]})}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"created"},{title:"\u66f4\u65b0\u65f6\u95f4",dataIndex:"modified",render:function(e){return I.a.createElement("span",null,e||"\u672a\u8fdb\u884c\u68c0\u67e5")}},{title:"\u64cd\u4f5c",render:function(e,t){return I.a.createElement(L["Fragment"],null,I.a.createElement("a",{onClick:function(){return a.showEditModal(t)}},"\u4fee\u6539"),I.a.createElement(y["a"],{type:"vertical"}),I.a.createElement("a",{onClick:function(){return a.showDeleteModal(t)}},"\u5220\u9664"))}}],a.showModal=function(){a.setState({createUpdateVisible:!0})},a.showEditModal=function(e){a.setState({createUpdateVisible:!0,current:e})},a.handleCreateUpdateModalVisible=function(e){a.setState({createUpdateVisible:!!e,current:""})},a.handleSubmit=function(e,t){var n=a.props.dispatch,l=e.id,s=void 0===l?"":l;s?(n({type:"scansettings/submitAwvs",payload:v()({id:s,method:"awvs"},t)}),b["a"].success("\u6dfb\u52a0\u6210\u529f"),a.handleCreateUpdateModalVisible()):(n({type:"scansettings/submitAwvs",payload:v()({method:"awvs"},t)}),b["a"].success("\u4fee\u6539\u6210\u529f"),a.handleCreateUpdateModalVisible()),n({type:"scansettings/fetchAwvs",payload:{method:"awvs"}})},a.handleSearch=function(e){e.preventDefault();var t=a.props,n=t.dispatch,l=t.form,s=l.getFieldsValue();a.setState({formValues:{search:s.search,status:s.status}}),n({type:"scansettings/fetchAwvs",payload:v()({method:"awvs"},s)})},a.handleSearchFormReset=function(){var e=a.props.form;e.resetFields(),a.setState({formValues:{}})},a.showDeleteModal=function(e){a.setState({deleteVisible:!0,current:e})},a.handleDeleteCancel=function(){setTimeout(function(){return a.addBtn.blur()},0),a.setState({deleteVisible:!1})},a.handleDeleteDone=function(){setTimeout(function(){return a.addBtn.blur()},0),a.setState({deleteDone:!0,deleteVisible:!1})},a.handleDeleteItem=function(){var e=a.props.dispatch,t=a.state.current.id;a.setState({deleteDone:!0}),e({type:"scansettings/submitAwvs",payload:{id:t,method:"awvs"}}),e({type:"scansettings/fetchAwvs",payload:{method:"awvs"}})},a.handleStandardTableChange=function(e,t,n){var l=a.props.dispatch,s=a.state.formValues,i=Object.keys(t).reduce(function(e,a){var n=v()({},e);return n[a]=Y(t[a]),n},{}),r=v()({currentPage:e.current,pageSize:e.pageSize,method:"awvs"},s,i);n.field&&(r.sorter="".concat(n.field,"_").concat(n.order)),l({type:"scansettings/fetchAwvs",payload:r})},a.showBuldDeleteVisible=function(){a.setState({bulkDeleteVisible:!0})},a.handleBulkDelete=function(){var e=a.props.dispatch,t=a.state.selectedRows;0!==t.length&&(a.setState({selectedRows:[],bulkDeleteDone:!0}),e({type:"scansettings/bulkOperateAwvs",payload:{ids:t.map(function(e){return e.id}),method:"awvs"}}),b["a"].success("\u64cd\u4f5c\u6210\u529f"),e({type:"scansettings/fetchAwvs",payload:{method:"awvs"}}))},a.handleBulkDeleteDone=function(){a.setState({bulkDeleteDone:!0,bulkDeleteVisible:!1})},a.handelBulkDeleteCancel=function(){a.setState({bulkDeleteVisible:!1})},a.handleMenuClick=function(e){var t,n=a.props.dispatch,l=a.state.selectedRows;if(0!==l.length){switch(e.key){case"offline":t=0;break;case"online":t=1;break;default:return}n({type:"scansettings/bulkOperateAwvs",payload:{ids:l.map(function(e){return e.id}),status:t,method:"awvs"}}),a.setState({selectedRows:[]}),b["a"].success("\u64cd\u4f5c\u6210\u529f"),n({type:"scansettings/fetchawvs",payload:{method:"awvs"}})}},a.handleSelectRows=function(e){a.setState({selectedRows:e})},a}return A()(t,e),C()(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"scansettings/fetchAwvs",payload:{method:"awvs"}})}},{key:"render",value:function(){var e=this,t=this.props,a=t.scansettings.awvs,n=t.loading,l=t.form.getFieldDecorator,s=this.state,i=s.selectedRows,r=s.createUpdateVisible,b=s.deleteVisible,w=s.bulkDeleteVisible,v=s.bulkDeleteDone,y=s.current,g=s.deleteDone,E=void 0===g?{}:g,k={handleSubmit:this.handleSubmit,handleCreateUpdateModalVisible:this.handleCreateUpdateModalVisible},D=I.a.createElement(f["b"],{onClick:this.handleMenuClick,selectedKeys:[]},I.a.createElement(f["b"].Item,{key:"offline"},"\u6279\u91cf\u4e0b\u7ebf"),I.a.createElement(f["b"].Item,{key:"online"},"\u6279\u91cf\u4e0a\u7ebf")),C=E?{footer:null,onCancel:this.handleDeleteDone}:{okText:"\u5220\u9664",onOk:this.handleDeleteItem,onCancel:this.handleDeleteCancel},V=v?{footer:null,onCancel:this.handelBulkDeleteDone}:{okText:"\u5220\u9664",onOk:this.handleBulkDelete,onCancel:this.handelBulkDeleteCancel},S=function(){return E?I.a.createElement(G["a"],{type:"success",title:"\u5220\u9664\u6210\u529f",description:"\u5220\u9664awvs\u8282\u70b9\u6210\u529f",actions:I.a.createElement(h["a"],{type:"primary",onClick:e.handleDeleteDone},"\u77e5\u9053\u4e86"),className:q.a.formResult}):I.a.createElement("p",null,"\u786e\u5b9a\u5220\u9664\u8be5\u8282\u70b9\uff1f")},F=function(){return v?I.a.createElement(G["a"],{type:"success",title:"\u5220\u9664\u6210\u529f",description:"\u5220\u9664awvs\u8282\u70b9\u6210\u529f",actions:I.a.createElement(h["a"],{type:"primary",onClick:e.handleBulkDeleteDone},"\u77e5\u9053\u4e86"),className:q.a.formResult}):I.a.createElement("p",null,"\u786e\u5b9a\u6279\u91cf\u5220\u9664\u8282\u70b9\uff1f")};return I.a.createElement(P["a"],{title:"awvs\u8282\u70b9"},I.a.createElement(o["a"],{bordered:!1},I.a.createElement("div",{className:q.a.tableListForm},I.a.createElement(U["a"],{onSubmit:this.handleSearch,layout:"inline"},I.a.createElement(m["a"],{gutter:{md:8,lg:24,xl:48}},I.a.createElement(p["a"],{md:8,sm:24},I.a.createElement(z,{label:"\u8282\u70b9"},l("search",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165"}]})(I.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165",style:{width:"50%"}})))),I.a.createElement(p["a"],{md:8,sm:24},I.a.createElement(z,{label:"\u72b6\u6001"},l("status")(I.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9",style:{width:"50%"}},I.a.createElement(H,{value:"0"},"\u51bb\u7ed3"),I.a.createElement(H,{value:"1"},"\u4e0a\u7ebf"),I.a.createElement(H,{value:"2"},"\u4e0b\u7ebf"))))),I.a.createElement(p["a"],{md:8,sm:24},I.a.createElement("span",{className:q.a.submitButtons},I.a.createElement(h["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),I.a.createElement(h["a"],{style:{marginLeft:8},onClick:this.handleSearchFormReset},"\u91cd\u7f6e"))))),I.a.createElement("div",{className:q.a.tableListOperator},I.a.createElement(h["a"],{icon:"plus",type:"primary",onClick:function(){return e.showModal()},ref:function(t){e.addBtn=Object(T["findDOMNode"])(t)}},"\u65b0\u5efa"),i.length>0&&I.a.createElement("span",null,I.a.createElement(h["a"],{onClick:this.showBuldDeleteVisible},"\u6279\u91cf\u5220\u9664"),I.a.createElement(d["a"],{overlay:D},I.a.createElement(h["a"],null,"\u66f4\u591a\u64cd\u4f5c ",I.a.createElement(u["a"],{type:"down"}))))),I.a.createElement(j["a"],{selectedRows:i,loading:n,data:a,columns:this.columns,rowKey:function(e){return e.id},onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange}))),I.a.createElement(X,c()({current:y,createUpdateVisible:r},k)),I.a.createElement(B["a"],c()({title:"\u5220\u9664\u8282\u70b9",destroyOnClose:!0,visible:b},C),S()),I.a.createElement(B["a"],c()({title:"\u6279\u91cf\u5220\u9664",destroyOnClose:!0,visible:w},V),F()))}}]),t}(L["PureComponent"]),s=i))||s)||s);t["default"]=Z},"gp8+":function(e,t,a){e.exports={tableList:"antd-pro-pages-settings-awvs-index-tableList",tableListOperator:"antd-pro-pages-settings-awvs-index-tableListOperator",tableListForm:"antd-pro-pages-settings-awvs-index-tableListForm",submitButtons:"antd-pro-pages-settings-awvs-index-submitButtons"}}}]);