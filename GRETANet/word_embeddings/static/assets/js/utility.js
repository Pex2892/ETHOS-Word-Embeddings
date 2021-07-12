$(document).ready(function () {
    NW_demo()
    NW_show()

    SW_demo()
    SW_show()

    WA_demo()
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

        $.post(url_run_nearest_words, {
            'model_id': model_id,
            'positive_words': positive_words.val(),
            'negative_words': negative_words.val(),
            'topn': topn.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_NW', data)
            $('#results_analysis').html('').append(data['html'])
        }, "json");
    });
}

function SW_demo() {
    $("#SW_demo").click(function () {
        let word1 = $('#SW_word1')
        word1.val('tumor')
        console.log('SW_demo -> word1', word1.val());

        let word2 = $('#SW_word2')
        word2.val('cancer')
        console.log('SW_demo -> word2', word2.val());
    });
}

function SW_show() {
    $("#SW_show").click(function () {
        let model_id = getModel()
        console.log('SW_show -> model_id', model_id);

        let word1 = $('#SW_word1')
        console.log('SW_show -> word1', word1.val());

        let word2 = $('#SW_word2')
        console.log('SW_show -> word2', word2.val());

        if(word1.val() === '') {
            word1.parent('.form-group').attr('class', 'form-group has-danger')
            word1.attr("class", 'form-control form-control-danger')
        } else {
            word1.parent('.form-group').attr('class', 'form-group has-success')
            word1.attr("class", 'form-control form-control-success')
        }

        if(word2.val() === '') {
            word2.parent('.form-group').attr('class', 'form-group has-danger')
            word2.attr("class", 'form-control form-control-danger')
        } else {
            word2.parent('.form-group').attr('class', 'form-group has-success')
            word2.attr("class", 'form-control form-control-success')
        }

        $.post(url_run_similarity_words, {
            'model_id': model_id,
            'word1': word1.val(),
            'word2': word2.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_SW', data)
            $('#results_analysis').html('').append(data['html'])
        }, "json");
    });
}

function WA_demo() {
    $("#WA_demo").click(function () {
        let word1 = $('#WA_word1')
        word1.val('tumor')
        console.log('WA_demo -> word1', word1.val());

        let word2 = $('#WA_word2')
        word2.val('cancer')
        console.log('WA_demo -> word2', word2.val());

        let word3 = $('#WA_word3')
        word3.val('woman')
        console.log('WA_demo -> word3', word3.val());
    });
}

function WA_show() {
    $("#WA_show").click(function () {
        let model_id = getModel()
        console.log('WA_show -> model_id', model_id);

        let word1 = $('#WA_word1')
        console.log('WA_show -> word1', word1.val());

        let word2 = $('#WA_word2')
        console.log('WA_show -> word2', word2.val());

        let word3 = $('#WA_word3')
        console.log('WA_show -> word3', word3.val());

        if(word1.val() === '') {
            word1.parent('.form-group').attr('class', 'form-group has-danger')
            word1.attr("class", 'form-control form-control-danger')
        } else {
            word1.parent('.form-group').attr('class', 'form-group has-success')
            word1.attr("class", 'form-control form-control-success')
        }

        if(word2.val() === '') {
            word2.parent('.form-group').attr('class', 'form-group has-danger')
            word2.attr("class", 'form-control form-control-danger')
        } else {
            word2.parent('.form-group').attr('class', 'form-group has-success')
            word2.attr("class", 'form-control form-control-success')
        }

        if(word3.val() === '') {
            word3.parent('.form-group').attr('class', 'form-group has-danger')
            word3.attr("class", 'form-control form-control-danger')
        } else {
            word3.parent('.form-group').attr('class', 'form-group has-success')
            word3.attr("class", 'form-control form-control-success')
        }

        $.post(url_run_word_analogy, {
            'model_id': model_id,
            'word1': word1.val(),
            'word2': word2.val(),
            'word3': word3.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_WA', data)
            $('#results_analysis').html('').append(data['html'])
        }, "json");
    });
}