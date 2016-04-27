$(function() {
    $('#capture_button').on('click', function() {
        var canvas = document.getElementById('book_image');
        if (draw(canvas) === false) {
            return;
        }
        var base64EncodedImage = canvas.toDataURL('image/jpeg');
        var title = $('#book_title_above').html() + ' ' + $('#book_title_below').html();
        var author = $('#author').html();
        var translator = $('#translator').html();
        $('input[name=image]').val(base64EncodedImage);
        $('input[name=title]').val(title);
        $('input[name=author]').val(author);
        $('input[name=translator]').val(translator);
        $('form[name=captureForm]').submit();
    });
});

function draw(canvas) {
    var book = {
        animal: $('#animal').attr('data-animal-index'),
        color : $('#book_head').css("color"),
        subtitle_en : $('#subtitle_en').text(),
        subtitle_ja_above : $('#subtitle_ja_above').text(),
        subtitle_ja_below : $('#subtitle_ja_below').text(),
        subtitle_ja_aboveTop : document.getElementById('subtitle_ja_above').offsetTop,
        subtitle_ja_belowTop : document.getElementById('subtitle_ja_below').offsetTop,
        title_coverTop : document.getElementById('book_title_cover').offsetTop,
        title_coverHeight : document.getElementById('book_title_cover').offsetHeight,

        title_above : $('#book_title_above').text(),
        title_above_font : 'normal normal ' + $('#book_title_above').css("font-size") + ' "EB Garamond",serif',
        title_aboveTop : document.getElementById('book_title_above').offsetTop -5,
        title_below : $('#book_title_below').text(),
        title_below_font : 'normal normal ' + $('#book_title_below').css("font-size") + ' EB Garamond,serif',
        title_belowTop : document.getElementById('book_title_below').offsetTop -10,

        ribbon : $('#ribbon').text(),
        logo_en : $('#logo_en').text(),
        logo_ja : $('#logo_ja').text(),
        author : $('#author').text(),
        author_after :"著",
        translator : $('#translator').text(),
        translator_after :"訳"
    }

    console.log(book);

    if (canvas.getContext === null) {
        return false;
    }

    //位置関連
    var context = canvas.getContext('2d');
    //border 1px
    context.beginPath();
    context.fillStyle = '#000';
    context.fillRect(0, 0, 516, 660);
    //background
    context.beginPath();
    context.fillStyle = '#fff';
    context.fillRect(1, 1, 514, 658);
    //head
    context.beginPath();
    context.fillStyle = book.color;
    context.fillRect(42, 1, 433, 10);
    //book_title_cover
    context.beginPath();
    context.fillStyle = book.color;
    context.fillRect(42,book.title_coverTop, 433,book.title_coverHeight);
    //anti-aliasing
    context.shadowColor = 'rgba(0,0,0,.6)'
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 1;
    //subtitle_en
    context.fillStyle = '#555555';
    context.font = 'italic 20px serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText(book.subtitle_en, 258, 15);
    //subtitle_ja_above
    context.fillStyle = '#222';
    context.font = 'normal bold 24px san-serif';
    context.textAlign = 'start';
    context.fillText(book.subtitle_ja_above, 42,book.subtitle_ja_aboveTop, 432);
    //subtitle_ja_below
    context.fillText(book.subtitle_ja_below, 42,book.subtitle_ja_belowTop, 432);
    //anti-aliasing
    context.shadowColor = 'rgba(255,255,255,.5)'
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 1;
    //book_title_above
    context.fillStyle = '#fff';
    context.font = book.title_above_font;
    context.fillText(book.title_above, 56, book.title_aboveTop, 402);
    //book_title_below
    context.font = book.title_below_font;
    context.fillText(book.title_below, 56,book.title_belowTop, 402);
    //ribbon
    if($('#ribbon').css("hidden") == false) {
        context.save();
        context.beginPath();
        context.translate(412,-30)
        context.rotate( 45 * Math.PI / 180);
        context.fillStyle = '#000000';
        context.fillRect(0,0,190,43);
        //ribbon_text anti-aliasing
        context.shadowColor = 'rgba(255,255,255,.5)'
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 1;
        //ribbon_text
        context.fillStyle = '#ffffff';
        context.font = 'normal normal 26px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillText(book.ribbon, 95, 9);
        context.restore();
    }
    //anti-aliasing
    context.shadowColor = 'rgba(0,0,0,.6)'
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 1;
    //logo_en
    context.fillStyle = '#222222';
    context.font = 'normal normal 26px sans-serif';
    context.textAlign = 'start';
    context.textBaseline = 'top';
    context.fillText(book.logo_en, 42, 571, 250);
    //logo_ja
    context.font = 'normal normal 16px sans-serif';
    context.fillText(book.logo_ja, 42, 600, 250);
    //author
    context.fillStyle = '#444444';
    context.font = 'italic normal 20px sans-serif';
    context.textAlign = 'end';
    context.textBaseline = 'top';
    context.fillText(book.author, 440, 571);
    //author_after
    context.fillText(book.author_after, 473, 571);
    //translator
    context.font = "normal normal 20px sans-serif";
    context.textAlign = "end";
    context.textBaseline = "top";
    context.fillText(book.translator, 440, 600);
    //translator_after
    context.fillText(book.translator_after, 473, 600);


    //animal
    var animal = document.getElementById('animal');
    var animalPositionX = animal.offsetLeft;
    var animalPositionY = animal.offsetTop;
    var animalSize = parseInt($('#animal').css('width'));

    var img = document.createElement("img");
    img.onload = function(){
        context.drawImage(img, animalPositionX, animalPositionY, animalSize, animalSize);
    };
    img.src = 'http://oreilly-generator.com/img/animal/' + book.animal + '.png';
}
