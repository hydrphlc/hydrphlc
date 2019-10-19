(function($){$.fn.navList=function(){var $this=$(this);$a=$this.find('a'),b=[];$a.each(function(){var $this=$(this),indent=Math.max(0,$this.parents('li').length-1),href=$this.attr('href'),target=$this.attr('target');b.push('<a '+
'class="link depth-'+indent+'"'+
((typeof target!=='undefined'&&target!='')?' target="'+target+'"':'')+
((typeof href!=='undefined'&&href!='')?' href="'+href+'"':'')+
'>'+
'<span class="indent-'+indent+'"></span>'+
$this.text()+
'</a>');});return b.join('');};$.fn.panel=function(userConfig){if(this.length==0)
return $this;if(this.length>1){for(var i=0;i<this.length;i++)
$(this[i]).panel(userConfig);return $this;}
var $this=$(this),$body=$('body'),$window=$(window),id=$this.attr('id'),config;config=$.extend({delay:0,hideOnClick:false,hideOnEscape:false,hideOnSwipe:false,resetScroll:false,resetForms:false,side:null,target:$this,visibleClass:'visible'},userConfig);if(typeof config.target!='jQuery')
config.target=$(config.target);$this._hide=function(event){if(!config.target.hasClass(config.visibleClass))
return;if(event){event.preventDefault();event.stopPropagation();}
config.target.removeClass(config.visibleClass);window.setTimeout(function(){if(config.resetScroll)
$this.scrollTop(0);if(config.resetForms)
$this.find('form').each(function(){this.reset();});},config.delay);};$this.css('-ms-overflow-style','-ms-autohiding-scrollbar').css('-webkit-overflow-scrolling','touch');if(config.hideOnClick){$this.find('a').css('-webkit-tap-highlight-color','rgba(0,0,0,0)');$this.on('click','a',function(event){var $a=$(this),href=$a.attr('href'),target=$a.attr('target');if(!href||href=='#'||href==''||href=='#'+id)
return;event.preventDefault();event.stopPropagation();$this._hide();window.setTimeout(function(){if(target=='_blank')
window.open(href);else
window.location.href=href;},config.delay+10);});}
$this.on('touchstart',function(event){$this.touchPosX=event.originalEvent.touches[0].pageX;$this.touchPosY=event.originalEvent.touches[0].pageY;})
$this.on('touchmove',function(event){if($this.touchPosX===null||$this.touchPosY===null)
return;var diffX=$this.touchPosX-event.originalEvent.touches[0].pageX,diffY=$this.touchPosY-event.originalEvent.touches[0].pageY,th=$this.outerHeight(),ts=($this.get(0).scrollHeight-$this.scrollTop());if(config.hideOnSwipe){var result=false,boundary=20,delta=50;switch(config.side){case'left':result=(diffY<boundary&&diffY>(-1*boundary))&&(diffX>delta);break;case'right':result=(diffY<boundary&&diffY>(-1*boundary))&&(diffX<(-1*delta));break;case'top':result=(diffX<boundary&&diffX>(-1*boundary))&&(diffY>delta);break;case'bottom':result=(diffX<boundary&&diffX>(-1*boundary))&&(diffY<(-1*delta));break;default:break;}
if(result){$this.touchPosX=null;$this.touchPosY=null;$this._hide();return false;}}
if(($this.scrollTop()<0&&diffY<0)||(ts>(th-2)&&ts<(th+2)&&diffY>0)){event.preventDefault();event.stopPropagation();}});$this.on('click touchend touchstart touchmove',function(event){event.stopPropagation();});$this.on('click','a[href="#'+id+'"]',function(event){event.preventDefault();event.stopPropagation();config.target.removeClass(config.visibleClass);});$body.on('click touchend',function(event){$this._hide(event);});$body.on('click','a[href="#'+id+'"]',function(event){event.preventDefault();event.stopPropagation();config.target.toggleClass(config.visibleClass);});if(config.hideOnEscape)
$window.on('keydown',function(event){if(event.keyCode==27)
$this._hide(event);});return $this;};$.fn.placeholder=function(){if(typeof(document.createElement('input')).placeholder!='undefined')
return $(this);if(this.length==0)
return $this;if(this.length>1){for(var i=0;i<this.length;i++)
$(this[i]).placeholder();return $this;}
var $this=$(this);$this.find('input[type=text],textarea').each(function(){var i=$(this);if(i.val()==''||i.val()==i.attr('placeholder'))
i.addClass('polyfill-placeholder').val(i.attr('placeholder'));}).on('blur',function(){var i=$(this);if(i.attr('name').match(/-polyfill-field$/))
return;if(i.val()=='')
i.addClass('polyfill-placeholder').val(i.attr('placeholder'));}).on('focus',function(){var i=$(this);if(i.attr('name').match(/-polyfill-field$/))
return;if(i.val()==i.attr('placeholder'))
i.removeClass('polyfill-placeholder').val('');});$this.find('input[type=password]').each(function(){var i=$(this);var x=$($('<div>').append(i.clone()).remove().html().replace(/type="password"/i,'type="text"').replace(/type=password/i,'type=text'));if(i.attr('id')!='')
x.attr('id',i.attr('id')+'-polyfill-field');if(i.attr('name')!='')
x.attr('name',i.attr('name')+'-polyfill-field');x.addClass('polyfill-placeholder').val(x.attr('placeholder')).insertAfter(i);if(i.val()=='')
i.hide();else
x.hide();i.on('blur',function(event){event.preventDefault();var x=i.parent().find('input[name='+i.attr('name')+'-polyfill-field]');if(i.val()==''){i.hide();x.show();}});x.on('focus',function(event){event.preventDefault();var i=x.parent().find('input[name='+x.attr('name').replace('-polyfill-field','')+']');x.hide();i.show().focus();}).on('keypress',function(event){event.preventDefault();x.val('');});});$this.on('submit',function(){$this.find('input[type=text],input[type=password],textarea').each(function(event){var i=$(this);if(i.attr('name').match(/-polyfill-field$/))
i.attr('name','');if(i.val()==i.attr('placeholder')){i.removeClass('polyfill-placeholder');i.val('');}});}).on('reset',function(event){event.preventDefault();$this.find('select').val($('option:first').val());$this.find('input,textarea').each(function(){var i=$(this),x;i.removeClass('polyfill-placeholder');switch(this.type){case'submit':case'reset':break;case'password':i.val(i.attr('defaultValue'));x=i.parent().find('input[name='+i.attr('name')+'-polyfill-field]');if(i.val()==''){i.hide();x.show();}
else{i.show();x.hide();}
break;case'checkbox':case'radio':i.attr('checked',i.attr('defaultValue'));break;case'text':case'textarea':i.val(i.attr('defaultValue'));if(i.val()==''){i.addClass('polyfill-placeholder');i.val(i.attr('placeholder'));}
break;default:i.val(i.attr('defaultValue'));break;}});});return $this;};$.prioritize=function($elements,condition){var key='__prioritize';if(typeof $elements!='jQuery')
$elements=$($elements);$elements.each(function(){var $e=$(this),$p,$parent=$e.parent();if($parent.length==0)
return;if(!$e.data(key)){if(!condition)
return;$p=$e.prev();if($p.length==0)
return;$e.prependTo($parent);$e.data(key,$p);}
else{if(condition)
return;$p=$e.data(key);$e.insertAfter($p);$e.removeData(key);}});};})(jQuery);(function($){var $window=$(window),$head=$('head'),$body=$('body');breakpoints({xlarge:['1281px','1680px'],large:['981px','1280px'],medium:['737px','980px'],small:['481px','736px'],xsmall:['361px','480px'],xxsmall:[null,'360px'],'xlarge-to-max':'(min-width: 1681px)','small-to-xlarge':'(min-width: 481px) and (max-width: 1680px)'});$window.on('load',function(){window.setTimeout(function(){$body.removeClass('is-preload');},100);});var resizeTimeout;$window.on('resize',function(){$body.addClass('is-resizing');clearTimeout(resizeTimeout);resizeTimeout=setTimeout(function(){$body.removeClass('is-resizing');},100);});if(!browser.canUse('object-fit')||browser.name=='safari')
$('.image.object').each(function(){var $this=$(this),$img=$this.children('img');$img.css('opacity','0');$this.css('background-image','url("'+$img.attr('src')+'")').css('background-size',$img.css('object-fit')?$img.css('object-fit'):'cover').css('background-position',$img.css('object-position')?$img.css('object-position'):'center');});var $sidebar=$('#sidebar'),$sidebar_inner=$sidebar.children('.inner');breakpoints.on('<=large',function(){$sidebar.addClass('inactive');});breakpoints.on('>large',function(){$sidebar.removeClass('inactive');});if(browser.os=='android'&&browser.name=='chrome')
$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>').appendTo($head);$('<a href="#sidebar" class="toggle">Toggle</a>').appendTo($sidebar).on('click',function(event){event.preventDefault();event.stopPropagation();$sidebar.toggleClass('inactive');});$sidebar.on('click','a',function(event){if(breakpoints.active('>large'))
return;var $a=$(this),href=$a.attr('href'),target=$a.attr('target');event.preventDefault();event.stopPropagation();if(!href||href=='#'||href=='')
return;$sidebar.addClass('inactive');setTimeout(function(){if(target=='_blank')
window.open(href);else
window.location.href=href;},500);});$sidebar.on('click touchend touchstart touchmove',function(event){if(breakpoints.active('>large'))
return;event.stopPropagation();});$body.on('click touchend',function(event){if(breakpoints.active('>large'))
return;$sidebar.addClass('inactive');});$window.on('load.sidebar-lock',function(){var sh,wh,st;if($window.scrollTop()==1)
$window.scrollTop(0);$window.on('scroll.sidebar-lock',function(){var x,y;if(breakpoints.active('<=large')){$sidebar_inner.data('locked',0).css('position','').css('top','');return;}
x=Math.max(sh-wh,0);y=Math.max(0,$window.scrollTop()-x);if($sidebar_inner.data('locked')==1){if(y<=0)
$sidebar_inner.data('locked',0).css('position','').css('top','');else
$sidebar_inner.css('top',-1*x);}
else{if(y>0)
$sidebar_inner.data('locked',1).css('position','fixed').css('top',-1*x);}}).on('resize.sidebar-lock',function(){wh=$window.height();sh=$sidebar_inner.outerHeight()+30;$window.trigger('scroll.sidebar-lock');}).trigger('resize.sidebar-lock');});var $menu=$('#menu'),$menu_openers=$menu.children('ul').find('.opener');$menu_openers.each(function(){var $this=$(this);$this.on('click',function(event){event.preventDefault();$menu_openers.not($this).removeClass('active');$this.toggleClass('active');$window.triggerHandler('resize.sidebar-lock');});});})(jQuery);