/*
 * Version 0.2
 * Copyright (c) 2013 Emmanuel Gautier
 * Released under the MIT license
*/

(function($, window){
    'use strict';

    var gallery,

    item = {},

    itemOpened = null,

    speedTransition = 25,
    
    social = {},

    array_search = function( s, arr ){
        for(var i = 0, l = arr.length; i < l; i += 1){
            if(s === arr[i]){
                return i;
            }
        }

        return -1;
    },

    init = function(){
        gallery = $(".gridgallery");

        if(gallery.length === 0){
            throw new Error("No gallery block");
        }

        item = $(".gridgallery img");

        for(var i = 0; i < item.length; i += 1){
           $(item[i]).attr('onclick', '$.galleryviewer.openItem("' + i + '")');
        }
    },
    
    social = function( config ){
        this.social = config || {};
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
        return ('<div class="gg-expander"><div class="gg-expander-inner"><span class="gg-close"></span><div class="gg-fullimg"><img src="{{ src }}" style="display: inline;"></div><div class="gg-details"><h3>{{ title }}</h3><p>{{ description }}</p><a href="{{ href }}">Visit website</a><span></span><div class="gg-social">{{ social }}</div></div><div class="gg-social">{{ social }}</div></div></div>')
            .replace("{{ title }}", data.title)
            .replace("{{ src }}", data.src)
            .replace("{{ description }}", data.description)
            .replace("{{ href }}", data.href)
            .replace("{{ social }}", getSocialObject( data.href ));
    },

    isItemOpened = function(){
        return (itemOpened !== null ? itemOpened : false);
    },

    openItem = function(i){
        if(isItemOpened() !== false){
            return replaceItem(i);
        }

        var $item = $(".gridgallery li")[i],

        data = getData(item[i]);

        showItem($item, data);

        $("body").css("overflow", "hidden");

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

        width = 0;

        $object.width(0);

        var timer = setInterval(function(){
            height += 10;
            width += 10;

            $object.css('height', height + '%');
            $object.css('width', width + '%');

            $parent.height(height_parent + $object.height());

            scrollTo(0, $object.offset().top);

            if(height === 100){
                $parent.height($parent.height() + 25);

                clearInterval(timer);
            }
        }, speedTransition);
    },

    animateClosing = function( $object, $parent ){
        var height = 100,

        width = 100,

        timer = setInterval(function(){
            height -= 10;
            width -= 10;

            $object.css( 'height', height + '%');
            $object.css( 'width', width + '%');

            $parent.height($parent.height() - 25);

            if(height === 10){
                $parent.height('100px');
                $object.remove();

                scrollTo(0, $parent.offset.top);

                clearInterval(timer);
            }
        }, speedTransition);
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

    getSocialObject = function( href ){
        var fb = '<div id="fb-root"></div><div class="fb-like" data-href="{{ href }}" data-width="450" data-layout="button_count" data-show-faces="true" data-send="false"></div><script>(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/en_US/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>',
    
        plus = '',

        twitter = '';

        return (fb + plus + twitter).replace('{{ href }}', href);
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
            $(li[j]).children().remove();
            $(li[j]).append(img[i]);
        }
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
        social: social,
        orderby: orderby,
        orderByName: orderByName,
        isItemOpened: isItemOpened,
        openItem: openItem,
        closeItem: closeItem
    };

    $(document).ready( init );
}(jQuery, window));
