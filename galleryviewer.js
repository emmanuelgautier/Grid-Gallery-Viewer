/*
 * Version 0.1
 * Copyright (c) 2013 Emmanuel Gautier
 * Released under the MIT license
*/

(function($, window){
    'use strict';

    var gallery,

    item = [],

    itemOpened = null,

    speedTransitionOpening = 15,

    speedTransitionClosing = 5,

    array_search = function( s, arr ){
        for(var i = 0, l = arr.length; i < l; i += 1){
            if(s === arr[i]){
                return i;
            }
        }

        return -1;
    },

    init = function(){
        var later = function( o, fn ){
            var i = o;
            fn(i);
        };

        gallery = $(".gridgallery");
        
        if(gallery.length === 0){
            throw new Error("You have not a gallery block");
        }

        item = $(".gridgallery img");

        for(var i = 0; i < item.length; i += 1){
            later(i, function(i){
                $(item[i]).click(function(){
                    openItem(i);
                });
            });
        }
    },

    getData = function( image ){
        var data = {},

        $image = $(image);

        data.title       = $image.data('title');
        data.src         = $image.data('src');
        data.description = $image.data('description');
        data.href        = $image.data('href');

        return data;
    },

    getObject = function( data ){
        return ('<div class="gg-expander"><div class="gg-expander-inner"><span class="gg-close"></span><div class="gg-fullimg"><img src="{{ src }}" style="display: inline;"></div><div class="gg-details"><h3>{{ title }}</h3><p>{{ description }}</p><a href="{{ href }}">Visit website</a></div></div></div>')
            .replace("{{ title }}", data.title)
            .replace("{{ src }}", data.src)
            .replace("{{ description }}", data.description)
            .replace("{{ href }}", data.href);        
    },

    isItemOpened = function(){
        return (itemOpened !== null ? itemOpened : false);
    },

    openItem = function(i){
        console.log(i);
        if(isItemOpened() !== false){
            return replaceItem(i);
        }

        var $item = $(".gridgallery li")[i],

        data = getData(item[i]);

        showItem($item, data);

        itemOpened = i;
    },

    closeItem = function(){
        hideItem($(".gg-expander").parent());

        itemOpened = null;
    },

    replaceItem = function( i ){
        scrollTo(0, $(".gg-expander").parent().offset().top);

        $(".gg-expander").parent().height(100);
        $(".gg-expander").remove();

        itemOpened = null;

        openItem(i);
    },

    animateOpening = function( object, $parent ){
        $parent.append(object);

        var height_parent = $parent.height(),

        $object = $parent.children(".gg-expander"),

        height = 0,

        timer = setInterval(function(){
            height += 4;

            $object.css('height', height + '%');
            $parent.height(height_parent + $object.height());

            scrollTo(0, $object.offset().top);

            if(height === 100){
                $parent.height($parent.height() + 25);

                clearInterval(timer);
            }
        }, speedTransitionOpening);
    },

    animateClosing = function( $object, $parent ){
        var height = $object.height(),

        timer = setInterval(function(){
            height -= 10;

            $object.height(height);
            $parent.height($parent.height() - 25);

            if(height <= 10){
                $parent.height('100px');
                $object.remove();

                scrollTo(0, $parent.offset.top);

                clearInterval(timer);
            }
        }, speedTransitionClosing);
    },

    showItem = function( $parent, data ){
        var object = getObject(data),

        $parent = $($parent);

        animateOpening(object, $parent);

        $parent.on('click', '.gg-close', function(){ closeItem(); });
    },

    hideItem = function( $parent ){
        var $object = $parent.children('.gg-expander');

        animateClosing($object, $parent);
    },

    orderByDate = function(){
        
    },

    orderByPriority = function(){

    },
    
    orderByCategory = function(){

    },

    orderByName = function(){
        var img = $(".gg-grid img"),
        
        li = $(".gg-grid li"),

        name = [], name_order = [],

        i, j, l = img.length;
        for(i = 0; i < l; i += 1){
            name.push($(img[i]).data('title'));
            name_order.push($(img[i]).data('title'));
        };

        name_order.sort();

        for( i = 0; i < l; i += 1){
            j = array_search( name[i], name_order );
            $(li[j]).empty();
            $(li[j]).append(img[i]);
        }

        init();
    },

    orderby = function( order ){
        if(order === "date"){
            orderByDate();
        } else if(order === "priority"){
            orderByPriority();
        } else if(order === "name"){
            orderByName();
        }
    };

    $.galleryviewer = {
        orderby: orderby,
        orderByName: orderByName,
        isItemOpened: isItemOpened,
        closeItem: closeItem
    };

    $(document).ready(init);
}(jQuery, window));
