(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{IyzB:function(e,t,s){"use strict";s.r(t);var a=s("smUt"),n=s.n(a),r=s("NTxs"),c=s.n(r),i=s("dCQc");t["default"]={namespace:"activities",state:{list:[]},effects:{fetchList:c.a.mark(function e(t,s){var a,n,r;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=s.call,n=s.put,e.next=3,a(i["j"]);case 3:return r=e.sent,e.next=6,n({type:"saveList",payload:Array.isArray(r)?r:[]});case 6:case"end":return e.stop()}},e)})},reducers:{saveList:function(e,t){return n()({},e,{list:t.payload})}}}}}]);