var XTemplateRuntime=function(){var n;return n=function(n){var t,e,r,a,i;return t=function(n){function t(){var n="";for(var t in r)n+=t+"|";return n=n.slice(0,-1),i=new RegExp(n,"g")}var e,r={"&":"&amp;",">":"&gt;","<":"&lt;","`":"&#x60;","/":"&#x2F;",'"':"&quot;","'":"&#x27;"},a=/[&<>"'`]/,i=t(),o=/\\?\{([^{}]+)\}/g,f="undefined"!=typeof global?global:window,s=Object.prototype.toString;return n=e={isArray:Array.isArray||function(n){return s.call(n)},keys:Object.keys||function(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(t);return e},each:function(n,t,r){if(n){var a,i,o,f=0,s=n&&n.length,c=void 0===s||"[object Function]"===Object.prototype.toString.call(n);if(r=r||null,c)for(o=e.keys(n);f<o.length&&(a=o[f],t.call(r,n[a],a,n)!==!1);f++);else for(i=n[0];s>f&&t.call(r,i,f,n)!==!1;i=n[++f]);}return n},mix:function(n,t){for(var e in t)n[e]=t[e];return n},globalEval:function(n){f.execScript?f.execScript(n):!function(n){f.eval.call(f,n)}(n)},substitute:function(n,t,e){return"string"==typeof n&&t?n.replace(e||o,function(n,e){return"\\"===n.charAt(0)?n.slice(1):void 0===t[e]?"":t[e]}):n},escapeHtml:function(n){return n=""+n,a.test(n)?(n+"").replace(i,function(n){return r[n]}):n},log:function(){"undefined"!=typeof console&&console.log.apply(console,arguments)}}}(),e=function(n){function t(n){this.data=arguments.length?n:{},this.affix=e,this.root=this}var e;return t.prototype={isScope:1,setParent:function(n){this.parent=n,this.root=n.root},set:function(n,t){this.affix||(this.affix={}),this.affix[n]=t},setData:function(n){this.data=n},getData:function(){return this.data},mix:function(n){var t=this.affix;t||(t=this.affix={});for(var e in n)t[e]=n[e]},get:function(n){var t,r=this.data,a=this.affix;return t=a&&a[n],t!==e?t:(r!==e&&null!==r&&(t=r[n]),t!==e?t:"this"===n?r:"root"===n?this.root.data:t)},resolve:function(n,t){var r,a=this;if(!t&&1===n.length){if(r=a.get(n[0]),r!==e)return r;t=1}var i,o=n.length,f=a;if(o&&"root"===n[0])n.shift(),f=f.root,o--;else if(t)for(;f&&t--;)f=f.parent;if(!f)return e;if(!o)return f.data;var s=n[0];do r=f.get(s);while(r===e&&(f=f.parent));if(r&&f){for(i=1;r&&o>i;i++)r=r[n[i]];return r}return e}},n=t}(),r=function(n){function e(n){this.list=n,this.init()}function r(n,t){var r=this;r.config=t,r.head=new e(r),r.callback=n,this.init()}var a,i=t;return e.prototype={constructor:e,isBuffer:1,init:function(){this.data=""},append:function(n){return this.data+=n,this},write:function(n){return null!=n&&this.append(n),this},writeEscaped:function(n){return null!=n&&this.append(i.escapeHtml(n)),this},async:function(n){var t=this,r=t.list,a=new e(r),i=new e(r);return i.next=t.next,a.next=i,t.next=a,t.ready=!0,n(a),i},error:function(n){var t=this.list.callback;t&&(t(n,a),this.list.callback=null)},end:function(){var n=this;return n.list.callback&&(n.ready=!0,n.list.flush()),n}},r.prototype={constructor:r,init:function(){this.data=""},append:function(n){this.data+=n},end:function(){this.callback(null,this.data)},flush:function(){for(var n=this,t=n.head;t;){if(!t.ready)return;this.append(t.data),t=t.next,n.head=t}n.end()}},r.Buffer=e,n=r}(),a=function(n){var r=e,a=t,i={range:function(n,t){var e=t.params,r=e[0],a=e[1],i=e[2];i?(r>a&&i>0||a>r&&0>i)&&(i=-i):i=r>a?-1:1;for(var o=[],f=r;a>r?a>f:f>a;f+=i)o.push(f);return o},each:function(n,t,e){var i,o,f,s=t.params,c=s[0],u=s[2]||"xindex",l=s[1];if(c)if(a.isArray(c)){i=c.length;for(var h=0;i>h;h++)o=new r(c[h]),f=o.affix={xcount:i},f[u]=h,l&&(f[l]=c[h]),o.setParent(n),e=t.fn(o,e)}else for(var p in c)o=new r(c[p]),f=o.affix={},f[u]=p,l&&(f[l]=c[p]),o.setParent(n),e=t.fn(o,e);return e},"with":function(n,t,e){var a=t.params,i=a[0];if(i){var o=new r(i);o.setParent(n),e=t.fn(o,e)}return e},"if":function(n,t,e){var r=t.params,a=r[0];if(a){var i=t.fn;i&&(e=i(n,e))}else{var o=!1,f=t.elseIfs,s=t.inverse;if(f)for(var c=0,u=f.length;u>c;c++){var l=f[c];if(o=l.test(n)){e=l.fn(n,e);break}}!o&&s&&(e=s(n,e))}return e},set:function(n,t,e){return n.mix(t.hash),e},include:function(n,t,e){var a,i,o=t.params,f=o.length;for(i=n,t.hash&&(i=new r(t.hash),i.setParent(n)),a=0;f>a;a++)e=this.root.include(o[a],this,i,t,e);return e},parse:function(n,t,e){return i.include.call(this,new r,t,e)},extend:function(n,t,e){return this.runtime.extendTplName=t.params[0],e},block:function(n,t,e){var r,a=this,i=a.runtime,o=t.params,f=o[0];2===o.length&&(r=o[0],f=o[1]);var s,c=i.blocks=i.blocks||{},u=c[f],l={fn:t.fn,type:r};if(u){if(u.type)if("append"===u.type)l.next=u,c[f]=l;else if("prepend"===u.type){var h;for(s=u;s&&"prepend"===s.type;)h=s,s=s.next;l.next=s,h.next=l}}else c[f]=l;if(!i.extendTplName)for(s=c[f];s;)s.fn&&(e=s.fn.call(a,n,e)),s=s.next;return e},macro:function(n,t,e){var a=t.hash,i=t.params,o=i[0],f=i.slice(1),s=this,c=s.runtime,u=c.macros=c.macros||{};if(t.fn)u[o]={paramNames:f,hash:a,fn:t.fn};else{var l,h=u[o],p=h.hash||{};if(!h||!(l=h.paramNames)){var d="in file: "+s.name+" can not find macro: "+name+'" at line '+s.pos.line+", col "+s.pos.col;throw new Error(d)}for(var m=0,v=l.length;v>m;m++){var g=l[m];p[g]=f[m]}if(a)for(var x in a)p[x]=a[x];var y=new r(p);e=h.fn.call(s,y,e)}return e}};return i["debugger"]=function(){},n=i}(),i=function(n){function i(n,t,e){var r=e[0],a=n&&n[r]||t&&t[r]||h[r];if(1===e.length)return a;if(a)for(var i=e.length,o=1;i>o&&(a=a[e[o]],a);o++);return a}function o(n,t){var e=n.split("/"),r=t.split("/");e.pop();for(var a=0,i=r.length;i>a;a++){var o=r[a];"."===o||(".."===o?e.pop():e.push(o))}return e.join("/")}function f(n,t,e){e=n.fn(t,e);var r=n.runtime,a=r.extendTplName;return a&&(delete r.extendTplName,e=n.root.include(a,n,t,null,e)),e.end()}function s(n,t,e,r,a,o){var f,s,c,u;if(o||(u=i(n.runtime.commands,n.root.config.commands,a)),u)return u.call(n,t,e,r);if(f="in file: "+n.name+" can not call: "+a.join(".")+'" at line '+n.pos.line+", col "+n.pos.col,s=t.resolve(a.slice(0,-1),o),c=s[a[a.length-1]])return c.apply(s,e.params);if(f)throw new Error(f);return r}function c(n,t){var e=this;e.fn=n,t=e.config=t||{},t.loader=t.loader||c.loader,this.subNameResolveCache={}}var u=t,l=a,h={},p=e,d=r,m={callFn:s,callCommand:function(n,t,e,r,a){return s(n,t,e,r,a)}},v={cache:{},load:function(n,t){var e=n.name,r=this.cache;return r[e]?t(void 0,r[e]):void require([e],{success:function(n){r[e]=n,t(void 0,n)},error:function(){var e='template "'+n.name+'" does not exist';u.log(e,"error"),t(e)}})}};return u.mix(c,{loader:v,version:"1.2.4",nativeCommands:l,utils:m,util:u,addCommand:function(n,t){h[n]=t},removeCommand:function(n){delete h[n]}}),c.prototype={constructor:c,Scope:p,nativeCommands:l,utils:m,removeCommand:function(n){var t=this.config;t.commands&&delete t.commands[n]},addCommand:function(n,t){var e=this.config;e.commands=e.commands||{},e.commands[n]=t},resolve:function(n,t){if("."!==n.charAt(0))return n;if(!t){var e="parent template does not have name for relative sub tpl name: "+n;throw new Error(e)}var r=this.subNameResolveCache[t]=this.subNameResolveCache[t]||{};return r[n]?r[n]:n=r[n]=o(t,n)},include:function(n,t,e,r,a){var i=this,o=t.name,s=i.resolve(n,o);return a.async(function(a){i.config.loader.load({root:i,parentName:o,originalName:n,name:s,scope:e,option:r},function(n,i){n?a.error(n):"string"==typeof i?(r&&r.escaped?a.writeEscaped(i):a.append(i),a.end()):f({root:t.root,fn:i,name:s,runtime:t.runtime},e,a)})})},render:function(n,t,e){var r="",a=this,i=a.fn;"function"==typeof t&&(e=t,t=null),t=t||{},e=e||function(n,t){if(n)throw n instanceof Error||(n=new Error(n)),n;r=t};var o=a.config.name;!o&&i.TPL_NAME&&(o=i.TPL_NAME);var s=new p(n),u=new c.LinkedBuffer(e,a.config).head;return f({name:o,fn:i,runtime:{commands:t.commands},root:a},s,u),r}},c.Scope=p,c.LinkedBuffer=d,n=c}(),n=i}()}();