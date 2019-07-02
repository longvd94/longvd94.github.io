var articleElemTemplate = { 
    articleDivide: '<span class="article--divide"></span>',
    templateArticleList: '<div class="article-list"><div class="row no-gutters"><div class="col-md-4 col-lg-4"><a href="{ARTICLE_URL}" class="article-list--img article--img mr-2" style="background-image: url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}"></a></div><div class="col-md-8 col-lg-8 pl-5"><div class="ml-n4"><h3 class="rs article-list--title fz24 mt-n1"><a href="{ARTICLE_URL}">{ARTICLE_TITLE}</a></h3><p class="rs mt-2 article-label"><b class="primary-color">{ARTICLE_IN_CATEGORY}</b><span class="ml-2">{ARTICLE_PUBLISHED_TIME}</span></p><div class="article-list--summary mt-2">{ARTICLE_SUMMARY}</div></div></div></div>{DIVIDE}</div>',
    templatesArticleFt: '<div class="col-md-4 col-lg-4 pl-2 pr-2"><div class="article-ft mt-4"><a href="{ARTICLE_URL}" class="article-ft--img article--img" style="background-image:url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}"></a><a href="{ARTICLE_URL}" class="article-ft--link"></a><h3 class="rs article-ft--title fz20">{ARTICLE_TITLE}</h3></div></div>',
    templateVideoArticle: '<div class="col-md-4 col-lg-4 pl-2 pr-2"><div class="article-grid mt-2"><a href="{ARTICLE_URL}" class="article-grid--img article--img" style="background-image:url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}"><span class="article-grid--play"></span></a><h3 class="rs article-grid--title mt-2 fz20"><a href="{ARTICLE_URL}">{ARTICLE_TITLE}</a></h3></div></div>',
    templateArticleGridNoDivide: '<div class="col-md-4 col-lg-4 pl-2 pr-2"><div class="article-grid"><a href="{ARTICLE_URL}" class="article-grid--img article--img" style="background-image:url({ARTICLE_THUMB})"><img src="{ARTICLE_THUMB}" alt="{ARTICLE_TITLE}"></a><h3 class="rs article-grid--title mt-3 fz20"><a href="{ARTICLE_URL}">{ARTICLE_TITLE}</a></h3><p class="rs article-label mt-2"><b class="primary-color">{ARTICLE_IN_CATEGORY}</b><span class="ml-2">{ARTICLE_PUBLISHED_TIME}</span></p></div></div>'
}

var t = { 
    initPlyr: function(){
        var $videoPlayer = document.getElementById('video-player');
        if ($videoPlayer){
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
    getTemplateAricles: function(templates){
        var templateArticle;
        switch(templates){
            case 'videos':
                templateArticle = articleElemTemplate.templateVideoArticle;
                break;
            case 'article-list':
                templateArticle = articleElemTemplate.templateArticleList;
                break;
            case 'article-ft':
                templateArticle = articleElemTemplate.templatesArticleFt;
                break;    
            case 'article-grid-no-divide':
                templateArticle = articleElemTemplate.templateArticleGridNoDivide;
                break;        
            default: templateArticle = ''
        }
        return templateArticle
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
    callAjaxMoreArticles: function(){
        var $moreArticlesBtn = $('.articles-more-btn');
        var moreArticleBtnClass = $moreArticlesBtn.attr('class');
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
                            thumb: 'https://longvd94@github.io/pc/images/article-list.jpg',
                            summary: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            title: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            published_time: '21:25 Hôm nay',
                            category: 'Videos'
                        },
                        {
                            url: '#',
                            thumb: 'https://longvd94@github.io/pc/images/article-list.jpg',
                            summary: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            title: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
                            published_time: '21:25 Hôm nay',
                            category: 'Videos'
                        },
                        {
                            url: '#',
                            thumb: 'https://longvd94@github.io/pc/images/article-list.jpg',
                            summary: "Highline bàn thắng duy nhất của đội tuyển Việt Nam vào lưới Thái Lan để giành vé vào chung kết King's Cup 2019",
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
                        articleHtml = articleHtml.replace(/\{ARTICLE_SUMMARY\}/g, article.summary); 
                        articleHtml = articleHtml.replace(/\{ARTICLE_TITLE\}/g, article.title);
                       
                        if ( i !== lastIndexOfNewArticles ){
                            articleHtml = articleHtml.replace(/\{DIVIDE\}/g, articleDivide);
                        } else {
                            articleHtml = articleHtml.replace(/\{DIVIDE\}/g, '');
                        }
                        articlesHtml += articleHtml;
                    })

                    var newMoreButton = '<a href="javascript:void(0);" class="' + moreArticleBtnClass + '" data-page="1" data-offset="2" data-category="videos" data-templates=' + templates + '>Bấm để xem thêm</a>';
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
    eventOutClickLanguagesSelect: function(e){
        var  $langOptions = $('.multi-lang--options');        
        if (!$langOptions.is(e.target) && $langOptions.has(e.target).length === 0){           
            $langOptions.hide();
            $(document).unbind('click', t.eventOutClickLanguagesSelect)
        }
    },
    handleClickLanguagesSelect: function(){
        var $btnSelect = $('.multi-lang--selected');
        var $langOptions = $('.multi-lang--options');
        if ( t.checkElement($btnSelect) && t.checkElement($langOptions) ){
            $btnSelect.on('click', function(){
                if ($langOptions.is(':hidden')){
                    $langOptions.show();
                    setTimeout(function(){
                        $(document).bind('click', t.eventOutClickLanguagesSelect)
                    }, 20)
                    
                } 
            })
        }
    },
    eventOutClickHeaderSearchForm: function(e){
        var  $headerSearchForm = $('.header-search--form');        
        if (!$headerSearchForm.is(e.target) && $headerSearchForm.has(e.target).length === 0){           
            $headerSearchForm.hide();
            $(document).unbind('click', t.eventOutClickHeaderSearchForm)
        }
    },
    handleClickHeaderSearchBtn: function(){
        var $btnSearch = $('.header-search--btn');   
        var $headerSearchForm = $('.header-search--form');
        if ( t.checkElement($btnSearch) ){
            $btnSearch.on('click', function(){
                if ($headerSearchForm.is(':hidden')){
                    $headerSearchForm.show();
                    setTimeout(function(){
                        $(document).bind('click', t.eventOutClickHeaderSearchForm)
                    }, 20)
                    
                } 
            })
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

            

            var tempComment = '<div class="article-comment--inner mt-3"><div class="article-comment--avatar"><img src="{AVATAR}" alt="{NAME}"></div><div class="article-comment--wrap"><span class="article-comment--arrow"></span><p class="rs article-comment--meta"><b class="primary-color">{NAME}</b><span class="ml-3">{TIME}</span></p><div class="article-comment--content pb-3">{CONTENT}</div></div></div>';
            var commentsData = [
                {
                    avatar: 'https://longvd94@github.io/pc/images/article-list.jpg',
                    name: 'Tran Hong Tien',
                    time: '21:25 Hôm nay',
                    content: 'Đúng là thời trang của công nương Diana đến bây giờ vẫn còn hợp thời đại, các mẹ bây giờ có mà chào thua nhé ahihi. Xét về độ chơi thì các ông bà ngày xưa trất hơn bây giờ…'
                },
                {
                    avatar: 'https://longvd94@github.io/pc/images/article-list.jpg',
                    name: 'Tran Hong Tien',
                    time: '21:25 Hôm nay',
                    content: 'Đúng là thời trang của công nương Diana đến bây giờ vẫn còn hợp thời đại, các mẹ bây giờ có mà chào thua nhé ahihi. Xét về độ chơi thì các ông bà ngày xưa trất hơn bây giờ…'
                },
                {
                    avatar: 'https://longvd94@github.io/pc/images/article-list.jpg',
                    name: 'Tran Hong Tien',
                    time: '21:25 Hôm nay',
                    content: 'Đúng là thời trang của công nương Diana đến bây giờ vẫn còn hợp thời đại, các mẹ bây giờ có mà chào thua nhé ahihi. Xét về độ chơi thì các ông bà ngày xưa trất hơn bây giờ…'
                }
            ];

            var commentsHtml = '';
            commentsData.forEach(function(comment){
                var commentHtml = tempComment;
                commentHtml = commentHtml.replace(/\{AVATAR\}/g, comment.avatar);
                commentHtml = commentHtml.replace(/\{NAME\}/g, comment.name);
                commentHtml = commentHtml.replace(/\{TIME\}/g, comment.time);
                commentHtml = commentHtml.replace(/\{CONTENT\}/g, comment.content);
                commentsHtml += commentHtml;
            })
            
            var newMoreButton = '<a href="javascript:void(0);" class="more-arrow-right mt-3 article-comment--more-btn" data-page="1" data-offset="2">Xem thêm 3 bình luận</a>';

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
    handleClickVideoNavCloseBtn: function(){
        var $videoNavCloseBtn = $('.video-nav--btn__close');  
        var $overlayContainer = $('.video-nav--container .overlay');    
        if (t.checkElement($videoNavCloseBtn)){
            $videoNavCloseBtn.on('click', function(){
                t.setStateVideoNavContainer('close')                 
            })
        }
        if (t.checkElement($overlayContainer)){
            $overlayContainer.on('click', function(){
                t.setStateVideoNavContainer('close')                 
            })
        }
    },
    handleClickVideoNavBtn: function(){
        var $videoNavBtn = $('.video-nav--btn__bars');        
        if (t.checkElement($videoNavBtn)){
            $videoNavBtn.on('click', function(){
                t.setStateVideoNavContainer('open')               
            })
        }        
    },
    setStateVideoNavContainer: function(state){
        var $videoNavContainer = $('.video-nav--container');
        if (t.checkElement($videoNavContainer)){
            if (state == 'open'){
                $videoNavContainer.addClass('open');
            } else {
                $videoNavContainer.removeClass('open');
            }                  
        }
    },
    checkElement: function(jQelement){
        return typeof jQelement === 'object' && jQelement.length > 0
    }, 
}

$(document).ready(function(){  
   t.handleClickVideoNavBtn();
   t.handleClickVideoNavCloseBtn();
   t.handleClickMoreCommentBtn();  
   t.handleClickMoreArticles();
   t.handleClickLanguagesSelect();
   t.handleClickHeaderSearchBtn();
   t.initPlyr();
})