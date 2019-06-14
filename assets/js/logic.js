// Hide the spinner initially
$("#spinner").hide();

// Fetch the translations from the API
$.ajax({
    method: 'GET',
    url: 'https://api.myjson.com/bins/jp5k9',
    beforeSend: function () { $("#spinner").show() },
    success: function() { $("#spinner").hide() }
}).done(function (data) {
    // Initialize dutch language & fill the resume
    let lang = 'nl';
    generateData(data, lang);

    // Language switch handler
    $('.translate').click(function () {
        // Highlight the language chosen
        $('#nl, #en').toggleClass('hidden');

        // Fetch the language & regenerate the data
        lang = $(this).attr('id');
        generateData(data, lang)
    });

    // Paragraph expand handler
    $('p.lang').click(function () {
        const currentTextContent = $(this).text();

        // Expand or shrink the paragraph
        if (currentTextContent.indexOf(' ...') !== -1) {
            setText($(this), data, lang, false);
        } else {
            setText($(this), data, lang, true);
        }
    })
});


/**
 * Generates or resets the data
 * @param {object} data - The data to use
 * @param {string} lang - The language to use.
 */
function generateData(data, lang) {
    // Loop through the headers to fill its content
    $('h1.lang, strong.lang, div.lang, h3.lang').each(function () {
        setText($(this), data, lang, false)
    });

    // Loop through the paragraphs to fill its content partially
    $('p.lang').each(function () {
        setText($(this), data, lang, true)
    });
}


/**
 * Sets the text of a jQuery object
 * @param {object} element - The jQuery element to fill
 * @param {object} data - The data to use.
 * @param {string} lang - The language to use
 * @param {boolean} partial - Flag to fill the element partially
 */
function setText(element, data, lang, partial) {
    const content = data[lang][element.attr('data-key')];

    if (!partial) {
        element.text(content);
    } else {
        element.text(content.substring(0, 150) + ' ...');
    }
}