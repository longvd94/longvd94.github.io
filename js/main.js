var articleElemTemplate = {
    articleDivide: '<span class="article--divide"></span>',    
    templateVideoArticle: '<div class="article-list--featured"><a href="{ARTICLE_URL}" class="article-list--featured-img" style="background-image: url({ARTICLE_THUMB})"><i class="article-list--play"></i><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}"></a><h3 class="rs mt-2"><a href="{ARTICLE_URL}" class="article-list--featured-title">{ARTICLE_TITLE}</a></h3><p class="rs article-label mt-2"><span class="article-label__main-color">{ARTICLE_IN_CATEGORY}</span><span class="ml-2">{ARTICLE_PUBLISHED_TIME}</span></p>{DIVIDE}</div>',
    templateArticleList: '<div class="row row-8 article-list"><div class="col-5 col-sm-3 article-list--img container8"><a href={ARTICLE_URL} style="background-image:url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}" /></a></div><div class="col-7 col-sm-9 article-list--meta container8"><h3 class="rs article-list--title fwb mb-2"><a href="{ARTICLE_URL}">{ARTICLE_TITLE}</a></h3><p class="rs article-label"><span class="article-label__main-color">{ARTICLE_IN_CATEGORY}</span><span class="ml-2">{ARTICLE_PUBLISHED_TIME}</span></p></div>{DIVIDE}</div>',
    templatesFtArticle: '<div class="ft-article ft-article__round ft-article__h264 mt-3"><a href="{ARTICLE_URL}" class="ft-article--img" style="background-image:url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}"></a><div class="ft-article--title"><a href="{ARTICLE_URL}" class="ft-article--link"></a><h3>{ARTICLE_TITLE}</h3></div></div>',
    templateVideoList: '<div class="row row-8 article-list"><div class="col-5 col-sm-3 article-list--img container8"><a href={ARTICLE_URL} style="background-image:url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}" /></a></div><div class="col-7 col-sm-9 article-list--meta container8"><h3 class="rs article-list--title fwb mb-2"><a href="{ARTICLE_URL}"><i class="ico--yt"></i> {ARTICLE_TITLE}</a></h3><p class="rs article-label"><span class="article-label__main-color">{ARTICLE_IN_CATEGORY}</span><span class="ml-2">{ARTICLE_PUBLISHED_TIME}</span></p></div>{DIVIDE}</div>',
}

var t = { 
    initPlyr: function(){
        var $videoPlayer = document.getElementById('video-player');
        if (Plyr && $videoPlayer){
            return new Plyr($videoPlayer, {
                controls: [
                    'mute',
                    'play',
                    'play-large',                      
                    'progress', 
                    'current-time',                     
                    'volume',
                    'fullscreen'
                ]
            })
        }
    },
    toggleLoadingButton: function( $buttonSelector, status, buttonTextOrigin ){        
        if (status === 'disabled'){
            $buttonSelector.addClass('disabled');
            $buttonSelector.attr('disabled','disabled');
            $buttonSelector.text('Đang tải...');
        } else if (status === 'enabled'){
            $buttonSelector.removeClass('disabled');
            $buttonSelector.removeAttr('disabled');
            $buttonSelector.text(buttonTextOrigin || 'Xem thêm');
        }        
    },
    getTemplateAricles: function(templates){
        var templateArticle;
        switch(templates){
            case 'videos':
                templateArticle = articleElemTemplate.templateVideoArticle;
                break;
            case 'article-list':
                templateArticle = articleElemTemplate.templateArticleList;
                break;
            case 'ft-article':
                templateArticle = articleElemTemplate.templatesFtArticle;
                break;
            case 'video-list':
                templateArticle = articleElemTemplate.templateVideoList;
                break;
            default: templateArticle = ''
        }
        return templateArticle
    },
    callAjaxMoreArticles: function(){
        var $moreArticlesBtn = $('.articles-more-btn');
        if ( !$moreArticlesBtn.attr('disabled') ){

        
            var buttonTextOrigin = $moreArticlesBtn.text(); // use when ajax call fail       
            var $elementAppend = $moreArticlesBtn.parent();
            var lastArticlesCurrent = $moreArticlesBtn.prev(); // using when add divide for last article current

            var page = $moreArticlesBtn.data('page');
            var offset = $moreArticlesBtn.data('offset');
            var category = $moreArticlesBtn.data('category');
            var templates = $moreArticlesBtn.data('templates');
            console.log(page, offset, category, templates);

            var templateArticle = t.getTemplateAricles(templates);
            if (templateArticle){
                t.toggleLoadingButton($moreArticlesBtn, 'disabled');
                // call Ajax here
                // ajax('...')
                // if call ajax fail: t.toggleLoadingButton($moreArticlesBtn, 'enabled', buttonTextOrigin);
                // else call ajax success: $moreArticlesBtn.remove();
                // and add new button with new request data
                setTimeout(function(){
                    $moreArticlesBtn.remove();
                    var articlesData = [
                        {
                            url: '#',
                            thumb: 'https://longvd94.github.io/images/article-list.jpg',
                            title: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            published_time: '21:25 Hôm nay',
                            category: 'Videos'
                        },
                        {
                            url: '#',
                            thumb: 'https://longvd94.github.io/images/article-list.jpg',
                            title: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            published_time: '21:25 Hôm nay',
                            category: 'Videos'
                        },
                        {
                            url: '#',
                            thumb: 'https://longvd94.github.io/images/article-list.jpg',
                            title: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            published_time: '21:25 Hôm nay',
                            category: 'Videos'
                        }
                    ];
                    var articlesHtml = '';
                    var articleDivide = articleElemTemplate.articleDivide;
                    var lastIndexOfNewArticles = articlesData.length - 1;
                    articlesData.forEach(function(article, i){
                        var articleHtml = templateArticle;
                        articleHtml = articleHtml.replace(/\{ARTICLE_URL\}/g, article.url);
                        articleHtml = articleHtml.replace(/\{ARTICLE_PUBLISHED_TIME\}/g, article.published_time);
                        articleHtml = articleHtml.replace(/\{ARTICLE_THUMB\}/g, article.thumb);
                        articleHtml = articleHtml.replace(/\{ARTICLE_IN_CATEGORY\}/g, article.category); 
                        articleHtml = articleHtml.replace(/\{ARTICLE_TITLE\}/g, article.title);
                       
                        if ( i !== lastIndexOfNewArticles ){
                            articleHtml = articleHtml.replace(/\{DIVIDE\}/g, articleDivide);
                        } else {
                            articleHtml = articleHtml.replace(/\{DIVIDE\}/g, '');
                        }
                        articlesHtml += articleHtml;
                    })

                    var newMoreButton = '<a href="javascript:void(0);" class="articles-more-btn" data-page="1" data-offset="2" data-category="videos" data-templates=' + templates + '>Xem thêm</a>';
                    articlesHtml+= newMoreButton;
                    
                    if (!!templateArticle.match(/\{DIVIDE\}/g)){
                        lastArticlesCurrent.append(articleDivide);
                    }                
                    $elementAppend.append(articlesHtml);

                    if (newMoreButton){
                        // hanle if new more button appended
                        $moreArticlesBtn.unbind('click', t.callAjaxMoreArticles);
                        t.handleClickMoreArticles()
                    }

                }, 1500)
            }
        }
    },
    handleClickMoreArticles: function(){
        var $moreArticlesBtn = $('.articles-more-btn');
        if ( t.checkElement( $moreArticlesBtn ) ){
            $moreArticlesBtn.bind('click', t.callAjaxMoreArticles)
        } 
    }, 
    callAjaxMoreComment: function(){
        var $moreBtn = $('.article-comment--more-btn');
        $moreBtn.hide();
        var $elementAppend = $moreBtn.parent();
        var page = $moreBtn.data('page');
        var offset = $moreBtn.data('offset');
        console.log(page, offset);
        // call Ajax here
        // ajax('...')
        // if call ajax fail: $moreBtn.show();
        // else call ajax success: $moreBtn.remove();
        // and add new button with new request data
        setTimeout(function(){
            $moreBtn.remove();
            var tempComment = '<div class="article-comment--inner mt-2 pl-4"><span class="article-comment--meta__main-color">{NAME}</span><span class="ml-3">{TIME}</span></p><div class="article-comment--content">{CONTENT}</div></div>';
            var commentsData = [
                {
                    name: 'Tran Hong Tien',
                    time: '21:25 Hôm nay',
                    content: 'Đúng là thời trang của công nương Diana đến bây giờ vẫn còn hợp thời đại, các mẹ bây giờ có mà chào thua nhé ahihi. Xét về độ chơi thì các ông bà ngày xưa trất hơn bây giờ…'
                },
                {
                    name: 'Tran Hong Tien',
                    time: '21:25 Hôm nay',
                    content: 'Đúng là thời trang của công nương Diana đến bây giờ vẫn còn hợp thời đại, các mẹ bây giờ có mà chào thua nhé ahihi. Xét về độ chơi thì các ông bà ngày xưa trất hơn bây giờ…'
                    },
                    {
                    name: 'Tran Hong Tien',
                    time: '21:25 Hôm nay',
                    content: 'Đúng là thời trang của công nương Diana đến bây giờ vẫn còn hợp thời đại, các mẹ bây giờ có mà chào thua nhé ahihi. Xét về độ chơi thì các ông bà ngày xưa trất hơn bây giờ…'
                    }
            ];

            var commentsHtml = '';
            commentsData.forEach(function(comment){
                var commentHtml = tempComment;
                commentHtml = commentHtml.replace(/\{NAME\}/g, comment.name);
                commentHtml = commentHtml.replace(/\{TIME\}/g, comment.time);
                commentHtml = commentHtml.replace(/\{CONTENT\}/g, comment.content);
                commentsHtml += commentHtml;
            })
            
            var newMoreButton = '<a href="javascript:void(0);" class="article-comment--more-btn mt-3" data-page="1" data-offset="2">Xem thêm 3 bình luận</a>';

            commentsHtml+= newMoreButton;

            $elementAppend.append(commentsHtml);

            if (newMoreButton){
             // hanle if new more button appended
               $moreBtn.unbind('click', t.callAjaxMoreComment);
               t.handleClickMoreCommentBtn()
            }
        },1500)
    },
    handleClickMoreCommentBtn: function(){
        var $moreBtn = $('.article-comment--more-btn');
        if ( t.checkElement( $moreBtn ) ){
            $moreBtn.bind('click', t.callAjaxMoreComment)
        } 
    },
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
    initCategoryFilterSlider: function(){
        var $filterSlider = $('.category-filter--slider');
        if ( t.checkElement( $filterSlider ) ){
            $filterSlider.owlCarousel({
                loop: false,
                center: false,                
                autoWidth:true,                
                margin:10                
            })
        }
    },
    eventOutClickHeaderMainMenu: function(e){  
        var $main = $('#main');
        var $mainMenuBtn = $('.main-nav--btn__bars');
        var $headerMainMenu = $('.header-menu-container');        
        if (!$headerMainMenu.is(e.target) && $headerMainMenu.has(e.target).length === 0){
            $headerMainMenu.removeClass('animated fadeInDown');
            $headerMainMenu.hide();
            $main.addClass('fadeInDown');
            $main.stop(true).fadeIn(200);
            $mainMenuBtn.removeClass('main-nav__btn--close');
            $(document).unbind('click', t.eventOutClickHeaderMainMenu)
        }
    },
    calculatorHeightMainMenu: function(){
        var wHeight = $(window).height();
        var headerHeight = 56;
        var footerHeight = $('#footer').innerHeight();
        console.log(wHeight, headerHeight, footerHeight);
        return wHeight - ( headerHeight + footerHeight )
    },
    handleClickMainMenuBtn: function(){
        var $main = $('#main');
        var $mainMenuBtn = $('.main-nav--btn__bars');
        if ( t.checkElement( $mainMenuBtn ) ){
            $mainMenuBtn.on('click', function(){
                var $headerMainMenu = $('.header-menu-container');
                if ( t.checkElement( $headerMainMenu ) ){
                    if ( $headerMainMenu.is(':hidden') ){                        
                        $mainMenuBtn.addClass('main-nav__btn--close');
                        $main.removeClass('fadeInDown');
                        $main.hide();
                        $headerMainMenu.css({
                            minHeight: t.calculatorHeightMainMenu()
                        });
                        $headerMainMenu.addClass('animated fadeInDown');
                        $headerMainMenu.stop(true).fadeIn(100, function(){
                           $(document).bind('click', t.eventOutClickHeaderMainMenu)
                        })
                    } 
                }
            })
        }
    },
    eventOutClickHeaderSearchContainer: function(e){
        var $headerSearchContainer = $('.header-search-container');        
        if (!$headerSearchContainer.is(e.target) && $headerSearchContainer.has(e.target).length === 0){
            
            $headerSearchContainer.stop(true).slideUp();
            $(document).unbind('click', t.eventOutClickHeaderSearchContainer)
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
                            $(document).bind('click', t.eventOutClickHeaderSearchContainer)
                        })
                    } 
                } 
            })
        }  
    },    
    checkElement: function(jQelement){
        return typeof jQelement === 'object' && jQelement.length > 0
    },    
}

$(document).ready(function(){ 
    t.handleClickMoreArticles();
    t.handleClickMoreCommentBtn();
    t.initCategoryFilterSlider();
    t.initArticlesSlider();
    t.initScrollArticles();
    t.handleClickMainMenuBtn();
    t.handleClickHeaderSearchBtn();
    t.initPlyr();
})