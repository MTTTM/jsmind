/**
* @license BSD-3-Clause
* @copyright 2014-2022 hizzgdev@163.com
*
* Project Home:
*   https://github.com/hizzgdev/jsmind/
*/
!function(){"use strict";!function(t){if(!t)throw new Error("jsMind is not defined");const e=t,i=e.$,s="getSelection"in i.w?function(){i.w.getSelection().removeAllRanges()}:function(){i.d.selection.empty()},o=5,n=500,h=80;class a{constructor(t){this.jm=t,this.e_canvas=null,this.canvas_ctx=null,this.shadow=null,this.shadow_w=0,this.shadow_h=0,this.active_node=null,this.target_node=null,this.target_direct=null,this.client_w=0,this.client_h=0,this.offset_x=0,this.offset_y=0,this.hlookup_delay=0,this.hlookup_timer=0,this.capture=!1,this.moved=!1}init(){this._create_canvas(),this._create_shadow(),this._event_bind()}resize(){this.jm.view.e_nodes.appendChild(this.shadow),this.e_canvas.width=this.jm.view.size.w,this.e_canvas.height=this.jm.view.size.h}_create_canvas(){var t=i.c("canvas");this.jm.view.e_panel.appendChild(t);var e=t.getContext("2d");this.e_canvas=t,this.canvas_ctx=e}_create_shadow(){var t=i.c("jmnode");t.style.visibility="hidden",t.style.zIndex="3",t.style.cursor="move",t.style.opacity="0.7",this.shadow=t}reset_shadow(t){var e=this.shadow.style;this.shadow.innerHTML=t.innerHTML,e.left=t.style.left,e.top=t.style.top,e.width=t.style.width,e.height=t.style.height,e.backgroundImage=t.style.backgroundImage,e.backgroundSize=t.style.backgroundSize,e.transform=t.style.transform,this.shadow_w=this.shadow.clientWidth,this.shadow_h=this.shadow.clientHeight}show_shadow(){this.moved||(this.shadow.style.visibility="visible")}hide_shadow(){this.shadow.style.visibility="hidden"}_magnet_shadow(t){t&&(this.canvas_ctx.lineWidth=o,this.canvas_ctx.strokeStyle="rgba(0,0,0,0.3)",this.canvas_ctx.lineCap="round",this._clear_lines(),this._canvas_lineto(t.sp.x,t.sp.y,t.np.x,t.np.y))}_clear_lines(){this.canvas_ctx.clearRect(0,0,this.jm.view.size.w,this.jm.view.size.h)}_canvas_lineto(t,e,i,s){this.canvas_ctx.beginPath(),this.canvas_ctx.moveTo(t,e),this.canvas_ctx.lineTo(i,s),this.canvas_ctx.stroke()}_lookup_close_node(){var e,i,s=this.jm.get_root(),n=s.get_location(),h=s.get_size(),a=n.x+h.w/2,l=this.shadow_w,d=this.shadow_h,c=this.shadow.offsetLeft,r=this.shadow.offsetTop,_=c+l/2>=a?t.direction.right:t.direction.left,v=this.jm.mind.nodes,u=null,w=this.jm.layout,f=Number.MAX_VALUE,m=0,g=null,p=null,y=null;for(var x in v){var k,b;if((u=v[x]).isroot||u.direction==_){if(u.id==this.active_node.id)continue;if(!w.is_visible(u))continue;if(e=u.get_size(),i=u.get_location(),_==t.direction.right){if(c-i.x-e.w<=0)continue;m=Math.abs(c-i.x-e.w)+Math.abs(r+d/2-i.y-e.h/2),k={x:i.x+e.w-o,y:i.y+e.h/2},b={x:c+o,y:r+d/2}}else{if(i.x-c-l<=0)continue;m=Math.abs(c+l-i.x)+Math.abs(r+d/2-i.y-e.h/2),k={x:i.x+o,y:i.y+e.h/2},b={x:c+l-o,y:r+d/2}}m<f&&(g=u,p=k,y=b,f=m)}}var j=null;return g&&(j={node:g,direction:_,sp:y,np:p}),j}lookup_close_node(){var t=this._lookup_close_node();t&&(this._magnet_shadow(t),this.target_node=t.node,this.target_direct=t.direction)}_event_bind(){var t=this,e=this.jm.view.container;i.on(e,"mousedown",(function(e){var i=e||event;t.dragstart.call(t,i)})),i.on(e,"mousemove",(function(e){var i=e||event;t.drag.call(t,i)})),i.on(e,"mouseup",(function(e){var i=e||event;t.dragend.call(t,i)})),i.on(e,"touchstart",(function(e){var i=e||event;t.dragstart.call(t,i)})),i.on(e,"touchmove",(function(e){var i=e||event;t.drag.call(t,i)})),i.on(e,"touchend",(function(e){var i=e||event;t.dragend.call(t,i)}))}dragstart(t){if(this.jm.get_editable()&&!this.capture){this.active_node=null;var e=this.jm.view,s=t.target||event.srcElement;if("jmnode"==s.tagName.toLowerCase()){var o=e.get_binded_nodeid(s);if(o){var a=this.jm.get_node(o);if(!a.isroot){this.reset_shadow(s),this.active_node=a,this.offset_x=(t.clientX||t.touches[0].clientX)/e.actualZoom-s.offsetLeft,this.offset_y=(t.clientY||t.touches[0].clientY)/e.actualZoom-s.offsetTop,this.client_hw=Math.floor(s.clientWidth/2),this.client_hh=Math.floor(s.clientHeight/2),0!=this.hlookup_delay&&i.w.clearTimeout(this.hlookup_delay),0!=this.hlookup_timer&&i.w.clearInterval(this.hlookup_timer);var l=this;this.hlookup_delay=i.w.setTimeout((function(){l.hlookup_delay=0,l.hlookup_timer=i.w.setInterval((function(){l.lookup_close_node.call(l)}),h)}),n),this.capture=!0}}}}}drag(t){if(this.jm.get_editable()&&this.capture){t.preventDefault(),this.show_shadow(),this.moved=!0,s();var e=this.jm.view,i=(t.clientX||t.touches[0].clientX)/e.actualZoom-this.offset_x,o=(t.clientY||t.touches[0].clientY)/e.actualZoom-this.offset_y;this.shadow.style.left=i+"px",this.shadow.style.top=o+"px",s()}}dragend(t){if(this.jm.get_editable()){if(this.capture){if(0!=this.hlookup_delay&&(i.w.clearTimeout(this.hlookup_delay),this.hlookup_delay=0,this._clear_lines()),0!=this.hlookup_timer&&(i.w.clearInterval(this.hlookup_timer),this.hlookup_timer=0,this._clear_lines()),this.moved){var e=this.active_node,s=this.target_node,o=this.target_direct;this.move_node(e,s,o)}this.hide_shadow()}this.moved=!1,this.capture=!1}}move_node(e,i,s){var o=this.shadow.offsetTop;if(i&&e&&!t.node.inherited(e,i)){for(var n=i.children,h=n.length,a=null,l=Number.MAX_VALUE,d=null,c="_last_";h--;)if((a=n[h]).direction==s&&a.id!=e.id){var r=a.get_location().y-o;r>0&&r<l&&(l=r,d=a,c="_first_")}d&&(c=d.id),this.jm.move_node(e.id,c,i.id,s)}this.active_node=null,this.target_node=null,this.target_direct=null}jm_event_handle(e,i){e===t.event_type.resize&&this.resize()}}var l=new e.plugin("draggable",(function(t){var e=new a(t);e.init(),t.add_event_listener((function(t,i){e.jm_event_handle.call(e,t,i)}))}));t.register_plugin(l)}(window.jsMind)}();
