$(document).ready(function () {
    NW_demo()
    NW_show()

    SW_demo()
    SW_show()

    WA_demo()
    WA_show()

    EU_demo()
    EU_show()
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
        $('#div_results').removeClass('visible').addClass('invisible');

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
                $('#div_results').removeClass('invisible').addClass('visible');
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
        let word1 = $('#SW_words_1')
        word1.val('tumour')
        console.log('SW_demo -> words1', word1.val());

        let word2 = $('#SW_words_2')
        word2.val('cancer')
        console.log('SW_demo -> words2', word2.val());
    });
}

function SW_show() {
    $("#SW_show").click(function () {
        $('#div_results').removeClass('visible').addClass('invisible');

        let model_id = getModel()
        console.log('SW_show -> model_id', model_id);

         let words_1 = $('#SW_words_1')
        console.log('SW_show -> SW_words_1', words_1.val());

        let words_2 = $('#SW_words_2')
        console.log('SW_show -> SW_words_1', words_2.val());

        if(words_1.val().trim() === '' || words_2.val().trim() === '') {
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

        $.post(url_run_similarity_words, {
            'model_id': model_id,
            'words_1': words_1.val(),
            'words_2': words_2.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_SW', data)

            if (data.type === 'success') {
                $('#results_analysis').append(data['html'])
                $('#div_results').removeClass('invisible').addClass('visible');
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
        word1.val('tumour')
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
        $('#div_results').removeClass('visible').addClass('invisible');

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
                $('#div_results').removeClass('invisible').addClass('visible');
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

function EU_demo() {
    $("#EU_demo").click(function () {
        let text = $('#EU_text')
        text.val('Breast cancer is cancer that forms in the cells of the breasts. After skin cancer, breast cancer is the most ' +
            'common cancer diagnosed in women in the United States. Breast cancer can occur in both men and women, but it\'s ' +
            'far more common in women. Substantial support for breast cancer awareness and research funding has helped created ' +
            'advances in the diagnosis and treatment of breast cancer. Breast cancer survival rates have increased, and the ' +
            'number of deaths associated with this disease is steadily declining, largely due to factors such as earlier ' +
            'detection, a new personalized approach to treatment and a better understanding of the disease.')
        console.log('EU_show -> text', text.val());
    });
}

function EU_show() {
    $("#EU_show").click(function () {
        $('#div_results').removeClass('visible').addClass('invisible');

        let model_id = getModel()
        console.log('EU_show -> model_id', model_id);

        let text = $('#EU_text')
        console.log('EU_show -> text', text.val());

        if(text.val().trim() === '') {
            Swal.fire({
                icon: 'error',
                title: '<b>An error has occurred</b>',
                html: 'You have not entered any text.<br />Please try again.',
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

        $.post(url_run_eval_uncertainty, {
            'model_id': model_id,
            'text': text.val(),
            'csrfmiddlewaretoken': csrf_token,
        }, function (data) {
            console.log('POST run_EU', data)
            if (data.type === 'success') {
                $('#results_analysis').append(data['html'])
                $('#div_results').removeClass('invisible').addClass('visible');
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
