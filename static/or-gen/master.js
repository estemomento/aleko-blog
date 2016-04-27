$(function() {
    var animal = $('#animal');
    animal.draggable();

    animal.mousewheel(function(event, delta) {
        var magnification = parseInt(animal.css('width'));

        if (delta > 0) {
            magnification++;
        } else {
            magnification--;
        }

        $(this).css({'width': magnification,'height': magnification});
    });

    animal.mouseenter(function() {
          $('body').css({'overflow': 'hidden'})
        }).mouseleave(function() {
          $('body').css({'overflow': 'auto'})
    });

    var contentEditableContents = $('#ribbon,#subtitle_en,#subtitle_ja_above,#subtitle_ja_below,#book_title_above,#book_title_below,#author,#translator,#logo_en,#logo_ja');
    contentEditableContents.attr('contentEditable', true);

    $('#book_title_above,#book_title_below,#author,#translator,#logo_en,#logo_ja').on('keydown', function(e) {
        if (e.which == 13) {
            return false;
        }
    });

//random
    var themeTargets = $('#book_head,#book_title_cover,#apostrophe');
    var themeRandomNumber = Math.floor(Math.random() * 15);
    var animalRandomNumber = Math.floor(Math.random() * 39) + 1;

    $(themeTargets).addClass('theme_'+themeRandomNumber);
    $('#animal').addClass('animal_'+ animalRandomNumber).attr('data-animal-index', animalRandomNumber);

//button
    $('#theme_box').find('li').on('click',function(){
        var themeNumber = ($('#theme_box li').index(this));
        $(themeTargets).removeClass().addClass('theme_' + themeNumber);
    });
    $('#animal_box').find('li').on('click',function(){
        var animalNumber = ($('#animal_box li').index(this)) + 1;
        $('#animal').removeClass().addClass('animal_'+ animalNumber).attr('data-animal-index', animalNumber);
    });

//ribbon
    $('#ribbon').dblclick(function () {
        $(this).hide().addClass('hidden');
        $('#ribbon_half').show();
    });

    $('#ribbon_half').click('click',function(){
        $(this).hide().removeClass('hidden');
        $('#ribbon').show();
    });

//タイトル文字操作
    var minFontsize = 3;
    var maxFontsize = 10;

    var baseFontsize_above = minFontsize;
    var baseFontsize_below = 7;

    $('#book_title_above').mousewheel(function(event, delta) {
        if ((delta > 0) && (baseFontsize_above < maxFontsize)) {
            baseFontsize_above += 0.1;
            $('#book_title_above').css('font-size', + baseFontsize_above + 'rem');
        }
        else if ((delta < 0) && (baseFontsize_above > minFontsize)) {
            baseFontsize_above -= 0.1;
            $('#book_title_above').css('font-size', + baseFontsize_above + 'rem');
        }
        return false;
    });

    $('#book_title_below').mousewheel(function(event, delta) {
        if ((delta > 0) && (baseFontsize_below < maxFontsize)) {
            baseFontsize_below += 0.1;
            $('#book_title_below').css('font-size',+ baseFontsize_below +'rem');
        }
        else if ((delta < 0) && (baseFontsize_below > minFontsize)) {
            baseFontsize_below -= 0.1;
            $('#book_title_below').css('font-size', + baseFontsize_below + 'rem');
        }
        return false;
    });

    $('#book_title_above').dblclick(function () {
        $(this).hide();
    });
    $('#book_title_below').dblclick(function () {
        $('#book_title_above').show();
    });
});
