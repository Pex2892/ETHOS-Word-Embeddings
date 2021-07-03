$(document).ready(function () {
    NW_demo()
    NW_show()



});

function getModel() {
    return $('#model').val();
}

function NW_demo() {
    $("#NW_demo").click(function () {
        let positive_words = $('#NW_positive_words')
        positive_words.val('woman,cancer')
        console.log('NW_show -> positive_words', positive_words.val());

        let negative_words = $('#NW_negative_words')
        negative_words.val('death')
        console.log('NW_show -> negative_words', negative_words.val());

        NW_show()
    });
}

function NW_show() {
    $("#NW_show").click(function () {
        let model_id = getModel()
        console.log('NW_show -> model_id', model_id);

        let positive_words = $('#NW_positive_words')
        console.log('NW_show -> positive_words', positive_words.val());

        let negative_words = $('#NW_negative_words')
        console.log('NW_show -> negative_words', negative_words.val());

        let topn = $('#NW_topn')
        console.log('NW_show -> topn', topn.val());

        if(positive_words.val() === '') {
            positive_words.parent('.form-group').attr('class', 'form-group has-danger')
            positive_words.attr("class", 'form-control form-control-danger')
        } else {
            positive_words.parent('.form-group').attr('class', 'form-group has-success')
            positive_words.attr("class", 'form-control form-control-success')
        }

        if(negative_words.val() === '') {
            negative_words.parent('.form-group').attr('class', 'form-group has-danger')
            negative_words.attr("class", 'form-control form-control-danger')
        } else {
            negative_words.parent('.form-group').attr('class', 'form-group has-success')
            negative_words.attr("class", 'form-control form-control-success')
        }

        
    });
}