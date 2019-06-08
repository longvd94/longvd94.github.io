var t = {
    initScrollArticles: function(){
        var $scrollArticles = $('.scroll-articles');
        if ( t.checkElement( $scrollArticles ) ){
            $scrollArticles.nanoScroller()
        }
    },
    initArticlesSlider: function(){
        var $articlesSlider = $('.articles-slider');
        if ( t.checkElement( $articlesSlider ) ){
            $articlesSlider.owlCarousel({
                loop: true,
                center: true,                
                autoWidth:true,
                stagePadding: 10,
                margin:10                
            })
        }
    },
    eventClickHeaderMainMenu: function(e){
        var $mainMenuBtn = $('.main-nav--btn__bars');
        var $headerMainMenu = $('.header-menu-container');        
        if (!$headerMainMenu.is(e.target) && $headerMainMenu.has(e.target).length === 0){
            $headerMainMenu.stop(true).slideUp(400);
            $mainMenuBtn.removeClass('main-nav__btn--close');
            $(document).unbind('click touchstart', t.eventClickHeaderMainMenu)
        }
    },
    handleClickMainMenuBtn: function(){
        var $mainMenuBtn = $('.main-nav--btn__bars');
        if ( t.checkElement( $mainMenuBtn ) ){
            $mainMenuBtn.on('click', function(){
                var $headerMainMenu = $('.header-menu-container');
                if ( t.checkElement( $headerMainMenu ) ){
                    if ( $headerMainMenu.is(':hidden') ){
                        $mainMenuBtn.addClass('main-nav__btn--close');
                        $headerMainMenu.stop(true).slideDown(400, function(){
                            $(document).bind('click touchstart', t.eventClickHeaderMainMenu)
                        })
                    } 
                }
            })
        }
    },
    eventClickHeaderSearchContainer: function(e){
        var $headerSearchContainer = $('.header-search-container');        
        if (!$headerSearchContainer.is(e.target) && $headerSearchContainer.has(e.target).length === 0){
            $headerSearchContainer.stop(true).slideUp();
            $(document).unbind('click touchstart', t.eventClickHeaderSearchContainer)
        }
    },
    handleClickHeaderSearchBtn: function(){  
        var $searchBtn = $('.main-nav--btn__search');     
        if ( t.checkElement( $searchBtn ) ){
            $searchBtn.on('click', function(){
                var $headerSearchContainer = $('.header-search-container');
                if ( t.checkElement( $headerSearchContainer ) ){                    
                    if ( $headerSearchContainer.is(':hidden') ){
                        $headerSearchContainer.stop(true).slideDown(400, function(){
                            $(document).bind('click touchstart', t.eventClickHeaderSearchContainer)
                        })
                    } 
                } 
            })
        }  
    },
    checkElement: function(jQelement){
        return typeof jQelement === 'object' && jQelement.length > 0
    }
}

$(document).ready(function(){
    t.initArticlesSlider();
    t.initScrollArticles();
    t.handleClickMainMenuBtn();
    t.handleClickHeaderSearchBtn()
})