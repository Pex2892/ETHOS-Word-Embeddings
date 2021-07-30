$(document).ready(function () {
    NW_demo()
    NW_show()

    SW_demo()
    SW_show()

    WA_demo()
    WA_show()
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
        $('div.row.visible').removeClass('visible').addClass('invisible')

        let model_id = getModel()
        console.log('NW_show -> model_id', model_id);

        let positive_words = $('#NW_positive_words')
        console.log('NW_show -> positive_words', positive_words.val());

        let negative_words = $('#NW_negative_words')
        console.log('NW_show -> negative_words', negative_words.val());

        let topn = $('#NW_topn')
        console.log('NW_show -> topn', topn.val());

        if(positive_words.val().trim() === '' && negative_words.val().trim() === '') {
            Swal.fire({
                icon: 'error',
                title: '<b>An error has occurred</b>',
                html: 'You have not entered any words.<br />Please try again.',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'Close',
                confirmButtonColor: '#145da0',
            })
            return 0
        }

        Swal.fire({
            title: 'Running',
            html: 'Wait!<br />It will take a few minutes to complete',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                $('#results_analysis').html('')
            }
        })

        $.post(url_run_nearest_words, {
            'model_id': model_id,
            'positive_words': positive_words.val(),
            'negative_words': negative_words.val(),
            'topn': topn.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_NW', data)

            if (data.type === 'success') {
                $('#results_analysis').append(data['html'])
                $('div.row.invisible').removeClass('invisible').addClass('visible')
            }

            Swal.fire({
                icon: data.type,
                title: data.title,
                html: data.message,
                showConfirmButton: true,
                timer: 0,
                confirmButtonText: 'Close',
                confirmButtonColor: '#145da0',
                allowOutsideClick: false
            })

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
        $('div.row.visible').removeClass('visible').addClass('invisible')

        let model_id = getModel()
        console.log('SW_show -> model_id', model_id);

        let word1 = $('#SW_word1')
        console.log('SW_show -> word1', word1.val());

        let word2 = $('#SW_word2')
        console.log('SW_show -> word2', word2.val());

        if(word1.val().trim() === '' || word2.val().trim() === '') {
            Swal.fire({
                icon: 'error',
                title: '<b>An error has occurred</b>',
                html: 'You must enter the two words.<br />Please try again.',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'Close',
                confirmButtonColor: '#145da0',
            })
            return 0
        }

        Swal.fire({
            title: 'Running',
            html: 'Wait!<br />It will take a few minutes to complete',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                $('#results_analysis').html('')
            }
        })

        $.post(url_run_similarity_words, {
            'model_id': model_id,
            'word1': word1.val(),
            'word2': word2.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_SW', data)

            if (data.type === 'success') {
                $('#results_analysis').append(data['html'])
                $('div.row.invisible').removeClass('invisible').addClass('visible')
            }

            Swal.fire({
                icon: data.type,
                title: data.title,
                html: data.message,
                showConfirmButton: true,
                timer: 0,
                confirmButtonText: 'Close',
                confirmButtonColor: '#145da0',
                allowOutsideClick: false
            })
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
        $('div.row.visible').removeClass('visible').addClass('invisible')

        let model_id = getModel()
        console.log('WA_show -> model_id', model_id);

        let word1 = $('#WA_word1')
        console.log('WA_show -> word1', word1.val());

        let word2 = $('#WA_word2')
        console.log('WA_show -> word2', word2.val());

        let word3 = $('#WA_word3')
        console.log('WA_show -> word3', word3.val());

        let topn = $('#WA_topn')
        console.log('WA_show -> topn', topn.val());

        if(word1.val().trim() === '' || word2.val().trim() === '' || word3.val().trim() === '') {
            Swal.fire({
                icon: 'error',
                title: '<b>An error has occurred</b>',
                html: 'You must enter the three words.<br />Please try again.',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'Close',
                confirmButtonColor: '#145da0',
            })
            return 0
        }

        Swal.fire({
            title: 'Running',
            html: 'Wait!<br />It will take a few minutes to complete',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                $('#results_analysis').html('')
            }
        })

        $.post(url_run_word_analogy, {
            'model_id': model_id,
            'word1': word1.val(),
            'word2': word2.val(),
            'word3': word3.val(),
            'topn': topn.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_WA', data)

            if (data.type === 'success') {
                $('#results_analysis').append(data['html'])
                $('div.row.invisible').removeClass('invisible').addClass('visible')
            }

            Swal.fire({
                icon: data.type,
                title: data.title,
                html: data.message,
                showConfirmButton: true,
                timer: 0,
                confirmButtonText: 'Close',
                confirmButtonColor: '#145da0',
                allowOutsideClick: false
            })
        }, "json");
    });
}
