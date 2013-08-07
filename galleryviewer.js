(function($, window){
    'use strict';
    
    var gallery,
    
    itemOpened = null,
    
    speedTransitionOpen = 1000,
    
    init = function(){
        gallery = $(".gridgallery");
        if(gallery.length === 0){
            throw new Error("You have not a gallery block");
        }
        
       $(".gridgallery img").on('click', function(){
           var $item = $(this),
           
           $parent = $item.parent(),
           
           data = getData($item);

           showItem($parent, data);
       });
    },
    
    getData = function($image){
        var data = {};
           
        data.title       = $image.data('title');
        data.src         = $image.data('src');
        data.description = $image.data('description');
        data.href        = $image.data('href');

        return data;
    },
    
    isItemOpened = function(){
        return(itemOpened !== null);
    },
    
    openItem = function(i){
        if(isItemOpened){
            return replaceItem(i);
        }
        
        var $item = $(".gridgallery li")[i],
        
        data = getData($item.children('img'));
        
        showItem($item, data);
        
        itemOpened = i;
    },
    
    closeItem = function(){
        hideItem($(".gg-expander"));
        
        itemOpened = null;
    },
    
    replaceItem = function(i){
        
    },
    
    animate = function(object, parent){
        $(parent).append(object);
        
        var height_parent = $(parent).height(),
        
        $object = $(parent).children(".gg-expander"),
        
        height = 0,
        
        timer = setInterval(function(){
            height += 4;

            $object.css('height', height + '%');
            $(parent).height(height_parent + $object.height());
            
            scrollTo(0, $object.offset().top);
            
            if(height === 100){
                $(parent).height($(parent).height() + 25);
                
                clearInterval(timer);
            }    
        }, 15);
    },
    
    showItem = function($parent, data){
        var object = ('<div class="gg-expander"><div class="gg-expander-inner"><span class="gg-close"></span><div class="gg-fullimg"><img src="{{ src }}" style="display: inline;"></div><div class="gg-details"><h3>{{ title }}</h3><p>{{ description }}</p><a href="{{ href }}">Visit website</a></div></div></div>')
            .replace("{{ title }}", data.title)
            .replace("{{ src }}", data.src)
            .replace("{{ description }}", data.description)
            .replace("{{ href }}", data.href);
     
        animate(object, $parent);
        
        $parent.on('click', '.gg-close', function(){ hideItem($parent); });
    },
    
    hideItem = function($parent){
        $parent.height('100px');
        $parent.children('.gg-expander').remove();
    },

    orderbyDate = function(){
        
    },
    
    orderbyPriority = function(){
        
    },
    
    orderbyName = function(){
        
    },
    
    orderby = function(order){
        if(order === "date"){
            orderbyDate();
        } else if(order === "priority"){
            orderbyPriority();
        } else if(order === "name"){
            orderbyName();
        }
    };
    
    $(document).ready(init);
    
    $.fn.galleryviewer = {
        orderby: orderby,
        isItemOpened: isItemOpened,
        closeItem: closeItem
    };
}(jQuery, window));
